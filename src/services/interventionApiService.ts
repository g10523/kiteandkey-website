import apiClient from './apiClient';
import type { AssignedIntervention, SessionLog, StudentReflection } from '../interventions/interventionEngine';

export interface CreateSessionLogData {
    interventionId: string;
    studentId: string;
    scheduledDate: Date;
    durationMinutes: number;
    protocolStepsCompleted: string[];
    stepsSkipped?: string[];
    materialsUsed: string[];
    scriptAdherence: 'full' | 'partial' | 'adapted' | 'none';
    adaptationsMade?: string;
    engagementLevel: number; // 1-5
    cognitiveLoad?: number; // 1-5
    strategyUse?: string;
    breakthroughs?: string[];
    frustrations?: string[];
    objectiveMet: boolean;
    evidence?: string;
    nextSessionAdjustment?: string;
    requiresSupervision?: boolean;
    reassessmentRecommended?: boolean;
}

export const interventionApiService = {
    /**
     * Get all intervention protocols (library)
     */
    async getProtocols(dimension?: string): Promise<any[]> {
        const params = dimension ? `?dimension=${dimension}` : '';
        const response = await apiClient.get(`/interventions/protocols${params}`);
        return response.data.protocols;
    },

    /**
     * Get student's assigned interventions (for Cognitive Gym)
     */
    async getStudentInterventions(studentId: string): Promise<AssignedIntervention[]> {
        const response = await apiClient.get(`/interventions/assigned?studentId=${studentId}`);
        return response.data.interventions;
    },

    /**
     * Assign intervention to student
     */
    async assignIntervention(data: {
        studentId: string;
        protocolId: string;
        priority: 'critical' | 'recommended' | 'enhancement';
        sessionsTarget: number;
        targetWeeks: number;
    }): Promise<AssignedIntervention> {
        const response = await apiClient.post('/interventions/assign', data);
        return response.data.intervention;
    },

    /**
     * Get single assigned intervention with full history
     */
    async getAssignedIntervention(id: string): Promise<AssignedIntervention> {
        const response = await apiClient.get(`/interventions/assigned/${id}`);
        return response.data.intervention;
    },

    /**
     * Tutor: Log session fidelity data
     */
    async logSession(data: CreateSessionLogData): Promise<SessionLog> {
        const response = await apiClient.post('/interventions/sessions', data);
        return response.data.sessionLog;
    },

    /**
     * Student: Submit reflection for session
     */
    async submitReflection(interventionId: string, reflection: StudentReflection): Promise<void> {
        await apiClient.post(`/interventions/assigned/${interventionId}/reflect`, reflection);
    },

    /**
     * Get session logs for an intervention
     */
    async getSessionLogs(interventionId: string): Promise<SessionLog[]> {
        const response = await apiClient.get(`/interventions/assigned/${interventionId}/sessions`);
        return response.data.sessions;
    },

    /**
     * Mark intervention as complete
     */
    async completeIntervention(id: string, outcome: {
        finalNotes: string;
        wasSuccessful: boolean;
        reassessmentScheduled?: boolean;
    }): Promise<void> {
        await apiClient.put(`/interventions/assigned/${id}/complete`, outcome);
    },

    /**
     * Get fidelity statistics (for admin dashboard)
     */
    async getFidelityStats(tutorId?: string): Promise<{
        avgFidelityScore: number;
        totalSessions: number;
        byIntervention: Array<{
            title: string;
            avgFidelity: number;
            sessionCount: number;
        }>;
    }> {
        const params = tutorId ? `?tutorId=${tutorId}` : '';
        const response = await apiClient.get(`/interventions/fidelity-stats${params}`);
        return response.data;
    }
};
