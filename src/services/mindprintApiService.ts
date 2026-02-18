import apiClient from './apiClient';
import type {
    MindPrintProfile,
    AssessmentBattery,
    AssessmentResults,
    CognitiveDimensionId,
    AssignedIntervention
} from '../types/mindprint';

export const mindprintApiService = {
    /**
     * Get student's MindPrint profile
     */
    async getProfile(studentId: string): Promise<MindPrintProfile> {
        const { data } = await apiClient.get(`/mindprint/${studentId}`);

        return {
            studentId: data.profile.studentId || data.profile.student_id,
            archetype: {
                id: data.profile.archetype || 'developing_profile',
                name: data.profile.archetypeName || data.profile.archetype || 'Developing Profile',
                confidence: data.profile.archetypeConfidence || data.profile.archetype_confidence || 0.5,
                description: data.profile.archetypeDescription || data.profile.archetype_description || 'Your cognitive profile is still emerging.'
            },
            dimensions: (data.profile.dimensions || []).map((d: any) => ({
                dimension: d.dimension || d.dimensionId,
                name: d.name || '',
                percentile: d.percentile || d.currentPercentile || 50,
                confidenceInterval: d.confidenceInterval || d.confidence_interval || [40, 60],
                trend: d.trend || 'stable',
                lastAssessed: d.lastAssessed || d.last_assessed || d.updatedAt,
                rawScore: d.rawScore || d.raw_score,
                standardScore: d.standardScore || d.standard_score
            })),
            compositeScores: data.profile.compositeScores || data.profile.composite_scores || {
                fluidIntelligence: 50,
                cognitiveEfficiency: 50,
                executiveFunction: 50,
                verbalReasoning: 50
            },
            developmentEdges: data.profile.developmentEdges || data.profile.development_edges || [],
            strengths: data.profile.strengths || [],
            updatedAt: data.profile.updatedAt || data.profile.updated_at || new Date().toISOString(),
            calculatedAt: data.profile.calculatedAt || data.profile.calculated_at || new Date().toISOString()
        };
    },

    /**
     * Get historical trends for dimension
     */
    async getTrends(studentId: string, dimension?: CognitiveDimensionId) {
        const params = dimension ? { dimension } : {};
        const { data } = await apiClient.get(`/mindprint/${studentId}/trends`, { params });
        return data.trends;
    },

    /**
     * Force profile recalculation (admin only)
     */
    async recalculateProfile(studentId: string) {
        const { data } = await apiClient.post(`/mindprint/${studentId}/recalculate`);
        return data.profile;
    },

    /**
     * Get archetype details
     */
    async getArchetypeDetails(archetypeId: string) {
        try {
            const { data } = await apiClient.get(`/mindprint/archetypes/${archetypeId}`);
            return data;
        } catch (error) {
            console.error('Failed to fetch archetype details:', error);
            return null;
        }
    },

    /**
     * Start new assessment session
     */
    async startAssessment(
        studentId: string,
        dimension: CognitiveDimensionId,
        testType: 'screener' | 'standard' | 'diagnostic' = 'standard'
    ): Promise<{ assessmentId: string; battery: AssessmentBattery }> {
        try {
            const { data } = await apiClient.post('/assessments/start', {
                studentId,
                dimension,
                testType
            });

            return {
                assessmentId: data.assessmentId,
                battery: {
                    id: data.battery.id,
                    dimension,
                    testType,
                    durationMinutes: data.battery.duration_minutes || data.time_limit,
                    items: data.battery.items || data.battery.stimuli_config?.items || [],
                    instructions: data.instructions || ''
                }
            };
        } catch (error) {
            // Fallback to mock data if backend not available
            console.warn('Backend not available, using mock assessment data');
            return this.getMockAssessmentBattery(studentId, dimension, testType);
        }
    },

    /**
     * Submit item response during test
     */
    async submitResponse(
        assessmentId: string,
        itemId: string,
        response: any,
        responseTime: number
    ) {
        try {
            const { data } = await apiClient.post('/assessments/response', {
                assessmentId,
                itemId,
                response,
                responseTime
            });

            return {
                nextItem: data.nextItem,
                progress: data.progress
            };
        } catch (error) {
            // Mock response for offline mode
            return {
                nextItem: null,
                progress: { current: 0, total: 28 }
            };
        }
    },

    /**
     * Get next item (for adaptive testing)
     */
    async getNextItem(assessmentId: string) {
        try {
            const { data } = await apiClient.get(`/assessments/${assessmentId}/next-item`);
            return {
                nextItem: data.nextItem,
                progress: data.progress
            };
        } catch (error) {
            return {
                nextItem: null,
                progress: { current: 0, total: 28 }
            };
        }
    },

    /**
     * Complete assessment and calculate results
     */
    async completeAssessment(
        assessmentId: string,
        behavioralObservations?: string
    ): Promise<{
        assessment: any;
        results: AssessmentResults;
        profile: MindPrintProfile;
        interventionsAssigned: AssignedIntervention[];
    }> {
        try {
            const { data } = await apiClient.post(`/assessments/${assessmentId}/complete`, {
                behavioralObservations: behavioralObservations || '',
                environmentalFactors: {
                    timeOfDay: new Date().getHours() < 12 ? 'morning' : 'afternoon',
                    distractions: [],
                    sessionNumber: 1
                }
            });

            return {
                assessment: data.assessment,
                results: data.results,
                profile: this.normalizeProfile(data.profile),
                interventionsAssigned: data.interventionsAssigned || []
            };
        } catch (error) {
            // Mock completion for demo
            console.warn('Backend not available, using mock results');
            return this.getMockAssessmentResults(assessmentId);
        }
    },

    /**
     * Mock assessment battery generator
     */
    getMockAssessmentBattery(
        _studentId: string, // Keep parameter but prefix with _ to acknowledge it's unused in mock
        dimension: CognitiveDimensionId,
        testType: string
    ): { assessmentId: string; battery: AssessmentBattery } {
        const assessmentId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        let items: any[] = [];
        let instructions = '';
        let duration = 10;

        if (dimension === 'working_memory') {
            duration = 8;
            instructions = 'You will see a series of numbers appear one at a time. Remember them in order, then enter them using the number pad. For backward trials, enter the numbers in reverse order.';
            // Forward span (3-9 digits)
            for (let span = 3; span <= 9; span++) {
                for (let trial = 1; trial <= 2; trial++) {
                    const sequence = Array.from({ length: span }, () => Math.floor(Math.random() * 9) + 1);
                    items.push({
                        id: `dsf_${span}_${trial}`,
                        type: 'digit_span_forward',
                        sequence,
                        span,
                        correctResponse: sequence,
                        difficulty: span,
                        timePerDigit: 1000
                    });
                }
            }
            // Backward span (2-8 digits)
            for (let span = 2; span <= 8; span++) {
                for (let trial = 1; trial <= 2; trial++) {
                    const sequence = Array.from({ length: span }, () => Math.floor(Math.random() * 9) + 1);
                    items.push({
                        id: `dsb_${span}_${trial}`,
                        type: 'digit_span_backward',
                        sequence,
                        span,
                        correctResponse: [...sequence].reverse(),
                        difficulty: span,
                        timePerDigit: 1000
                    });
                }
            }
        } else if (dimension === 'processing_speed') {
            duration = 5;
            instructions = 'Decide if either target symbol appears in the search group on the right. Be as fast as possible!';
            const symbols = ['○', '△', '□', '◇', '★', '♠', '♣', '♥', '♦', '◆'];
            for (let i = 0; i < 20; i++) {
                const targets = [symbols[Math.floor(Math.random() * 5)], symbols[Math.floor(Math.random() * 5) + 5]];
                const hasMatch = Math.random() > 0.5;
                const searchArray = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
                if (hasMatch) searchArray[Math.floor(Math.random() * 5)] = targets[0];
                items.push({
                    id: `ss_${i}`,
                    type: 'symbol_search',
                    targets,
                    searchArray,
                    correctResponse: hasMatch,
                    difficulty: 1
                });
            }
        } else if (dimension === 'executive_function') {
            duration = 12;
            instructions = 'Name the COLOR of the word, not what the word says.';
            const colors = ['Red', 'Blue', 'Green', 'Yellow'];
            for (let i = 0; i < 30; i++) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                const text = colors[Math.floor(Math.random() * colors.length)];
                items.push({
                    id: `st_${i}`,
                    type: 'stroop',
                    text,
                    color,
                    choices: colors,
                    correctResponse: color,
                    difficulty: text === color ? 1 : 3
                });
            }
        } else if (dimension === 'pattern_recognition') {
            duration = 15;
            instructions = 'Find the logic in the grid and select the missing piece.';
            for (let i = 0; i < 15; i++) {
                items.push({
                    id: `mr_${i}`,
                    type: 'matrix_reasoning',
                    matrix_config: { type: 'quantity', difficulty: Math.floor(i / 5) + 1 },
                    correctResponse: Math.floor(Math.random() * 6),
                    difficulty: Math.floor(i / 5) + 1
                });
            }
        } else if (dimension === 'focus_attention') {
            duration = 10;
            instructions = 'Press MATCH if the current number matches the one shown 2 steps ago.';
            for (let i = 0; i < 40; i++) {
                items.push({
                    id: `nb_${i}`,
                    type: 'n_back',
                    n: 2,
                    stimulus: Math.floor(Math.random() * 9) + 1,
                    correctResponse: Math.random() > 0.3,
                    difficulty: 2
                });
            }
        } else {
            // Fillers for other dimensions
            duration = 10;
            instructions = `Assessment for ${dimension.replace('_', ' ')} logic.`;
            for (let i = 0; i < 10; i++) {
                items.push({
                    id: `item_${i}`,
                    type: 'digit_span_forward',
                    sequence: [1, 2, 3],
                    correctResponse: [1, 2, 3],
                    difficulty: 1
                });
            }
        }

        return {
            assessmentId,
            battery: {
                id: `battery_${dimension}_${testType}`,
                dimension,
                testType: testType as any,
                durationMinutes: duration,
                items,
                instructions
            }
        };
    },

    /**
     * Mock assessment results
     */
    getMockAssessmentResults(assessmentId: string): {
        assessment: any;
        results: AssessmentResults;
        profile: MindPrintProfile;
        interventionsAssigned: AssignedIntervention[];
    } {
        // Generate realistic mock percentile (25th-85th for variety)
        const percentile = Math.floor(Math.random() * 60) + 25;
        const standardScore = 100 + ((percentile - 50) * 15 / 50); // Approximate conversion

        const results: AssessmentResults = {
            assessmentId,
            dimension: 'working_memory',
            rawScore: Math.floor(Math.random() * 10) + 5,
            standardScore: Math.round(standardScore),
            percentile,
            confidenceInterval: [Math.max(1, percentile - 7), Math.min(99, percentile + 7)],
            subtestScores: {
                digitSpanForward: Math.floor(Math.random() * 3) + 6,
                digitSpanBackward: Math.floor(Math.random() * 3) + 4
            },
            validityIndicators: {
                effortScore: 0.9,
                responseTimeValidity: 'valid',
                consistencyScore: 0.85,
                overallValid: true
            },
            completedAt: new Date().toISOString()
        };

        const profile: MindPrintProfile = {
            studentId: 'mock-student',
            archetype: {
                id: percentile > 60 ? 'strong_memory' : 'developing_memory',
                name: percentile > 60 ? 'Memory Champion' : 'Developing Learner',
                confidence: 0.7,
                description: percentile > 60
                    ? 'Strong working memory capacity supports complex problem-solving.'
                    : 'Working memory is developing. Practice and strategies can help.'
            },
            dimensions: [{
                dimension: 'working_memory',
                name: 'Working Memory',
                percentile,
                confidenceInterval: [Math.max(1, percentile - 7), Math.min(99, percentile + 7)] as [number, number],
                trend: 'stable',
                lastAssessed: new Date().toISOString(),
                standardScore: Math.round(standardScore)
            }],
            compositeScores: {
                fluidIntelligence: 50,
                cognitiveEfficiency: percentile,
                executiveFunction: 50,
                verbalReasoning: 50
            },
            developmentEdges: percentile < 25 ? ['working_memory'] : [],
            strengths: percentile > 75 ? ['working_memory'] : [],
            updatedAt: new Date().toISOString(),
            calculatedAt: new Date().toISOString()
        };

        return {
            assessment: { id: assessmentId, status: 'completed' },
            results,
            profile,
            interventionsAssigned: []
        };
    },

    /**
     * Helper to normalize profile data from various backend formats
     */
    normalizeProfile(profileData: any): MindPrintProfile {
        return {
            studentId: profileData.studentId || profileData.student_id,
            archetype: {
                id: profileData.archetype?.id || profileData.archetype_id || 'developing_profile',
                name: profileData.archetype?.name || profileData.archetype || 'Developing Profile',
                confidence: profileData.archetype?.confidence || profileData.archetype_confidence || 0.5,
                description: profileData.archetype?.description || profileData.archetype_description || ''
            },
            dimensions: (profileData.dimensions || []).map((d: any) => ({
                dimension: d.dimension || d.dimensionId,
                name: d.name || '',
                percentile: d.percentile || d.currentPercentile || 50,
                confidenceInterval: d.confidenceInterval || d.confidence_interval || [40, 60],
                trend: d.trend || 'stable',
                lastAssessed: d.lastAssessed || d.last_assessed,
                rawScore: d.rawScore || d.raw_score,
                standardScore: d.standardScore || d.standard_score
            })),
            compositeScores: profileData.compositeScores || profileData.composite_scores || {
                fluidIntelligence: 50,
                cognitiveEfficiency: 50,
                executiveFunction: 50,
                verbalReasoning: 50
            },
            developmentEdges: profileData.developmentEdges || profileData.development_edges || [],
            strengths: profileData.strengths || [],
            updatedAt: profileData.updatedAt || profileData.updated_at || new Date().toISOString(),
            calculatedAt: profileData.calculatedAt || profileData.calculated_at || new Date().toISOString()
        };
    },

    /**
     * Get active interventions for a student
     */
    async getInterventions(studentId: string): Promise<AssignedIntervention[]> {
        try {
            const { data } = await apiClient.get(`/interventions/student/${studentId}`);
            return data;
        } catch (error) {
            // Mock data for demo
            console.warn('Backend not available, using mock interventions');
            return [
                {
                    id: 'int_001',
                    studentId,
                    status: 'active',
                    sessionsCompleted: 2,
                    sessionsTarget: 5,
                    assignedDate: new Date(Date.now() - 86400000 * 3).toISOString(),
                    assignedBy: null,
                    protocol: {
                        id: 'wm_chunking_101',
                        name: 'The Chunking Mastery',
                        targetDimension: 'working_memory',
                        priority: 'critical',
                        description: 'Learn to group information into meaningful units to bypass working memory limits.',
                        expectedSessions: 5,
                        evidenceStrength: 'high'
                    }
                },
                {
                    id: 'int_002',
                    studentId,
                    status: 'active',
                    sessionsCompleted: 7,
                    sessionsTarget: 10,
                    assignedDate: new Date(Date.now() - 86400000 * 7).toISOString(),
                    assignedBy: 'system',
                    protocol: {
                        id: 'ef_stop_think',
                        name: 'Stop-Think-Go Protocol',
                        targetDimension: 'executive_function',
                        priority: 'critical',
                        description: 'Metacognitive strategy for impulse control and planning.',
                        expectedSessions: 10,
                        evidenceStrength: 'high'
                    }
                }
            ];
        }
    },

    /**
     * Update intervention progress
     */
    async updateInterventionProgress(interventionId: string, increment: number = 1) {
        try {
            const { data } = await apiClient.post(`/interventions/${interventionId}/progress`, {
                sessionIncrement: increment
            });
            return data;
        } catch (error) {
            return { success: true };
        }
    }
};
