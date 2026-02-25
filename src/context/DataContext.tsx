import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
    Subject,
    Assignment,
    TutoringSession,
    Message,
    Resource,
    AnalyticsData,
} from '../types';
import { useAuth } from './AuthContext';
import { assessmentService } from '../assessments/assessmentService';
import type { StudentAssessment, MindPrintProfile } from '../assessments/types';
import { assignInterventions } from '../interventions/interventionEngine';
import type { AssignedIntervention, SessionLog } from '../interventions/interventionEngine';
import syncEngine from '../services/syncEngine';
import type { ConnectionStatus } from '../services/syncEngine';

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
    assessments: StudentAssessment[];
    studentProfile: MindPrintProfile | null;
    saveAssessment: (assessment: Omit<StudentAssessment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<StudentAssessment>;
    getProfile: (studentId: string) => Promise<MindPrintProfile | null>;
    interventions: AssignedIntervention[];
    getInterventions: (studentId: string) => AssignedIntervention[];
    saveSessionLog: (log: SessionLog) => Promise<void>;
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
    const [isLoading, setIsLoading] = useState(true);

    // Assessment + Intervention state
    const [assessments, setAssessments] = useState<StudentAssessment[]>([]);
    const [studentProfile, setStudentProfile] = useState<MindPrintProfile | null>(null);
    const [interventions, setInterventions] = useState<AssignedIntervention[]>([]);

    // Sync engine state
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('online');
    const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
    const [pendingMutationCount, setPendingMutationCount] = useState(0);

    // Subscribe to sync engine state changes
    useEffect(() => {
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
            await refreshFromBackend();
        } catch (error) {
            console.error("[DataContext] Failed to fetch data", error);
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
            console.warn('[DataContext] Backend refresh failed, starting with empty data:', error);
            // Start with empty state — no mock fallback
        }
    }

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    // ─── Mutations ───

    const updateSubjectProgress = async (subjectId: string, progress: number) => {
        await syncEngine.updateProgress(subjectId, progress);
        await refreshData();
    };

    const updateAssignmentStatus = async (id: string, status: Assignment['status']) => {
        // TODO: implement backend assignment update
        console.warn('[DataContext] updateAssignmentStatus: backend endpoint not yet implemented');
        await refreshData();
    };

    const sendMessage = async (message: Omit<Message, 'id' | 'date'>) => {
        // TODO: implement backend message sending
        console.warn('[DataContext] sendMessage: backend endpoint not yet implemented');
        await refreshData();
    };

    const saveAssessment = async (assessment: Omit<StudentAssessment, 'id' | 'createdAt' | 'updatedAt'>) => {
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
            console.warn('[DataContext] Backend assessment save failed, using local fallback:', error);

            // Local fallback for assessment saving
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
        }
    };

    const getProfile = async (studentId: string) => {
        try {
            const data = await syncEngine.loadMindPrintProfile(studentId);
            return data?.profile || null;
        } catch {
            return assessmentService.getProfile(studentId);
        }
    };

    const getInterventions = (studentId: string) => {
        return interventions.filter(i => i.targetStudentId === studentId);
    };

    const saveSessionLog = async (log: SessionLog) => {
        // TODO: POST to /api/interventions/:id/sessions
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
