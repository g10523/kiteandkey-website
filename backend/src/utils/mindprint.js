/**
 * MindPrint Calculation Utilities
 */

// Mock norm tables (in production, these would be real psychometric data)
const NORM_TABLES = {
    working_memory: [
        { rawScore: 0, percentile: 1 },
        { rawScore: 3, percentile: 5 },
        { rawScore: 5, percentile: 16 },
        { rawScore: 7, percentile: 34 },
        { rawScore: 9, percentile: 50 },
        { rawScore: 11, percentile: 66 },
        { rawScore: 13, percentile: 84 },
        { rawScore: 15, percentile: 95 },
        { rawScore: 18, percentile: 99 }
    ],
    processing_speed: [
        { rawScore: 0, percentile: 1 },
        { rawScore: 20, percentile: 5 },
        { rawScore: 35, percentile: 16 },
        { rawScore: 50, percentile: 34 },
        { rawScore: 60, percentile: 50 },
        { rawScore: 70, percentile: 66 },
        { rawScore: 80, percentile: 84 },
        { rawScore: 90, percentile: 95 },
        { rawScore: 100, percentile: 99 }
    ]
    // Add more dimensions as needed
};

/**
 * Calculate percentile from raw score
 */
function calculatePercentile(dimension, rawScore, options = {}) {
    const { age = 15, testType = 'standard' } = options;

    const normTable = NORM_TABLES[dimension];
    if (!normTable) {
        // Fallback for dimensions without norm tables
        return {
            percentile: 50,
            standardScore: 100,
            confidence: 0.68
        };
    }

    // Find percentile through interpolation
    let percentile = 50;
    for (let i = 0; i < normTable.length - 1; i++) {
        const curr = normTable[i];
        const next = normTable[i + 1];

        if (rawScore >= curr.rawScore && rawScore <= next.rawScore) {
            // Linear interpolation
            const ratio = (rawScore - curr.rawScore) / (next.rawScore - curr.rawScore);
            percentile = curr.percentile + ratio * (next.percentile - curr.percentile);
            break;
        }
    }

    // Convert percentile to standard score (mean=100, SD=15)
    const standardScore = percentileToStandardScore(percentile);

    // Calculate confidence interval based on test type
    const confidence = testType === 'diagnostic' ? 0.95 : 0.68;

    return {
        percentile: Math.round(percentile),
        standardScore: Math.round(standardScore),
        confidence,
        rawScore
    };
}

/**
 * Convert percentile to standard score
 */
function percentileToStandardScore(percentile) {
    // Approximate conversion using z-score
    // This is simplified; real conversion uses inverse normal distribution
    const zScore = approximateZScore(percentile);
    return 100 + (zScore * 15);
}

function approximateZScore(percentile) {
    if (percentile <= 1) return -2.33;
    if (percentile <= 5) return -1.65;
    if (percentile <= 16) return -1.0;
    if (percentile <= 34) return -0.43;
    if (percentile <= 50) return 0;
    if (percentile <= 66) return 0.43;
    if (percentile <= 84) return 1.0;
    if (percentile <= 95) return 1.65;
    return 2.33;
}

/**
 * Determine cognitive archetype from dimension scores
 */
function determineArchetype(dimensionScores) {
    // Simplified archetype determination
    // In production, this would use more sophisticated clustering

    const scores = dimensionScores.map(d => ({
        dimension: d.dimension,
        percentile: d.percentile
    }));

    const wmScore = scores.find(s => s.dimension === 'working_memory')?.percentile || 50;
    const psScore = scores.find(s => s.dimension === 'processing_speed')?.percentile || 50;
    const vrScore = scores.find(s => s.dimension === 'verbal_reasoning')?.percentile || 50;

    // Pattern-First Strategist: High WM, lower PS
    if (wmScore > 65 && psScore < 50) {
        return {
            name: 'Pattern-First Strategist',
            description: 'Excels at holding complex information and finding connections, but may need extra time to process. Thrives on deep understanding over speed.'
        };
    }

    // Rapid Processor: High PS, average WM
    if (psScore > 75 && wmScore >= 40 && wmScore <= 60) {
        return {
            name: 'Rapid Processor',
            description: 'Lightning-fast cognitive processing with solid working memory. Excels in time-pressured environments.'
        };
    }

    // Verbal Synthesizer: High VR
    if (vrScore > 75) {
        return {
            name: 'Verbal Synthesizer',
            description: 'Strong language and reasoning abilities. Learns best through discussion and explanation.'
        };
    }

    // Balanced Learner: All dimensions relatively even
    const variance = calculateVariance(scores.map(s => s.percentile));
    if (variance < 200) {
        return {
            name: 'Balanced Learner',
            description: 'Well-rounded cognitive profile with consistent performance across dimensions.'
        };
    }

    // Default
    return {
        name: 'Developing Profile',
        description: 'Cognitive profile still emerging. More assessments will provide clearer patterns.'
    };
}

function calculateVariance(numbers) {
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const squaredDiffs = numbers.map(n => Math.pow(n - mean, 2));
    return squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length;
}

module.exports = {
    calculatePercentile,
    determineArchetype,
    percentileToStandardScore
};
