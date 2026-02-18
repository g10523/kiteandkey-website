import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
    Subject,
    Assignment,
    TutoringSession,
    Message,
    Resource,
    AnalyticsData,
} from '../types';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { assessmentService } from '../assessments/assessmentService';
import type { StudentAssessment, MindPrintProfile } from '../assessments/types';
import { assignInterventions } from '../interventions/interventionEngine';
import type { AssignedIntervention, SessionLog } from '../interventions/interventionEngine';
import syncEngine from '../services/syncEngine';
import type { ConnectionStatus } from '../services/syncEngine';

// ─── Configuration ───

/**
 * When true, data loads through the sync engine / backend API.
 * When false, uses the original mock localStorage system.
 */
const USE_BACKEND_DATA = import.meta.env.VITE_USE_BACKEND_AUTH === 'true';

// ─── Types ───

interface DataContextType {
    subjects: Subject[];
    assignments: Assignment[];
    sessions: TutoringSession[];
    messages: Message[];
    resources: Resource[];
    analytics: AnalyticsData | null;
    isLoading: boolean;
    refreshData: () => Promise<void>;
    updateSubjectProgress: (subjectId: string, progress: number) => Promise<void>;
    updateAssignmentStatus: (id: string, status: Assignment['status']) => Promise<void>;
    sendMessage: (message: Omit<Message, 'id' | 'date'>) => Promise<void>;

    // Assessment Engine
    assessments: StudentAssessment[];
    studentProfile: MindPrintProfile | null;
    saveAssessment: (assessment: Omit<StudentAssessment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<StudentAssessment>;
    getProfile: (studentId: string) => Promise<MindPrintProfile | null>;

    // Intervention Engine
    interventions: AssignedIntervention[];
    getInterventions: (studentId: string) => AssignedIntervention[];
    saveSessionLog: (log: SessionLog) => Promise<void>;

    // Sync status
    connectionStatus: ConnectionStatus;
    lastSyncedAt: string | null;
    pendingMutationCount: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// ─── Provider ───

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [sessions, setSessions] = useState<TutoringSession[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [resources, setResources] = useState<Resource[]>([]);
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [assessments, setAssessments] = useState<StudentAssessment[]>([]);
    const [studentProfile, setStudentProfile] = useState<MindPrintProfile | null>(null);
    const [interventions, setInterventions] = useState<AssignedIntervention[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Sync engine state
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('online');
    const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
    const [pendingMutationCount, setPendingMutationCount] = useState(0);

    // Subscribe to sync engine state changes
    useEffect(() => {
        if (!USE_BACKEND_DATA) return;

        const unsubscribe = syncEngine.subscribe((syncState) => {
            setConnectionStatus(syncState.status);
            setLastSyncedAt(syncState.lastSyncedAt);
            setPendingMutationCount(syncState.pendingMutations.length);
        });

        return unsubscribe;
    }, []);

    // ─── Data Loading ───

    const refreshData = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);

        try {
            if (USE_BACKEND_DATA) {
                await refreshFromBackend();
            } else {
                await refreshFromMock();
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    /**
     * Load data via the sync engine (API-first, localStorage fallback)
     */
    async function refreshFromBackend() {
        if (!user) return;

        try {
            const dashboard = await syncEngine.loadDashboard(user.id);

            setSubjects(dashboard.subjects || []);
            setAssignments(dashboard.assignments || []);
            setSessions(dashboard.sessions || []);
            setMessages(dashboard.messages || []);
            setResources(dashboard.resources || []);
            setAnalytics(dashboard.analytics || null);

            // Load assessments and MindPrint profile
            if (user.role === 'student') {
                const [profileData, assessmentData] = await Promise.all([
                    syncEngine.loadMindPrintProfile(user.id),
                    syncEngine.loadAssessments(user.id),
                ]);

                if (profileData?.profile) {
                    setStudentProfile(profileData.profile);
                }
                const fetchedAssessments = Array.isArray(assessmentData) ? assessmentData : (assessmentData as any)?.assessments;
                if (fetchedAssessments) {
                    setAssessments(fetchedAssessments);
                }
            }
        } catch (error) {
            console.warn('[DataContext] Backend refresh failed:', error);

            // Graceful degradation: attempt mock data
            await refreshFromMock();
        }
    }

    /**
     * Load from mock localStorage API (original behavior)
     */
    async function refreshFromMock() {
        if (!user) return;

        const [allSubjects, allAssignments, allSessions, m, allResources, ad, allAssessments] = await Promise.all([
            api.getSubjects(),
            api.getAssignments(),
            api.getSessions(),
            api.getMessages(),
            api.getResources(),
            api.getAnalytics(),
            assessmentService.getRecentAssessments()
        ]);

        // Register user in courseStore (so admin can assign courses)
        const { registerUser, getAccessibleCourseIds } = await import('../services/courseStore');
        registerUser({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            yearLevel: (user as any).yearLevel
        });

        let filteredSubjects = allSubjects;
        let filteredAssignments = allAssignments;
        let filteredSessions = allSessions;
        let filteredResources = allResources;

        // Load persistent interventions
        const storedInterventionsStr = localStorage.getItem('lms_interventions');
        const storedInterventions: AssignedIntervention[] = storedInterventionsStr ? JSON.parse(storedInterventionsStr) : [];
        let activeInterventions = storedInterventions;

        // ── COURSE ACCESS CONTROL ──
        const accessibleCourseIds = getAccessibleCourseIds(user.id, user.role);

        if (accessibleCourseIds !== null) {
            filteredSubjects = allSubjects.filter(s => accessibleCourseIds.includes(s.id));
            filteredAssignments = allAssignments.filter(a => accessibleCourseIds.includes(a.subjectId));
            filteredSessions = allSessions.filter(s => accessibleCourseIds.includes(s.subjectId));
            filteredResources = allResources.filter(r => accessibleCourseIds.includes(r.subjectId));
        }

        if (user.role === 'student') {
            const profile = await assessmentService.getProfile(user.id);
            if (profile) {
                setStudentProfile(profile);
                const myAssessments = allAssessments.filter(a => a.studentId === user.id);
                const generated = assignInterventions(profile, myAssessments);

                const merged = generated.map(gen => {
                    const existing = storedInterventions.find(s => s.title === gen.title && s.targetStudentId === user.id);
                    if (existing) {
                        return {
                            ...gen,
                            id: existing.id,
                            sessionLogs: existing.sessionLogs || [],
                            progressLog: existing.progressLog || [],
                            status: existing.status
                        };
                    }
                    return gen;
                });

                activeInterventions = [
                    ...storedInterventions.filter(i => i.targetStudentId !== user.id),
                    ...merged
                ];

                localStorage.setItem('lms_interventions', JSON.stringify(activeInterventions));
            }
        } else if (user.role === 'tutor' || user.role === 'admin') {
            activeInterventions = storedInterventions;
        }

        setSubjects(filteredSubjects);
        setAssignments(filteredAssignments);
        setSessions(filteredSessions);
        setMessages(m);
        setResources(filteredResources);
        setAnalytics(ad);
        setAssessments(allAssessments);
        setInterventions(activeInterventions);
    }

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    // ─── Mutations ───

    const updateSubjectProgress = async (subjectId: string, progress: number) => {
        if (USE_BACKEND_DATA) {
            await syncEngine.updateProgress(subjectId, progress);
        } else {
            await api.updateSubjectProgress(subjectId, progress);
        }
        await refreshData();
    };

    const updateAssignmentStatus = async (id: string, status: Assignment['status']) => {
        await api.updateAssignmentStatus(id, status);
        await refreshData();
    };

    const sendMessage = async (message: Omit<Message, 'id' | 'date'>) => {
        await api.sendMessage(message);
        await refreshData();
    };

    const saveAssessment = async (assessment: Omit<StudentAssessment, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (USE_BACKEND_DATA) {
            // Submit to backend
            try {
                const { data } = await (await import('../services/apiClient')).default.post('/assessments', {
                    studentId: assessment.studentId,
                    dimension: assessment.dimensionId,
                    testType: 'standard',
                    rawScores: assessment.rawScores,
                    behavioralObservations: assessment.behavioralObservations,
                    environmentalFactors: assessment.environmentalFactors,
                });

                // Update profile from backend response
                if (data.profile) {
                    setStudentProfile(data.profile);
                }

                await refreshData();
                return data.assessment;
            } catch (error) {
                console.warn('[DataContext] Backend assessment save failed, using local:', error);
                // Fall through to local save
            }
        }

        // Local save (mock or fallback)
        const newAsmt = await assessmentService.saveAssessment(assessment);
        const all = await assessmentService.getRecentAssessments();
        setAssessments(all);

        if (user?.role === 'student' && user.id === assessment.studentId) {
            const profile = await assessmentService.getProfile(user.id);
            if (profile) {
                setStudentProfile(profile);
                const newInterventions = assignInterventions(profile, all);
                setInterventions(prev => {
                    const existing = prev.filter(i => i.targetStudentId !== user.id);
                    return [...existing, ...newInterventions];
                });
            }
        }
        return newAsmt;
    };

    const getProfile = async (studentId: string) => {
        if (USE_BACKEND_DATA) {
            try {
                const data = await syncEngine.loadMindPrintProfile(studentId);
                return data?.profile || null;
            } catch {
                // Fall through
            }
        }
        return assessmentService.getProfile(studentId);
    };

    const getInterventions = (studentId: string) => {
        return interventions.filter(i => i.targetStudentId === studentId);
    };

    const saveSessionLog = async (log: SessionLog) => {
        // In backend mode, this would POST to /api/interventions/:id/sessions
        const updated = interventions.map(i => {
            if (i.id === log.interventionId) {
                return {
                    ...i,
                    sessionLogs: [...(i.sessionLogs || []), log]
                };
            }
            return i;
        });
        setInterventions(updated);
        localStorage.setItem('lms_interventions', JSON.stringify(updated));
    };

    // ─── Render ───

    return (
        <DataContext.Provider value={{
            subjects,
            assignments,
            sessions,
            messages,
            resources,
            analytics,
            isLoading,
            refreshData,
            updateSubjectProgress,
            updateAssignmentStatus,
            sendMessage,
            assessments,
            studentProfile,
            saveAssessment,
            getProfile,
            interventions,
            getInterventions,
            saveSessionLog,
            connectionStatus,
            lastSyncedAt,
            pendingMutationCount,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
