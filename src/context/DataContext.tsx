import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
    Subject,
    Assignment,
    TutoringSession,
    Message,
    Resource,
    AnalyticsData,
    Student,
    Tutor
} from '../types';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

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
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [sessions, setSessions] = useState<TutoringSession[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [resources, setResources] = useState<Resource[]>([]);
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshData = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const [allSubjects, allAssignments, allSessions, m, allResources, ad] = await Promise.all([
                api.getSubjects(),
                api.getAssignments(),
                api.getSessions(),
                api.getMessages(),
                api.getResources(),
                api.getAnalytics()
            ]);

            let filteredSubjects = allSubjects;
            let filteredAssignments = allAssignments;
            let filteredSessions = allSessions;
            let filteredResources = allResources;

            if (user.role === 'student') {
                const student = user as Student;
                const enrolledIds = student.enrolledSubjects || [];
                filteredSubjects = allSubjects.filter(s => enrolledIds.includes(s.id));
                filteredAssignments = allAssignments.filter(a => enrolledIds.includes(a.subjectId));
                filteredSessions = allSessions.filter(s => enrolledIds.includes(s.subjectId));
                filteredResources = allResources.filter(r => enrolledIds.includes(r.subjectId));
            } else if (user.role === 'tutor') {
                const tutor = user as Tutor;
                const tutorSubjectIds = tutor.subjects || [];
                filteredSubjects = allSubjects.filter(s => tutorSubjectIds.includes(s.id));
                filteredAssignments = allAssignments.filter(a => tutorSubjectIds.includes(a.subjectId));
                filteredSessions = allSessions.filter(s => tutorSubjectIds.includes(s.subjectId));
                filteredResources = allResources.filter(r => tutorSubjectIds.includes(r.subjectId));
            } else if (user.role === 'parent') {
                // const parent = user as Parent;
                // For now, parents see everything their children see (simulated by showing all for now, or we could fetch child data)
                // In a real app, we'd fetch the subjects for parent.childrenIds
            }

            setSubjects(filteredSubjects);
            setAssignments(filteredAssignments);
            setSessions(filteredSessions);
            setMessages(m);
            setResources(filteredResources);
            setAnalytics(ad);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    const updateSubjectProgress = async (subjectId: string, progress: number) => {
        await api.updateSubjectProgress(subjectId, progress);
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
            sendMessage
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
