/**
 * MindPrint Type Definitions
 * Single source of truth for frontend-backend contract
 */

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
    dimension: CognitiveDimensionId;
    name: string;
    percentile: number;
    confidenceInterval: [number, number];
    trend: 'improving' | 'stable' | 'declining';
    lastAssessed?: string;
    rawScore?: number;
    standardScore?: number;
}

export interface ArchetypeInfo {
    id: string;
    name: string;
    confidence: number;
    description: string;
}

export interface MindPrintProfile {
    studentId: string;
    archetype: ArchetypeInfo;
    dimensions: CognitiveDimension[];
    compositeScores: {
        fluidIntelligence: number;
        cognitiveEfficiency: number;
        executiveFunction: number;
        verbalReasoning: number;
    };
    developmentEdges: string[];
    strengths: string[];
    updatedAt: string;
    calculatedAt: string;
}

export interface AssessmentBattery {
    id: string;
    dimension: CognitiveDimensionId;
    testType: 'screener' | 'standard' | 'diagnostic';
    durationMinutes: number;
    items: TestItem[];
    instructions: string;
}

export interface TestItem {
    id: string;
    type: 'digit_span_forward' | 'digit_span_backward' | 'n_back' | 'matrix_reasoning' | 'symbol_search' | 'stroop';
    sequence?: number[];
    span?: number; // For digit span tests
    stimuli?: any;
    correctResponse?: any;
    difficulty: number;
    timePerDigit?: number;
    interTrialInterval?: number;
    targets?: string[];      // For symbol search
    searchArray?: string[];  // For symbol search
    matrix_config?: any;     // For matrix reasoning
    n?: number;             // For n-back
    stimulus?: any;         // For n-back/cpt
    text?: string;          // For stroop
    color?: string;         // For stroop
    choices?: string[];     // For variants with multiple choice
}

export interface AssessmentResults {
    assessmentId: string;
    dimension: CognitiveDimensionId;
    rawScore: number;
    standardScore: number;
    percentile: number;
    confidenceInterval: [number, number];
    subtestScores: Record<string, number>;
    validityIndicators: {
        effortScore: number;
        responseTimeValidity: 'valid' | 'questionable' | 'invalid';
        consistencyScore: number;
        overallValid: boolean;
    };
    completedAt: string;
}

export interface InterventionProtocol {
    id: string;
    name: string;
    targetDimension: CognitiveDimensionId;
    priority: 'critical' | 'recommended' | 'enrichment';
    description: string;
    expectedSessions: number;
    evidenceStrength: 'high' | 'moderate' | 'emerging';
}

export interface AssignedIntervention {
    id: string;
    studentId: string;
    protocol: InterventionProtocol;
    status: 'active' | 'completed' | 'paused';
    sessionsCompleted: number;
    sessionsTarget: number;
    assignedDate: string;
    assignedBy: string | null; // null = system-assigned
}

// Helper type guards
export function isCognitiveDimension(value: string): value is CognitiveDimensionId {
    return [
        'working_memory',
        'processing_speed',
        'executive_function',
        'verbal_reasoning',
        'spatial_reasoning',
        'pattern_recognition',
        'focus_attention',
        'cognitive_endurance'
    ].includes(value);
}

// Formatters
export function formatDimensionName(dimension: CognitiveDimensionId | string): string {
    const labels: Record<CognitiveDimensionId, string> = {
        working_memory: 'Working Memory',
        processing_speed: 'Processing Speed',
        executive_function: 'Executive Function',
        verbal_reasoning: 'Verbal Reasoning',
        spatial_reasoning: 'Spatial Reasoning',
        pattern_recognition: 'Pattern Recognition',
        focus_attention: 'Focus & Attention',
        cognitive_endurance: 'Cognitive Endurance'
    };

    return labels[dimension as CognitiveDimensionId] ||
        dimension.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function getDimensionDescription(dimension: CognitiveDimensionId): string {
    const descriptions: Record<CognitiveDimensionId, string> = {
        working_memory: 'your ability to hold and manipulate information in your mind',
        processing_speed: 'how quickly you process visual information and make decisions',
        executive_function: 'your planning, organization, and self-regulation abilities',
        verbal_reasoning: 'your ability to understand and work with language and concepts',
        spatial_reasoning: 'your ability to visualize and manipulate objects in space',
        pattern_recognition: 'your ability to identify patterns and solve novel problems',
        focus_attention: 'your ability to maintain focus and resist distractions',
        cognitive_endurance: 'your ability to sustain mental effort over extended periods'
    };

    return descriptions[dimension];
}

export function getTestDuration(dimension: CognitiveDimensionId): number {
    const durations: Record<CognitiveDimensionId, number> = {
        working_memory: 8,
        processing_speed: 10,
        executive_function: 12,
        verbal_reasoning: 15,
        spatial_reasoning: 12,
        pattern_recognition: 15,
        focus_attention: 10,
        cognitive_endurance: 20
    };

    return durations[dimension];
}
