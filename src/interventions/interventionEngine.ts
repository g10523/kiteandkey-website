import type { MindPrintProfile, StudentAssessment, CognitiveDimensionId } from '../assessments/types';
import { WORKING_MEMORY_INTERVENTIONS } from './cognitiveInterventions';
import type { Intervention } from './cognitiveInterventions';

export interface SessionLog {
    id: string;
    interventionId: string;
    studentId: string;
    tutorId: string;
    scheduledDate: Date;
    actualDate: Date;
    durationMinutes: number;

    fidelity: {
        protocolStepsCompleted: string[]; // Which steps from intervention.implementation.sessionStructure
        materialsUsed: string[];
        scriptAdherence: 'full' | 'partial' | 'adapted' | 'none';
        adaptationsMade: string; // Tutor notes if deviated
    };

    studentResponse: {
        engagementLevel: number; // 1-5
        difficultyRating: number; // 1-5, Student self-report
        strategyUse: 'independent' | 'prompted' | 'modeled' | 'resisted';
        breakthroughMoments: string[];
        frustrationPoints: string[];
    };

    outcomes: {
        objectiveMet: boolean;
        evidence: string; // Specific behavior/response observed
        nextSessionAdjustment: string;
    };

    flags: {
        requiresSupervision: boolean;
        reassessmentRecommended: boolean;
        protocolChangeNeeded: boolean;
    };
}

export interface StudentReflection {
    mentalLoad: number;
    strategyUse: string;
    confidenceShift: number;
    timestamp: Date;
}

export interface AssignedIntervention extends Intervention {
    assignedDate: Date;
    targetStudentId: string;
    status: 'active' | 'completed' | 'paused';
    progressLog: {
        date: Date;
        metrics: Record<string, number | string>;
        notes: string;
    }[];
    sessionLogs: SessionLog[];
    nextReviewDate: Date;
}

export interface SessionPlan {
    opening: string[];
    main: string[];
    closing: string[];
    materials: string[];
    tutorScript: string;
    watchFors: string[];
    adaptations: string[];
}

const ALL_INTERVENTIONS = [...WORKING_MEMORY_INTERVENTIONS];

function getInterventionsForDimension(dimensionId: CognitiveDimensionId): Intervention[] {
    return ALL_INTERVENTIONS.filter(i => i.targetDimension === dimensionId);
}

// function getInterventionById removed as unused

function priorityWeight(priority: 'critical' | 'recommended' | 'enhancement'): number {
    switch (priority) {
        case 'critical': return 1;
        case 'recommended': return 2;
        case 'enhancement': return 3;
        default: return 4;
    }
}

function addWeeks(date: Date, weeks: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + weeks * 7);
    return newDate;
}

export function assignInterventions(
    profile: MindPrintProfile,
    _recentAssessments: StudentAssessment[]
): AssignedIntervention[] {
    const assignments: AssignedIntervention[] = [];

    profile.dimensions.forEach(dim => {
        const interventions = getInterventionsForDimension(dim.dimensionId);
        const applicable = interventions.filter(i =>
            dim.currentPercentile >= i.targetPercentileRange[0] &&
            dim.currentPercentile <= i.targetPercentileRange[1]
        );

        // Sort by priority and select top 2
        const selected = applicable
            .sort((a, b) => priorityWeight(a.priority) - priorityWeight(b.priority))
            .slice(0, 2);

        selected.forEach(intervention => {
            assignments.push({
                ...intervention,
                assignedDate: new Date(),
                targetStudentId: profile.studentId,
                status: 'active',
                progressLog: [],
                sessionLogs: [],
                nextReviewDate: addWeeks(new Date(), 2)
            });
        });
    });

    return assignments;
}

// Mock function for lesson analysis - in a real app this would query lesson metadata
function analyzeLessonDemands(topic: string): { requiredDimensions: CognitiveDimensionId[] } {
    // Simple heuristic mapping
    const demands: CognitiveDimensionId[] = [];
    const lowerTopic = topic.toLowerCase();

    if (lowerTopic.includes('math') || lowerTopic.includes('algebra')) {
        demands.push('working_memory', 'pattern_recognition');
    }
    if (lowerTopic.includes('reading') || lowerTopic.includes('english')) {
        demands.push('verbal_reasoning', 'working_memory');
    }
    if (lowerTopic.includes('science') || lowerTopic.includes('geometry')) {
        demands.push('spatial_reasoning', 'processing_speed');
    }

    // Default fallback
    if (demands.length === 0) {
        demands.push('working_memory', 'focus_attention');
    }

    return { requiredDimensions: demands };
}

function generateAdaptations(
    lessonProfile: { requiredDimensions: CognitiveDimensionId[] },
    interventions: AssignedIntervention[]
): string[] {
    const adaptations: string[] = [];

    lessonProfile.requiredDimensions.forEach(dim => {
        const activeInterventions = interventions.filter(i => i.targetDimension === dim && i.status === 'active');
        activeInterventions.forEach(i => {
            adaptations.push(`Apply ${i.title}: ${i.implementation.sessionStructure[2]}`);
        });
    });

    return adaptations;
}

export function generateSessionPlan(
    _studentId: string,
    lessonTopic: string,
    interventions: AssignedIntervention[]
): SessionPlan {
    // Query: What cognitive demands does this lesson have?
    const lessonProfile = analyzeLessonDemands(lessonTopic);

    // Match: Which interventions support these demands?
    // We match if the intervention targets a dimension required by the lesson
    const relevantInterventions = interventions.filter(i =>
        lessonProfile.requiredDimensions.includes(i.targetDimension)
    );

    // If no direct match, include high priority generic interventions
    if (relevantInterventions.length === 0) {
        const critical = interventions.filter(i => i.priority === 'critical').slice(0, 1);
        relevantInterventions.push(...critical);
    }

    return {
        opening: relevantInterventions.map(i => i.implementation.sessionStructure[0]),
        main: relevantInterventions.flatMap(i => i.implementation.sessionStructure.slice(1, -1)),
        closing: relevantInterventions.map(i => i.implementation.sessionStructure[i.implementation.sessionStructure.length - 1]),
        materials: [...new Set(relevantInterventions.flatMap(i => i.implementation.materialsNeeded))],
        tutorScript: relevantInterventions.map(i => i.implementation.tutorScript).join(" Also, remember: "),
        watchFors: [...new Set(relevantInterventions.flatMap(i => i.implementation.warningSigns))],
        adaptations: generateAdaptations(lessonProfile, interventions)
    };
}
