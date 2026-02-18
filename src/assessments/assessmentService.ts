import type { StudentAssessment, MindPrintProfile, CognitiveDimensionId } from './types';
import { scoringEngine } from './scoringEngine';

const KEYS = {
    ASSESSMENTS: 'lms_assessments',
    PROFILES: 'lms_mindprint_profiles'
};

class AssessmentService {
    private getAssessments(): StudentAssessment[] {
        const saved = localStorage.getItem(KEYS.ASSESSMENTS);
        return saved ? JSON.parse(saved) : [];
    }

    private saveAssessments(assessments: StudentAssessment[]) {
        localStorage.setItem(KEYS.ASSESSMENTS, JSON.stringify(assessments));
    }

    async saveAssessment(assessment: Omit<StudentAssessment, 'id' | 'createdAt' | 'updatedAt'>): Promise<StudentAssessment> {
        const all = this.getAssessments();
        const newAssessment: StudentAssessment = {
            ...assessment,
            id: `asmt-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        all.push(newAssessment);
        this.saveAssessments(all);

        // Trigger profile update
        await this.updateProfile(newAssessment.studentId);

        return newAssessment;
    }

    async getStudentAssessments(studentId: string): Promise<StudentAssessment[]> {
        return this.getAssessments().filter(a => a.studentId === studentId);
    }

    async getRecentAssessments(limit: number = 10): Promise<StudentAssessment[]> {
        return this.getAssessments()
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, limit);
    }

    async getProfile(studentId: string): Promise<MindPrintProfile | null> {
        const saved = localStorage.getItem(KEYS.PROFILES);
        const profiles: MindPrintProfile[] = saved ? JSON.parse(saved) : [];
        return profiles.find(p => p.studentId === studentId) || null;
    }

    private async updateProfile(studentId: string) {
        const assessments = await this.getStudentAssessments(studentId);
        if (assessments.length === 0) return;

        const dimensions: CognitiveDimensionId[] = [
            'working_memory', 'processing_speed', 'executive_function',
            'verbal_reasoning', 'spatial_reasoning', 'pattern_recognition',
            'focus_attention', 'cognitive_endurance'
        ];

        const profileDimensions = dimensions.map(dimId => {
            const dimAssessments = assessments.filter(a => a.dimensionId === dimId);
            const historicalScores = dimAssessments.map(a => ({
                date: a.createdAt,
                percentile: a.calculatedResults.percentile,
                testId: a.testId
            }));

            const latest = historicalScores.length > 0
                ? historicalScores.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
                : null;

            return {
                dimensionId: dimId,
                currentPercentile: latest ? latest.percentile : 50,
                historicalScores,
                trend: scoringEngine.getTrend(historicalScores),
                confidence: latest ? 90 : 0 // Simplified
            };
        });

        const getAvg = (ids: CognitiveDimensionId[]) => {
            const scores = profileDimensions.filter(d => ids.includes(d.dimensionId)).map(d => d.currentPercentile);
            return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 50;
        };

        const newProfile: MindPrintProfile = {
            studentId,
            lastUpdated: new Date().toISOString(),
            dimensions: profileDimensions,
            compositeScores: {
                fluidIntelligence: getAvg(['pattern_recognition', 'verbal_reasoning', 'spatial_reasoning']),
                crystallizedIntelligence: getAvg(['verbal_reasoning']), // Simplified
                cognitiveEfficiency: getAvg(['processing_speed', 'working_memory']),
                executiveFunction: getAvg(['executive_function', 'focus_attention', 'cognitive_endurance'])
            },
            riskFactors: profileDimensions.filter(d => d.currentPercentile < 25).map(d => d.dimensionId),
            strengths: profileDimensions.filter(d => d.currentPercentile > 75).map(d => d.dimensionId),
            developmentTargets: profileDimensions.filter(d => d.currentPercentile < 40).map(d => d.dimensionId)
        };

        const saved = localStorage.getItem(KEYS.PROFILES);
        const profiles: MindPrintProfile[] = saved ? JSON.parse(saved) : [];
        const index = profiles.findIndex(p => p.studentId === studentId);
        if (index !== -1) {
            profiles[index] = newProfile;
        } else {
            profiles.push(newProfile);
        }
        localStorage.setItem(KEYS.PROFILES, JSON.stringify(profiles));
    }
}

export const assessmentService = new AssessmentService();
