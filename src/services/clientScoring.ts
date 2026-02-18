/**
 * Client-Side Scoring Engine
 * 
 * Scores completed assessment responses locally so the MindPrint profile
 * can work without a running backend.
 * 
 * Based on the battery modules in api/src/assessments/
 */
import type { CognitiveDimensionId } from '../types/mindprint';
import type { StoredAssessment } from './mindprintStore';

interface TrialResponse {
    itemId: string;
    type: string;
    response: any;
    correct: boolean;
    responseTime: number;
    span?: number;
    difficulty?: number;
}

/**
 * Age-based norm tables (approximated from WISC-V / clinical norms)
 * Maps raw scores to standard scores based on age bracket
 */
const NORM_TABLES: Record<string, Record<string, number[]>> = {
    working_memory: {
        // [percentile at raw=0, ..., raw=max]
        '10-12': [1, 5, 10, 16, 25, 37, 50, 63, 75, 84, 91, 95, 99],
        '13-15': [1, 3, 8, 12, 20, 30, 42, 55, 68, 79, 88, 93, 97],
        '16-18': [1, 2, 5, 10, 16, 25, 37, 50, 63, 75, 84, 91, 95],
        'default': [1, 5, 10, 16, 25, 37, 50, 63, 75, 84, 91, 95, 99]
    },
    processing_speed: {
        'default': [1, 3, 8, 16, 25, 37, 50, 63, 75, 84, 91, 95, 99]
    },
    pattern_recognition: {
        'default': [1, 5, 10, 16, 25, 37, 50, 63, 75, 84, 91, 95, 99]
    },
    executive_function: {
        'default': [1, 5, 12, 20, 30, 42, 55, 68, 79, 88, 93, 97, 99]
    },
    verbal_reasoning: {
        'default': [1, 3, 8, 16, 25, 37, 50, 63, 75, 84, 91, 95, 99]
    },
    spatial_reasoning: {
        'default': [1, 5, 10, 16, 25, 37, 50, 63, 75, 84, 91, 95, 99]
    },
    focus_attention: {
        'default': [1, 5, 10, 16, 25, 37, 50, 63, 75, 84, 91, 95, 99]
    },
    cognitive_endurance: {
        'default': [1, 5, 12, 20, 30, 42, 55, 68, 79, 88, 93, 97, 99]
    }
};

/**
 * Score a completed assessment from trial responses
 */
export function scoreAssessment(
    dimension: CognitiveDimensionId,
    responses: TrialResponse[],
    ageYears: number = 15
): StoredAssessment {
    const scorer = SCORERS[dimension] || scoreGeneric;
    return scorer(dimension, responses, ageYears);
}

/**
 * Dimension-specific scorers
 */
const SCORERS: Record<string, (dim: CognitiveDimensionId, responses: TrialResponse[], age: number) => StoredAssessment> = {
    working_memory: scoreWorkingMemory,
    processing_speed: scoreProcessingSpeed,
    executive_function: scoreExecutiveFunction,
    pattern_recognition: scorePatternRecognition,
    verbal_reasoning: scoreGeneric,
    spatial_reasoning: scoreGeneric,
    focus_attention: scoreFocusAttention,
    cognitive_endurance: scoreCognitiveEndurance
};

/**
 * Working Memory — scored by longest span achieved (forward + backward)
 */
function scoreWorkingMemory(dim: CognitiveDimensionId, responses: TrialResponse[], age: number): StoredAssessment {
    const forward = responses.filter(r => r.type === 'digit_span_forward');
    const backward = responses.filter(r => r.type === 'digit_span_backward');

    const forwardSpan = longestSpan(forward);
    const backwardSpan = longestSpan(backward);

    // Composite raw score = forward + backward spans
    const rawScore = forwardSpan + backwardSpan;

    // Clamp to norm table range
    const percentile = rawToPercentile(dim, rawScore, age);
    const standardScore = percentileToStandard(percentile);

    return buildResult(dim, rawScore, percentile, standardScore, responses, {
        digitSpanForward: forwardSpan,
        digitSpanBackward: backwardSpan
    });
}

/**
 * Processing Speed — scored by accuracy × speed
 */
function scoreProcessingSpeed(dim: CognitiveDimensionId, responses: TrialResponse[], age: number): StoredAssessment {
    const correct = responses.filter(r => r.correct).length;
    const total = responses.length;
    const accuracy = total > 0 ? correct / total : 0;
    const avgRT = responses.reduce((s, r) => s + r.responseTime, 0) / (total || 1);

    // Composite: accuracy adjusted by speed (faster = better)
    // Normalize RT to 0-1 scale where 1 = fast (< 500ms), 0 = slow (> 3000ms)
    const speedFactor = Math.max(0, Math.min(1, (3000 - avgRT) / 2500));
    const rawScore = Math.round((accuracy * 0.7 + speedFactor * 0.3) * 12);

    const percentile = rawToPercentile(dim, rawScore, age);
    const standardScore = percentileToStandard(percentile);

    return buildResult(dim, rawScore, percentile, standardScore, responses, {
        accuracy: Math.round(accuracy * 100),
        avgResponseTime: Math.round(avgRT),
        itemsCompleted: total
    });
}

/**
 * Executive Function (Stroop) — scored by interference effect
 */
function scoreExecutiveFunction(dim: CognitiveDimensionId, responses: TrialResponse[], age: number): StoredAssessment {
    const correct = responses.filter(r => r.correct).length;
    const total = responses.length;
    const accuracy = total > 0 ? correct / total : 0;

    // Separate congruent (easy) from incongruent (hard)
    const congruent = responses.filter(r => (r.difficulty || 0) <= 1);
    const incongruent = responses.filter(r => (r.difficulty || 0) > 1);

    const congruentRT = congruent.reduce((s, r) => s + r.responseTime, 0) / (congruent.length || 1);
    const incongruentRT = incongruent.reduce((s, r) => s + r.responseTime, 0) / (incongruent.length || 1);

    // Stroop effect (smaller = better executive control)
    const stroopEffect = incongruentRT - congruentRT;
    const stroopScore = Math.max(0, Math.min(1, (500 - stroopEffect) / 500));

    const rawScore = Math.round((accuracy * 0.5 + stroopScore * 0.5) * 12);
    const percentile = rawToPercentile(dim, rawScore, age);
    const standardScore = percentileToStandard(percentile);

    return buildResult(dim, rawScore, percentile, standardScore, responses, {
        accuracy: Math.round(accuracy * 100),
        stroopEffect: Math.round(stroopEffect),
        congruentRT: Math.round(congruentRT),
        incongruentRT: Math.round(incongruentRT)
    });
}

/**
 * Pattern Recognition (Matrix Reasoning) — scored by accuracy at difficulty levels
 */
function scorePatternRecognition(dim: CognitiveDimensionId, responses: TrialResponse[], age: number): StoredAssessment {
    const correct = responses.filter(r => r.correct).length;
    const total = responses.length;

    // Weight harder items more
    let weightedScore = 0;
    responses.forEach(r => {
        if (r.correct) {
            weightedScore += (r.difficulty || 1);
        }
    });

    const maxWeightedScore = responses.reduce((s, r) => s + (r.difficulty || 1), 0);
    const normalizedRaw = maxWeightedScore > 0 ? Math.round((weightedScore / maxWeightedScore) * 12) : 0;

    const percentile = rawToPercentile(dim, normalizedRaw, age);
    const standardScore = percentileToStandard(percentile);

    return buildResult(dim, normalizedRaw, percentile, standardScore, responses, {
        correct,
        total,
        highestDifficultyPassed: Math.max(...responses.filter(r => r.correct).map(r => r.difficulty || 0), 0)
    });
}

/**
 * Focus & Attention (N-Back / CPT) — scored by hits, misses, false alarms
 */
function scoreFocusAttention(dim: CognitiveDimensionId, responses: TrialResponse[], age: number): StoredAssessment {
    const correct = responses.filter(r => r.correct).length;
    const total = responses.length;
    const accuracy = total > 0 ? correct / total : 0;

    // d' (d-prime) approximation from hit rate and false alarm rate
    const hits = responses.filter(r => r.correct).length;
    const misses = responses.filter(r => !r.correct).length;
    const hitRate = Math.min(0.99, Math.max(0.01, hits / (total || 1)));
    const faRate = Math.min(0.99, Math.max(0.01, misses / (total || 1)));

    const rawScore = Math.round(accuracy * 12);
    const percentile = rawToPercentile(dim, rawScore, age);
    const standardScore = percentileToStandard(percentile);

    return buildResult(dim, rawScore, percentile, standardScore, responses, {
        hits,
        misses,
        hitRate: Math.round(hitRate * 100),
        falseAlarmRate: Math.round(faRate * 100)
    });
}

/**
 * Cognitive Endurance — scored by accuracy decay over time
 */
function scoreCognitiveEndurance(dim: CognitiveDimensionId, responses: TrialResponse[], age: number): StoredAssessment {
    const total = responses.length;
    const correct = responses.filter(r => r.correct).length;

    // Split into quarters and check accuracy decay
    const quarterSize = Math.ceil(total / 4);
    const quarters = [0, 1, 2, 3].map(q => {
        const slice = responses.slice(q * quarterSize, (q + 1) * quarterSize);
        const qCorrect = slice.filter(r => r.correct).length;
        return slice.length > 0 ? qCorrect / slice.length : 0;
    });

    // Endurance = how well accuracy is maintained (less decay = better)
    const decay = Math.max(0, quarters[0] - quarters[3]); // 0 = no decay, 1 = full decay
    const enduranceFactor = 1 - decay;

    const overallAccuracy = total > 0 ? correct / total : 0;
    const rawScore = Math.round((overallAccuracy * 0.6 + enduranceFactor * 0.4) * 12);

    const percentile = rawToPercentile(dim, rawScore, age);
    const standardScore = percentileToStandard(percentile);

    return buildResult(dim, rawScore, percentile, standardScore, responses, {
        accuracy: Math.round(overallAccuracy * 100),
        q1Accuracy: Math.round(quarters[0] * 100),
        q4Accuracy: Math.round(quarters[3] * 100),
        decayPercent: Math.round(decay * 100),
        enduranceFactor: Math.round(enduranceFactor * 100)
    });
}

/**
 * Generic scorer for dimensions without specific logic
 */
function scoreGeneric(dim: CognitiveDimensionId, responses: TrialResponse[], age: number): StoredAssessment {
    const correct = responses.filter(r => r.correct).length;
    const total = responses.length;
    const accuracy = total > 0 ? correct / total : 0;

    const rawScore = Math.round(accuracy * 12);
    const percentile = rawToPercentile(dim, rawScore, age);
    const standardScore = percentileToStandard(percentile);

    return buildResult(dim, rawScore, percentile, standardScore, responses, {
        correct,
        total,
        accuracy: Math.round(accuracy * 100)
    });
}

// ── Helpers ──

function longestSpan(spanResponses: TrialResponse[]): number {
    // Group by span length
    const spanGroups = new Map<number, TrialResponse[]>();
    spanResponses.forEach(r => {
        const span = r.span || 0;
        if (!spanGroups.has(span)) spanGroups.set(span, []);
        spanGroups.get(span)!.push(r);
    });

    let longest = 0;

    // Standard rule: need 2/2 correct at a span to count it
    spanGroups.forEach((trials, span) => {
        const correctCount = trials.filter(t => t.correct).length;
        if (correctCount >= 2 && span > longest) longest = span;
    });

    // Fallback: any correct at a span level
    if (longest === 0) {
        spanGroups.forEach((trials, span) => {
            if (trials.some(t => t.correct) && span > longest) longest = span;
        });
    }

    return longest;
}

function rawToPercentile(dim: CognitiveDimensionId, rawScore: number, age: number): number {
    const ageKey = age <= 12 ? '10-12' : age <= 15 ? '13-15' : '16-18';
    const table = NORM_TABLES[dim]?.[ageKey] || NORM_TABLES[dim]?.['default'] || NORM_TABLES.working_memory.default;

    const clampedRaw = Math.max(0, Math.min(rawScore, table.length - 1));
    return table[clampedRaw];
}

function percentileToStandard(percentile: number): number {
    // Standard score with mean=100, SD=15 (Wechsler scale)
    // Approximate from percentile using inverse normal
    const z = percentileToZ(percentile);
    return Math.round(100 + z * 15);
}

function percentileToZ(p: number): number {
    // Rational approximation of inverse normal CDF
    const clampedP = Math.max(0.001, Math.min(0.999, p / 100));
    if (clampedP === 0.5) return 0;

    const a = clampedP < 0.5 ? clampedP : 1 - clampedP;
    const t = Math.sqrt(-2 * Math.log(a));
    const z = t - (2.515517 + 0.802853 * t + 0.010328 * t * t) /
        (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t * t * t);

    return clampedP < 0.5 ? -z : z;
}

function buildResult(
    dimension: CognitiveDimensionId,
    rawScore: number,
    percentile: number,
    standardScore: number,
    responses: TrialResponse[],
    subtestScores: Record<string, number>
): StoredAssessment {
    const total = responses.length;
    const correct = responses.filter(r => r.correct).length;
    const avgRT = total > 0 ? responses.reduce((s, r) => s + r.responseTime, 0) / total : 0;

    // Validity checks
    const tooFastCount = responses.filter(r => r.responseTime < 200).length;
    const tooSlowCount = responses.filter(r => r.responseTime > 30000).length;
    const invalidRTRatio = (tooFastCount + tooSlowCount) / (total || 1);

    const effortScore = total > 0 ? Math.max(0, 1 - (tooFastCount / total)) : 0;

    // Consistency: check if accuracy is stable across quarters
    const quarterSize = Math.ceil(total / 4);
    const quarterAccuracies = [0, 1, 2, 3].map(q => {
        const slice = responses.slice(q * quarterSize, (q + 1) * quarterSize);
        const qCorrect = slice.filter(r => r.correct).length;
        return slice.length > 0 ? qCorrect / slice.length : 0;
    });
    const variance = quarterAccuracies.reduce((s, v) => s + Math.pow(v - (correct / (total || 1)), 2), 0) / 4;
    const consistencyScore = Math.max(0, 1 - Math.sqrt(variance) * 2);

    // Confidence interval (~95%)
    const se = Math.max(3, Math.round(7 - (total / 10))); // More items = tighter CI
    const ci: [number, number] = [
        Math.max(1, percentile - se),
        Math.min(99, percentile + se)
    ];

    return {
        dimension,
        rawScore,
        standardScore,
        percentile,
        confidenceInterval: ci,
        subtestScores,
        completedAt: new Date().toISOString(),
        responseCount: total,
        correctCount: correct,
        averageRT: Math.round(avgRT),
        validityIndicators: {
            effortScore: Math.round(effortScore * 100) / 100,
            responseTimeValidity: invalidRTRatio > 0.3 ? 'invalid' : invalidRTRatio > 0.1 ? 'questionable' : 'valid',
            consistencyScore: Math.round(consistencyScore * 100) / 100,
            overallValid: effortScore >= 0.5 && invalidRTRatio <= 0.3
        }
    };
}
