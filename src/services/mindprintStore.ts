/**
 * MindPrint Store — localStorage persistence for assessment results
 * 
 * Stores completed assessment data per-student so the MindPrint profile
 * can be built entirely from real test results (no dummy data).
 */
import type {
    CognitiveDimensionId,
    MindPrintProfile,
    CognitiveDimension
} from '../types/mindprint';

const STORAGE_KEY = 'kk_mindprint_results';

export interface StoredAssessment {
    dimension: CognitiveDimensionId;
    rawScore: number;
    standardScore: number;
    percentile: number;
    confidenceInterval: [number, number];
    subtestScores: Record<string, number>;
    completedAt: string;
    responseCount: number;
    correctCount: number;
    averageRT: number;
    validityIndicators: {
        effortScore: number;
        responseTimeValidity: 'valid' | 'questionable' | 'invalid';
        consistencyScore: number;
        overallValid: boolean;
    };
}

export interface StoredProfile {
    studentId: string;
    assessments: StoredAssessment[];
    lastUpdated: string;
}

/**
 * Get all stored assessments for a student
 */
export function getStoredProfile(studentId: string): StoredProfile | null {
    try {
        const raw = localStorage.getItem(`${STORAGE_KEY}_${studentId}`);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

/**
 * Save an assessment result
 */
export function saveAssessmentResult(studentId: string, result: StoredAssessment): StoredProfile {
    const existing = getStoredProfile(studentId) || {
        studentId,
        assessments: [],
        lastUpdated: new Date().toISOString()
    };

    // Replace existing assessment for same dimension, or add new
    const idx = existing.assessments.findIndex(a => a.dimension === result.dimension);
    if (idx >= 0) {
        existing.assessments[idx] = result;
    } else {
        existing.assessments.push(result);
    }

    existing.lastUpdated = new Date().toISOString();

    localStorage.setItem(`${STORAGE_KEY}_${studentId}`, JSON.stringify(existing));
    return existing;
}

/**
 * Get which dimensions have been assessed
 */
export function getAssessedDimensions(studentId: string): CognitiveDimensionId[] {
    const profile = getStoredProfile(studentId);
    if (!profile) return [];
    return profile.assessments.map(a => a.dimension);
}

/**
 * Get which dimensions are still pending
 */
export function getPendingDimensions(studentId: string): CognitiveDimensionId[] {
    const all: CognitiveDimensionId[] = [
        'working_memory', 'processing_speed', 'executive_function',
        'verbal_reasoning', 'spatial_reasoning', 'pattern_recognition',
        'focus_attention', 'cognitive_endurance'
    ];
    const assessed = getAssessedDimensions(studentId);
    return all.filter(d => !assessed.includes(d));
}

/**
 * Build a MindPrintProfile from stored assessment results
 */
export function buildProfileFromResults(studentId: string): MindPrintProfile | null {
    const stored = getStoredProfile(studentId);
    if (!stored || stored.assessments.length === 0) return null;

    const dimensions: CognitiveDimension[] = stored.assessments.map(a => ({
        dimension: a.dimension,
        name: formatDimensionName(a.dimension),
        percentile: a.percentile,
        confidenceInterval: a.confidenceInterval,
        trend: 'stable' as const,
        lastAssessed: a.completedAt,
        rawScore: a.rawScore,
        standardScore: a.standardScore
    }));

    // Calculate composites from available data
    const getScore = (dim: CognitiveDimensionId) =>
        stored.assessments.find(a => a.dimension === dim)?.percentile;

    const wmScore = getScore('working_memory');
    const psScore = getScore('processing_speed');
    const prScore = getScore('pattern_recognition');
    const srScore = getScore('spatial_reasoning');
    const efScore = getScore('executive_function');
    const vrScore = getScore('verbal_reasoning');

    const avg = (...vals: (number | undefined)[]) => {
        const valid = vals.filter((v): v is number => v !== undefined);
        if (valid.length === 0) return 0;
        return Math.round(valid.reduce((s, v) => s + v, 0) / valid.length);
    };

    const compositeScores = {
        fluidIntelligence: avg(prScore, srScore, wmScore),
        cognitiveEfficiency: avg(psScore, wmScore),
        executiveFunction: avg(efScore, wmScore),
        verbalReasoning: avg(vrScore)
    };

    // Determine archetype from top dimensions
    const archetype = determineArchetype(dimensions);

    // Strengths (>75th) and edges (<25th)
    const strengths = dimensions
        .filter(d => d.percentile >= 75)
        .map(d => d.name);

    const developmentEdges = dimensions
        .filter(d => d.percentile < 25)
        .map(d => d.name);

    return {
        studentId,
        archetype,
        dimensions,
        compositeScores,
        strengths: strengths.length > 0 ? strengths : ['Complete more assessments to identify strengths'],
        developmentEdges: developmentEdges.length > 0 ? developmentEdges : ['Complete more assessments to identify growth areas'],
        updatedAt: stored.lastUpdated,
        calculatedAt: stored.lastUpdated
    };
}

/**
 * Determine archetype from dimension scores
 */
function determineArchetype(dimensions: CognitiveDimension[]) {
    if (dimensions.length < 3) {
        return {
            id: 'emerging',
            name: 'Emerging Profile',
            confidence: Math.min(0.3, dimensions.length * 0.15),
            description: 'Your cognitive profile is still emerging. Complete more assessments to reveal your unique learning architecture.'
        };
    }

    const sorted = [...dimensions].sort((a, b) => b.percentile - a.percentile);
    const topDim = sorted[0];
    const secondDim = sorted[1];

    // Apply archetype rules
    const archetypeMap: Record<string, { name: string; desc: string }> = {
        'pattern_recognition': {
            name: 'Pattern-First Strategist',
            desc: 'Your brain sees system logic before mechanical steps. You thrive on connections and resist rote procedure without understanding "why".'
        },
        'verbal_reasoning': {
            name: 'Verbal Architect',
            desc: 'Language is your primary tool for understanding. You naturally translate complex ideas into words and build comprehension through narrative.'
        },
        'spatial_reasoning': {
            name: 'Spatial Navigator',
            desc: 'You think in images and spatial relationships. Complex concepts become clear when you can visualize their structure and movement.'
        },
        'processing_speed': {
            name: 'Rapid Processor',
            desc: 'Your mind moves quickly through information. You excel at tasks requiring speed but may need to slow down for complex analysis.'
        },
        'working_memory': {
            name: 'Memory Orchestrator',
            desc: 'You can hold and manipulate multiple pieces of information simultaneously, making you effective at complex, multi-step problem solving.'
        },
        'executive_function': {
            name: 'Strategic Planner',
            desc: 'Your strength lies in planning, organizing, and self-regulating. You naturally create systems and structures for learning.'
        },
        'focus_attention': {
            name: 'Deep Focus Specialist',
            desc: 'You excel at sustained concentration. Once locked in, distractions fade and you achieve deep, productive work sessions.'
        },
        'cognitive_endurance': {
            name: 'Endurance Thinker',
            desc: 'Your cognitive stamina allows you to maintain high performance over extended periods of mental effort.'
        }
    };

    const primary = archetypeMap[topDim.dimension] || {
        name: 'Balanced Learner',
        desc: 'Your cognitive profile shows balanced capabilities across multiple dimensions.'
    };

    const confidence = Math.min(0.95,
        0.5 + (topDim.percentile - (secondDim?.percentile || 50)) * 0.01 +
        dimensions.length * 0.05
    );

    return {
        id: topDim.dimension,
        name: primary.name,
        confidence: Math.round(confidence * 100) / 100,
        description: primary.desc
    };
}

function formatDimensionName(dim: CognitiveDimensionId): string {
    const names: Record<CognitiveDimensionId, string> = {
        working_memory: 'Working Memory',
        processing_speed: 'Processing Speed',
        executive_function: 'Executive Function',
        verbal_reasoning: 'Verbal Reasoning',
        spatial_reasoning: 'Spatial Reasoning',
        pattern_recognition: 'Pattern Recognition',
        focus_attention: 'Focus & Attention',
        cognitive_endurance: 'Cognitive Endurance'
    };
    return names[dim] || dim;
}

/**
 * Clear all stored data (for testing)
 */
export function clearStoredProfile(studentId: string): void {
    localStorage.removeItem(`${STORAGE_KEY}_${studentId}`);
}
