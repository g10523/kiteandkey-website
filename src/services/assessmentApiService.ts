import apiClient from './apiClient';
import type { StudentAssessment, MindPrintProfile, CognitiveDimensionId } from '../assessments/types';

export interface CreateAssessmentData {
    studentId: string;
    dimension: CognitiveDimensionId;
    testType: 'screener' | 'standard' | 'diagnostic';
    rawScores: {
        total: number;
        subtests?: Record<string, number>;
        timeMinutes?: number;
    };
    behavioralObservations?: string;
    environmentalFactors?: {
        timeOfDay?: string;
        distractions?: string[];
        mood?: string;
    };
}

export const assessmentApiService = {
    /**
     * Create new assessment and auto-calculate profile
     */
    async createAssessment(data: CreateAssessmentData): Promise<{ assessment: StudentAssessment; profile: MindPrintProfile }> {
        const response = await apiClient.post('/assessments', data);
        return response.data;
    },

    /**
     * Get student's assessment history
     */
    async getStudentAssessments(studentId: string): Promise<StudentAssessment[]> {
        const response = await apiClient.get(`/assessments?studentId=${studentId}`);
        return response.data.assessments;
    },

    /**
     * Get single assessment details
     */
    async getAssessment(id: string): Promise<StudentAssessment> {
        const response = await apiClient.get(`/assessments/${id}`);
        return response.data.assessment;
    },

    /**
     * Get recent assessments (all students, for admin/tutor)
     */
    async getRecentAssessments(limit = 50): Promise<StudentAssessment[]> {
        const response = await apiClient.get(`/assessments?limit=${limit}`);
        return response.data.assessments;
    },

    /**
     * Mark assessment as invalid (if error discovered)
     */
    async invalidateAssessment(id: string, reason: string): Promise<void> {
        await apiClient.post(`/assessments/${id}/invalid`, { reason });
    }
};
