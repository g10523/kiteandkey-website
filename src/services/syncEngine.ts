/**
 * Sync Engine — Offline-first data synchronization layer
 * 
 * Strategy:
 * 1. All reads: try API first → fall back to localStorage cache
 * 2. All writes: optimistic update localStorage → API in background → rollback on failure
 * 3. Queued mutations for offline recovery
 * 4. Connectivity monitoring with visual "Offline Mode" indicator
 */

import apiClient from './apiClient';
import type {
    Subject,
    Assignment,
    TutoringSession,
    Message,
    Resource,
    AnalyticsData,
} from '../types';

// ─── Types ───

export type ConnectionStatus = 'online' | 'offline' | 'reconnecting';

export interface SyncState {
    status: ConnectionStatus;
    lastSyncedAt: string | null;
    pendingMutations: QueuedMutation[];
    syncErrors: SyncError[];
}

export interface QueuedMutation {
    id: string;
    type: 'assessment' | 'quiz_attempt' | 'content_visibility' | 'message' | 'progress';
    endpoint: string;
    method: 'POST' | 'PUT' | 'DELETE';
    payload: any;
    createdAt: string;
    retries: number;
    maxRetries: number;
    optimisticKey?: string; // localStorage key for rollback
    optimisticPrev?: string; // previous value for rollback
}

export interface SyncError {
    mutationId: string;
    error: string;
    timestamp: string;
    dismissed: boolean;
}

export interface DashboardPayload {
    subjects: Subject[];
    assignments: Assignment[];
    sessions: TutoringSession[];
    messages: Message[];
    resources: Resource[];
    analytics: AnalyticsData;
    mindPrintProfile: any;
    interventions: any[];
    assessments: any[];
}

// ─── Constants ───

const CACHE_KEYS = {
    SUBJECTS: 'lms_subjects',
    ASSIGNMENTS: 'lms_assignments',
    SESSIONS: 'lms_sessions',
    MESSAGES: 'lms_messages',
    RESOURCES: 'lms_resources',
    ANALYTICS: 'lms_analytics',
    ASSESSMENTS: 'lms_assessments',
    INTERVENTIONS: 'lms_interventions',
    MINDPRINT_PROFILE: 'lms_mindprint_profile',
    LAST_SYNC: 'lms_last_sync',
    MUTATION_QUEUE: 'lms_mutation_queue',
} as const;

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 2000;

// ─── Helpers ───

const dateReviver = (_key: string, value: any) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        return new Date(value);
    }
    return value;
};

function getCachedData<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        if (raw) return JSON.parse(raw, dateReviver);
    } catch (e) {
        console.warn(`[SyncEngine] Failed to read cache for ${key}`, e);
    }
    return fallback;
}

function setCachedData<T>(key: string, data: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.warn(`[SyncEngine] Failed to write cache for ${key}`, e);
    }
}

/**
 * Transform snake_case API response to camelCase frontend objects
 */
export function snakeToCamel(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    if (Array.isArray(obj)) return obj.map(snakeToCamel);
    if (typeof obj !== 'object') return obj;
    if (obj instanceof Date) return obj;

    const camelObj: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        camelObj[camelKey] = snakeToCamel(value);
    }
    return camelObj;
}

/**
 * Transform camelCase frontend objects to snake_case for API
 */
export function camelToSnake(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    if (Array.isArray(obj)) return obj.map(camelToSnake);
    if (typeof obj !== 'object') return obj;
    if (obj instanceof Date) return obj.toISOString();

    const snakeObj: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        snakeObj[snakeKey] = camelToSnake(value);
    }
    return snakeObj;
}


// ─── Sync Engine Class ───

type SyncListener = (state: SyncState) => void;

class SyncEngine {
    private state: SyncState = {
        status: 'online',
        lastSyncedAt: localStorage.getItem(CACHE_KEYS.LAST_SYNC),
        pendingMutations: getCachedData<QueuedMutation[]>(CACHE_KEYS.MUTATION_QUEUE, []),
        syncErrors: [],
    };

    private listeners: Set<SyncListener> = new Set();
    private retryTimer: ReturnType<typeof setTimeout> | null = null;
    private connectivityCheckInterval: ReturnType<typeof setInterval> | null = null;

    constructor() {
        // Monitor connectivity
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());

        // Start periodic connectivity check
        this.connectivityCheckInterval = setInterval(() => this.checkConnectivity(), 30000);

        // Process any queued mutations on startup
        if (this.state.pendingMutations.length > 0) {
            this.processMutationQueue();
        }
    }

    // ─── State Management ───

    subscribe(listener: SyncListener): () => void {
        this.listeners.add(listener);
        listener(this.state); // Immediate initial state
        return () => this.listeners.delete(listener);
    }

    private emit() {
        for (const listener of this.listeners) {
            listener(this.state);
        }
    }

    private updateStatus(status: ConnectionStatus) {
        this.state.status = status;
        this.emit();
    }

    getState(): SyncState {
        return { ...this.state };
    }

    // ─── Connectivity ───

    private async checkConnectivity(): Promise<boolean> {
        try {
            const response = await fetch(
                `${apiClient.defaults.baseURL}/health`,
                { method: 'GET', signal: AbortSignal.timeout(5000) }
            );
            if (response.ok && this.state.status !== 'online') {
                this.handleOnline();
            }
            return response.ok;
        } catch {
            if (this.state.status === 'online') {
                this.handleOffline();
            }
            return false;
        }
    }

    private handleOnline() {
        this.updateStatus('reconnecting');
        this.processMutationQueue().then(() => {
            this.updateStatus('online');
        });
    }

    private handleOffline() {
        this.updateStatus('offline');
        if (this.retryTimer) {
            clearTimeout(this.retryTimer);
            this.retryTimer = null;
        }
    }

    // ─── Read Operations (API-first, cache fallback) ───

    /**
     * Load full student dashboard composite payload
     */
    async loadDashboard(studentId: string): Promise<DashboardPayload> {
        try {
            const { data } = await apiClient.get(`/students/${studentId}/dashboard`);
            const payload = snakeToCamel(data) as DashboardPayload;

            // Cache all sections
            setCachedData(CACHE_KEYS.SUBJECTS, payload.subjects);
            setCachedData(CACHE_KEYS.ASSIGNMENTS, payload.assignments);
            setCachedData(CACHE_KEYS.SESSIONS, payload.sessions);
            setCachedData(CACHE_KEYS.MESSAGES, payload.messages);
            setCachedData(CACHE_KEYS.RESOURCES, payload.resources);
            setCachedData(CACHE_KEYS.ANALYTICS, payload.analytics);
            setCachedData(CACHE_KEYS.ASSESSMENTS, payload.assessments);
            setCachedData(CACHE_KEYS.INTERVENTIONS, payload.interventions);
            setCachedData(CACHE_KEYS.MINDPRINT_PROFILE, payload.mindPrintProfile);

            this.state.lastSyncedAt = new Date().toISOString();
            localStorage.setItem(CACHE_KEYS.LAST_SYNC, this.state.lastSyncedAt);
            this.updateStatus('online');

            return payload;
        } catch (error: any) {
            console.warn('[SyncEngine] Dashboard fetch failed, using cache:', error.message);
            this.updateStatus('offline');

            // Return cached data
            return {
                subjects: getCachedData(CACHE_KEYS.SUBJECTS, []),
                assignments: getCachedData(CACHE_KEYS.ASSIGNMENTS, []),
                sessions: getCachedData(CACHE_KEYS.SESSIONS, []),
                messages: getCachedData(CACHE_KEYS.MESSAGES, []),
                resources: getCachedData(CACHE_KEYS.RESOURCES, []),
                analytics: getCachedData(CACHE_KEYS.ANALYTICS, null as any),
                assessments: getCachedData(CACHE_KEYS.ASSESSMENTS, []),
                interventions: getCachedData(CACHE_KEYS.INTERVENTIONS, []),
                mindPrintProfile: getCachedData(CACHE_KEYS.MINDPRINT_PROFILE, null),
            };
        }
    }

    /**
     * Fetch a single resource from API with cache fallback
     */
    async fetchWithCache<T>(endpoint: string, cacheKey: string, fallback: T): Promise<T> {
        try {
            const { data } = await apiClient.get(endpoint);
            const transformed = snakeToCamel(data);
            setCachedData(cacheKey, transformed);
            return transformed;
        } catch (error: any) {
            console.warn(`[SyncEngine] Fetch ${endpoint} failed, using cache`);
            return getCachedData(cacheKey, fallback);
        }
    }

    /**
     * Load MindPrint profile for a student
     */
    async loadMindPrintProfile(studentId: string): Promise<any> {
        return this.fetchWithCache(
            `/mindprint/${studentId}`,
            CACHE_KEYS.MINDPRINT_PROFILE,
            null
        );
    }

    /**
     * Load historical MindPrint trends
     */
    async loadMindPrintTrends(studentId: string, dimension?: string): Promise<any> {
        const url = dimension
            ? `/mindprint/${studentId}/trends?dimension=${dimension}`
            : `/mindprint/${studentId}/trends`;
        try {
            const { data } = await apiClient.get(url);
            return snakeToCamel(data);
        } catch {
            return { trends: [] };
        }
    }

    /**
     * Load assessments
     */
    async loadAssessments(studentId?: string): Promise<any[]> {
        const url = studentId
            ? `/assessments?studentId=${studentId}`
            : '/assessments';
        return this.fetchWithCache(url, CACHE_KEYS.ASSESSMENTS, []);
    }

    // ─── Write Operations (Optimistic + Queue) ───

    /**
     * Submit an assessment completion to the backend.
     * Optimistic: cache immediately, POST in background.
     */
    async submitAssessment(assessmentId: string, payload: {
        behavioralObservations?: string;
    }): Promise<any> {
        const endpoint = `/assessments/${assessmentId}/complete`;

        return this.optimisticMutation({
            type: 'assessment',
            endpoint,
            method: 'POST',
            payload: camelToSnake(payload),
            cacheKey: CACHE_KEYS.ASSESSMENTS,
        });
    }

    /**
     * Submit quiz answers for server-side grading
     */
    async submitQuizAttempt(quizId: string, payload: {
        answers: Record<string, string | number>;
        timeSpent: number;
    }): Promise<any> {
        const endpoint = `/quizzes/${quizId}/attempts`;

        return this.optimisticMutation({
            type: 'quiz_attempt',
            endpoint,
            method: 'POST',
            payload: camelToSnake(payload),
        });
    }

    /**
     * Update content visibility (admin/tutor)
     */
    async updateContentVisibility(lessonId: string, payload: {
        isVisible: boolean;
        releaseDate?: string;
        quizVisible?: boolean;
    }): Promise<any> {
        const endpoint = `/admin/content/${lessonId}/visibility`;

        return this.optimisticMutation({
            type: 'content_visibility',
            endpoint,
            method: 'PUT',
            payload: camelToSnake(payload),
        });
    }

    /**
     * Update subject progress
     */
    async updateProgress(subjectId: string, progress: number): Promise<void> {
        const endpoint = `/subjects/${subjectId}/progress`;

        await this.optimisticMutation({
            type: 'progress',
            endpoint,
            method: 'PUT',
            payload: { progress },
            cacheKey: CACHE_KEYS.SUBJECTS,
        });
    }

    /**
     * Core optimistic mutation handler
     */
    private async optimisticMutation(opts: {
        type: QueuedMutation['type'];
        endpoint: string;
        method: 'POST' | 'PUT' | 'DELETE';
        payload: any;
        cacheKey?: string;
    }): Promise<any> {
        const mutationId = `mut_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

        // Snapshot current cache for rollback
        let prevCache: string | null = null;
        if (opts.cacheKey) {
            prevCache = localStorage.getItem(opts.cacheKey);
        }

        const mutation: QueuedMutation = {
            id: mutationId,
            type: opts.type,
            endpoint: opts.endpoint,
            method: opts.method,
            payload: opts.payload,
            createdAt: new Date().toISOString(),
            retries: 0,
            maxRetries: MAX_RETRY_ATTEMPTS,
            optimisticKey: opts.cacheKey,
            optimisticPrev: prevCache ?? undefined,
        };

        // If online, attempt immediately
        if (this.state.status === 'online') {
            try {
                const response = await this.executeMutation(mutation);
                return response;
            } catch (error: any) {
                console.warn(`[SyncEngine] Mutation failed, queueing for retry:`, error.message);

                // Queue for retry
                this.queueMutation(mutation);

                // Return null to indicate deferred
                return null;
            }
        } else {
            // Offline: queue mutation
            this.queueMutation(mutation);
            return null;
        }
    }

    /**
     * Execute a single mutation against the API
     */
    private async executeMutation(mutation: QueuedMutation): Promise<any> {
        const config = {
            method: mutation.method.toLowerCase() as any,
            url: mutation.endpoint,
            data: mutation.payload,
        };

        const { data } = await apiClient(config);
        return snakeToCamel(data);
    }

    /**
     * Add a mutation to the offline queue
     */
    private queueMutation(mutation: QueuedMutation) {
        this.state.pendingMutations.push(mutation);
        setCachedData(CACHE_KEYS.MUTATION_QUEUE, this.state.pendingMutations);
        this.emit();
    }

    /**
     * Process all queued mutations sequentially
     */
    private async processMutationQueue(): Promise<void> {
        if (this.state.pendingMutations.length === 0) return;

        const queue = [...this.state.pendingMutations];
        const processed: string[] = [];
        const failed: QueuedMutation[] = [];

        for (const mutation of queue) {
            try {
                await this.executeMutation(mutation);
                processed.push(mutation.id);
            } catch (error: any) {
                mutation.retries++;

                if (mutation.retries >= mutation.maxRetries) {
                    // Give up — rollback if possible
                    if (mutation.optimisticKey && mutation.optimisticPrev) {
                        localStorage.setItem(mutation.optimisticKey, mutation.optimisticPrev);
                    }

                    this.state.syncErrors.push({
                        mutationId: mutation.id,
                        error: error.message || 'Unknown error',
                        timestamp: new Date().toISOString(),
                        dismissed: false,
                    });
                } else {
                    failed.push(mutation);
                }
            }
        }

        // Update queue with only failed items
        this.state.pendingMutations = failed;
        setCachedData(CACHE_KEYS.MUTATION_QUEUE, this.state.pendingMutations);
        this.emit();

        // Retry failed items after delay
        if (failed.length > 0) {
            this.retryTimer = setTimeout(() => this.processMutationQueue(), RETRY_DELAY_MS);
        }
    }

    /**
     * Dismiss a sync error notification
     */
    dismissError(mutationId: string) {
        const error = this.state.syncErrors.find(e => e.mutationId === mutationId);
        if (error) error.dismissed = true;
        this.emit();
    }

    /**
     * Clear all dismissed errors
     */
    clearDismissedErrors() {
        this.state.syncErrors = this.state.syncErrors.filter(e => !e.dismissed);
        this.emit();
    }

    /**
     * Force a full re-sync from the server
     */
    async forceSync(studentId: string): Promise<DashboardPayload> {
        this.updateStatus('reconnecting');
        const result = await this.loadDashboard(studentId);
        this.updateStatus('online');
        return result;
    }

    /**
     * Cleanup on logout
     */
    destroy() {
        if (this.retryTimer) clearTimeout(this.retryTimer);
        if (this.connectivityCheckInterval) clearInterval(this.connectivityCheckInterval);
        window.removeEventListener('online', () => this.handleOnline());
        window.removeEventListener('offline', () => this.handleOffline());
        this.listeners.clear();
    }
}

// Singleton instance
export const syncEngine = new SyncEngine();
export default syncEngine;
