import {
    subjects as initialSubjects,
    assignments as initialAssignments,
    tutoringSessions as initialSessions,
    messages as initialMessages,
    resources as initialResources,
    analyticsData as initialAnalytics
} from '../data/mockData';
import type {
    Subject,
    Assignment,
    TutoringSession,
    Message,
    Resource,
    AnalyticsData
} from '../types';

// Persistence Keys
const KEYS = {
    SUBJECTS: 'lms_subjects',
    ASSIGNMENTS: 'lms_assignments',
    SESSIONS: 'lms_sessions',
    MESSAGES: 'lms_messages',
    RESOURCES: 'lms_resources',
    ANALYTICS: 'lms_analytics'
};

// Helper to handle dates in JSON
const dateReviver = (_key: string, value: any) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        return new Date(value);
    }
    return value;
};

class ApiService {
    private getItem<T>(key: string, defaultValue: T): T {
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
                return JSON.parse(saved, dateReviver);
            } catch (e) {
                console.error(`Error parsing ${key} from storage`, e);
            }
        }
        // Initialize if not present
        this.setItem(key, defaultValue);
        return defaultValue;
    }

    private setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Subjects
    async getSubjects(): Promise<Subject[]> {
        return this.getItem(KEYS.SUBJECTS, initialSubjects);
    }

    async getSubject(id: string): Promise<Subject | undefined> {
        const subjects = await this.getSubjects();
        return subjects.find(s => s.id === id);
    }

    async updateSubjectProgress(subjectId: string, progress: number): Promise<void> {
        const subjects = await this.getSubjects();
        const index = subjects.findIndex(s => s.id === subjectId);
        if (index !== -1) {
            subjects[index].progress = progress;
            this.setItem(KEYS.SUBJECTS, subjects);
        }
    }

    // Assignments
    async getAssignments(): Promise<Assignment[]> {
        return this.getItem(KEYS.ASSIGNMENTS, initialAssignments);
    }

    async updateAssignmentStatus(id: string, status: Assignment['status']): Promise<void> {
        const assignments = await this.getAssignments();
        const index = assignments.findIndex(a => a.id === id);
        if (index !== -1) {
            assignments[index].status = status;
            this.setItem(KEYS.ASSIGNMENTS, assignments);
        }
    }

    // Sessions
    async getSessions(): Promise<TutoringSession[]> {
        return this.getItem(KEYS.SESSIONS, initialSessions);
    }

    // Messages
    async getMessages(): Promise<Message[]> {
        return this.getItem(KEYS.MESSAGES, initialMessages);
    }

    async sendMessage(message: Omit<Message, 'id' | 'date'>): Promise<Message> {
        const messages = await this.getMessages();
        const newMessage: Message = {
            ...message,
            id: `msg-${Date.now()}`,
            date: new Date()
        };
        const updated = [newMessage, ...messages];
        this.setItem(KEYS.MESSAGES, updated);
        return newMessage;
    }

    // Resources
    async getResources(): Promise<Resource[]> {
        return this.getItem(KEYS.RESOURCES, initialResources);
    }

    // Analytics
    async getAnalytics(): Promise<AnalyticsData> {
        return this.getItem(KEYS.ANALYTICS, initialAnalytics);
    }

    // Reset Data
    resetAllData() {
        Object.values(KEYS).forEach(key => localStorage.removeItem(key));
        window.location.reload();
    }
}

export const api = new ApiService();
