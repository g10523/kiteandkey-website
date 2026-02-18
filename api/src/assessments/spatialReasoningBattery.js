/**
 * SPATIAL REASONING BATTERY
 * Measures: Mental rotation, spatial visualization, 3D reasoning
 * Duration: ~10 minutes
 */

const { v4: uuidv4 } = require('uuid');

const blockDesign = {
    name: 'Block Design',
    generateItems(difficulty = 'standard') {
        const counts = { screener: 8, standard: 15, diagnostic: 20 };
        const items = [];
        for (let i = 0; i < (counts[difficulty] || 15); i++) {
            items.push({
                id: `bd_${i + 1}`,
                type: 'block_design',
                pattern_complexity: Math.min(5, Math.floor(i / 3) + 1),
                num_blocks: i < 5 ? 4 : 9,
                timeLimit: i < 5 ? 60000 : 120000,
                correctResponse: `pattern_${i + 1}`, // SVG pattern data
                difficulty: Math.floor(i / 3) + 1
            });
        }
        return items;
    },
    checkCorrect(item, response) {
        return item.correctResponse === response;
    }
};

const visualPuzzles = {
    name: 'Visual Puzzles',
    generateItems(difficulty = 'standard') {
        const counts = { screener: 10, standard: 20, diagnostic: 30 };
        const items = [];
        for (let i = 0; i < (counts[difficulty] || 20); i++) {
            items.push({
                id: `vp_${i + 1}`,
                type: 'visual_puzzles',
                target_shape: 'complex_polygon',
                num_pieces: 3,
                answer_choices: 6,
                correctResponse: Math.floor(Math.random() * 6),
                timeLimit: 45000,
                difficulty: Math.min(5, Math.floor(i / 4) + 1)
            });
        }
        return items;
    },
    checkCorrect(item, responseIndex) {
        return item.correctResponse === responseIndex;
    }
};

const NORMS = {
    120: { 4: 1, 8: 5, 12: 16, 16: 37, 20: 63, 24: 84, 28: 95, 32: 99 },
    144: { 6: 1, 10: 5, 14: 16, 18: 37, 22: 63, 26: 84, 30: 95, 34: 99 },
    168: { 8: 1, 12: 5, 16: 16, 20: 37, 24: 63, 28: 84, 32: 95, 36: 99 }
};

function calculatePercentile(ageMonths, rawScore) {
    const closestAge = [120, 144, 168].reduce((prev, curr) =>
        Math.abs(curr - ageMonths) < Math.abs(prev - ageMonths) ? curr : prev
    );
    const table = NORMS[closestAge];
    const scores = Object.keys(table).map(Number).sort((a, b) => a - b);

    if (rawScore <= scores[0]) return table[scores[0]];
    if (rawScore >= scores[scores.length - 1]) return table[scores[scores.length - 1]];

    for (let i = 0; i < scores.length - 1; i++) {
        if (rawScore >= scores[i] && rawScore <= scores[i + 1]) {
            const ratio = (rawScore - scores[i]) / (scores[i + 1] - scores[i]);
            return Math.round(table[scores[i]] + ratio * (table[scores[i + 1]] - table[scores[i]]));
        }
    }
    return 50;
}

function generateBattery(testType = 'standard') {
    return {
        id: `sr_battery_${uuidv4()}`,
        dimension: 'spatial_reasoning',
        version: '1.0',
        test_type: testType,
        created_at: new Date().toISOString(),
        duration_minutes: 10,
        items: [...blockDesign.generateItems(testType), ...visualPuzzles.generateItems(testType)],
        instructions: {
            overview: 'This assessment measures your ability to visualize and manipulate objects in space.',
            blockDesign: 'Recreate the pattern using the blocks provided. Work as quickly as you can.',
            visualPuzzles: 'Determine which 3 pieces can be combined to create the target shape.'
        },
        scoring: { method: 'total_correct', time_bonus: true }
    };
}

function calculateScore(ageMonths, correctCount) {
    const percentile = calculatePercentile(ageMonths, correctCount);
    const standardScore = Math.round(100 + ((percentile - 50) / 50 * 2) * 15);
    return {
        rawScore: correctCount,
        standardScore,
        percentile,
        confidenceInterval: [Math.max(55, standardScore - 8), Math.min(145, standardScore + 8)],
        compositeScore: standardScore,
        interpretation: percentile >= 75 ? 'Strong spatial skills' : percentile >= 25 ? 'Average spatial skills' : 'Developing spatial skills',
        subtestScores: { blockDesign: Math.round(correctCount * 0.5), visualPuzzles: Math.round(correctCount * 0.5) }
    };
}

module.exports = { blockDesign, visualPuzzles, generateBattery, calculateScore, calculatePercentile };
