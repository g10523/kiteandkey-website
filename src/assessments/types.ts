export type CognitiveDimensionId =
    | 'working_memory'
    | 'processing_speed'
    | 'executive_function'
    | 'verbal_reasoning'
    | 'spatial_reasoning'
    | 'pattern_recognition'
    | 'focus_attention'
    | 'cognitive_endurance';

export interface CognitiveDimension {
    id: CognitiveDimensionId;
    name: string;
    description: string;
    definition: string;
    realWorldExamples: string[];
    neurologicalBasis: string;
    academicImpact: string[];
}

export type AssessmentLevel = 'screener' | 'standard' | 'diagnostic';

export interface AssessmentTest {
    id: string;
    dimensionId: CognitiveDimensionId;
    name: string;
    level: AssessmentLevel;
    durationMinutes: number;
    reliability: number; // Cronbach's alpha
    validityEvidence: string[];
    materials: string[];
    instructions: string[];
    scoringRubric: {
        rawScoreRange: [number, number];
        interpretation: string;
    };
    subtests?: {
        name: string;
        maxScore: number;
        whatItMeasures: string;
    }[];
}

export interface StudentAssessment {
    id: string;
    studentId: string;
    administeredBy: string; // tutorId
    testId: string;
    dimensionId: CognitiveDimensionId;
    rawScores: {
        total: number;
        subtests?: Record<string, number>;
    };
    behavioralObservations: string;
    environmentalFactors: {
        timeOfDay: string;
        sessionNumber: number;
        studentReportedState: string;
    };
    calculatedResults: {
        percentile: number;
        standardScore: number; // IQ-style, mean 100, SD 15
        confidence: number;
        ageEquivalent?: number;
        gradeEquivalent?: number;
    };
    recommendations: string[];
    nextAssessmentDue: string; // ISO Date
    createdAt: string; // ISO Date
    updatedAt: string; // ISO Date
}

export interface MindPrintProfile {
    studentId: string;
    lastUpdated: string; // ISO Date
    dimensions: {
        dimensionId: CognitiveDimensionId;
        currentPercentile: number;
        historicalScores: {
            date: string; // ISO Date
            percentile: number;
            testId: string;
        }[];
        trend: 'improving' | 'stable' | 'declining';
        confidence: number;
    }[];
    compositeScores: {
        fluidIntelligence: number; // Pattern + Fluid + Spatial
        crystallizedIntelligence: number; // Verbal + Knowledge
        cognitiveEfficiency: number; // Speed + Working Memory
        executiveFunction: number; // EF + Attention + Endurance
    };
    riskFactors: string[];
    strengths: string[];
    developmentTargets: string[];
}

export interface NormTable {
    dimensionId: CognitiveDimensionId;
    age: number; // 8 to 18
    mean: number;
    sd: number;
}
