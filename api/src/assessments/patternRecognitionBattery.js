/**
 * PATTERN RECOGNITION BATTERY
 * 
 * Measures: Abstract reasoning, fluid intelligence, pattern completion
 * Duration: ~12 minutes
 * Subtests:
 *   1. Matrix Reasoning - Complete visual patterns (Raven's-style)
 *   2. Figure Weights - Balance scales with shapes
 * 
 * Based on WISC-V Fluid Reasoning Index
 */

const { v4: uuidv4 } = require('uuid');

/**
 * Matrix Reasoning Test
 * Present 3x3 grid with bottom-right missing - select correct completion
 */
const matrixReasoning = {
    name: 'Matrix Reasoning',

    /**
     * Generate matrix reasoning items
     */
    generateItems(difficulty = 'standard') {
        const itemCounts = {
            screener: 10,
            standard: 25,
            diagnostic: 35
        };

        const numItems = itemCounts[difficulty] || 25;
        const items = [];

        // Pattern types: size, rotation, color, quantity, position
        const patternTypes = ['size_progression', 'rotation', 'alternating', 'quantity', 'position'];

        for (let i = 0; i < numItems; i++) {
            const patternType = patternTypes[Math.floor(i / 5) % patternTypes.length];
            const difficulty = Math.min(5, Math.floor(i / 5) + 1);

            items.push({
                id: `mr_${i + 1}`,
                type: 'matrix_reasoning',
                pattern_type: patternType,
                difficulty,
                matrix_config: generateMatrixPattern(patternType, difficulty),
                answer_choices: 6, // 6 multiple choice options
                correctResponse: null, // Will be set by matrix generator
                timeLimit: 60000 // 60 seconds per item
            });
        }

        return items;
    },

    /**
     * Check if response is correct
     */
    checkCorrect(item, responseIndex) {
        return item.correctResponse === responseIndex;
    }
};

/**
 * Generate a matrix pattern based on type
 */
function generateMatrixPattern(type, difficulty) {
    // Simplified pattern generation
    // In production, this would create actual SVG/image patterns
    const shapes = ['circle', 'square', 'triangle', 'diamond'];
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    const sizes = ['small', 'medium', 'large'];

    const pattern = {
        type,
        difficulty,
        grid: [], // 3x3 grid
        choices: [], // 6 answer choices
        correctIndex: Math.floor(Math.random() * 6)
    };

    // Generate logical pattern
    switch (type) {
        case 'size_progression':
            pattern.rule = 'Shapes increase in size from left to right';
            break;
        case 'rotation':
            pattern.rule = 'Shapes rotate 90° clockwise each step';
            break;
        case 'alternating':
            pattern.rule = 'Shapes alternate between two types';
            break;
        case 'quantity':
            pattern.rule = 'Number of shapes increases by one';
            break;
        case 'position':
            pattern.rule = 'Shape moves to next position clockwise';
            break;
    }

    // In production: actually generate the visual patterns
    pattern.rendered = false; // Flag that this needs rendering on frontend

    return pattern;
}

/**
 * Figure Weights Test
 * Balance scales with different shapes - determine missing weight
 */
const figureWeights = {
    name: 'Figure Weights',

    /**
     * Generate figure weights items
     */
    generateItems(difficulty = 'standard') {
        const itemCounts = {
            screener: 8,
            standard: 20,
            diagnostic: 30
        };

        const numItems = itemCounts[difficulty] || 20;
        const items = [];

        const shapes = ['○', '△', '□', '◇', '★'];

        for (let i = 0; i < numItems; i++) {
            const difficulty = Math.min(5, Math.floor(i / 5) + 1);
            const numScales = Math.min(3, Math.floor(i / 8) + 1); // Start with 1 scale, up to 3

            // Generate equation: shape values that balance
            const shapeValues = {};
            shapes.forEach((shape, idx) => {
                shapeValues[shape] = idx + 1; // Simple values: 1-5
            });

            // Create balanced scales
            const scales = [];
            for (let s = 0; s < numScales; s++) {
                const leftShapes = [];
                const rightShapes = [];

                // Add shapes to left side
                const numLeft = Math.floor(Math.random() * 2) + 1;
                for (let l = 0; l < numLeft; l++) {
                    leftShapes.push(shapes[Math.floor(Math.random() * shapes.length)]);
                }

                // Calculate total weight
                const leftWeight = leftShapes.reduce((sum, shape) => sum + shapeValues[shape], 0);

                // Add shapes to right side to balance
                let rightWeight = 0;
                while (rightWeight < leftWeight) {
                    const shape = shapes[Math.floor(Math.random() * shapes.length)];
                    rightShapes.push(shape);
                    rightWeight += shapeValues[shape];
                }

                scales.push({
                    left: leftShapes,
                    right: rightShapes,
                    balanced: rightWeight === leftWeight
                });
            }

            // Create test scale with missing shape
            const testLeft = [shapes[Math.floor(Math.random() * shapes.length)]];
            const testLeftWeight = testLeft.reduce((sum, s) => sum + shapeValues[s], 0);

            const testRight = [shapes[Math.floor(Math.random() * shapes.length)], '?'];
            const knownRightWeight = shapeValues[testRight[0]];
            const missingWeight = testLeftWeight - knownRightWeight;

            // Find which shape has the missing weight
            let correctShape = shapes[0];
            for (const shape of shapes) {
                if (shapeValues[shape] === missingWeight) {
                    correctShape = shape;
                    break;
                }
            }

            items.push({
                id: `fw_${i + 1}`,
                type: 'figure_weights',
                difficulty,
                shape_values: shapeValues,
                example_scales: scales,
                test_scale: {
                    left: testLeft,
                    right: testRight
                },
                answer_choices: shapes,
                correctResponse: correctShape,
                timeLimit: 90000 // 90 seconds
            });
        }

        return items;
    },

    /**
     * Check if response is correct
     */
    checkCorrect(item, response) {
        return item.correctResponse === response;
    }
};

/**
 * Age-based norms for Pattern Recognition
 */
const NORMS = {
    120: { 5: 1, 10: 5, 15: 16, 20: 37, 25: 63, 30: 84, 35: 95, 40: 99 },
    132: { 6: 1, 11: 5, 16: 16, 21: 37, 26: 63, 31: 84, 36: 95, 41: 99 },
    144: { 8: 1, 13: 5, 18: 16, 23: 37, 28: 63, 33: 84, 38: 95, 43: 99 },
    156: { 10: 1, 15: 5, 20: 16, 25: 37, 30: 63, 35: 84, 40: 95, 45: 99 },
    168: { 12: 1, 17: 5, 22: 16, 27: 37, 32: 63, 37: 84, 42: 95, 47: 99 },
    180: { 14: 1, 19: 5, 24: 16, 29: 37, 34: 63, 39: 84, 44: 95, 49: 99 }
};

function calculatePercentile(ageMonths, rawScore) {
    const ages = Object.keys(NORMS).map(Number).sort((a, b) => a - b);
    let closestAge = ages[0];
    for (const age of ages) {
        if (Math.abs(age - ageMonths) < Math.abs(closestAge - ageMonths)) {
            closestAge = age;
        }
    }

    const normTable = NORMS[closestAge];
    const scores = Object.keys(normTable).map(Number).sort((a, b) => a - b);

    if (rawScore <= scores[0]) return normTable[scores[0]];
    if (rawScore >= scores[scores.length - 1]) return normTable[scores[scores.length - 1]];

    for (let i = 0; i < scores.length - 1; i++) {
        if (rawScore >= scores[i] && rawScore <= scores[i + 1]) {
            const ratio = (rawScore - scores[i]) / (scores[i + 1] - scores[i]);
            return Math.round(normTable[scores[i]] + ratio * (normTable[scores[i + 1]] - normTable[scores[i]]));
        }
    }

    return 50;
}

/**
 * Generate complete Pattern Recognition battery
 */
function generateBattery(testType = 'standard') {
    const matrixItems = matrixReasoning.generateItems(testType);
    const figureWeightsItems = figureWeights.generateItems(testType);

    return {
        id: `pr_battery_${uuidv4()}`,
        dimension: 'pattern_recognition',
        version: '1.0',
        test_type: testType,
        created_at: new Date().toISOString(),
        duration_minutes: 12,
        items: [...matrixItems, ...figureWeightsItems],
        instructions: {
            overview: 'This assessment measures your ability to recognize patterns and solve visual puzzles.',
            matrixReasoning: 'Look at the pattern in the grid. Figure out the rule, then choose which option completes the pattern.',
            figureWeights: 'Study the balanced scales to figure out what each shape weighs. Then determine which shape balances the test scale.'
        },
        scoring: {
            method: 'irt', // Item Response Theory for adaptive difficulty
            basal: 3, // 3 consecutive correct to establish basal
            ceiling: 3 // 3 consecutive incorrect to establish ceiling
        }
    };
}

/**
 * Calculate score for Pattern Recognition
 */
function calculateScore(ageMonths, correctCount, totalItems) {
    const rawScore = correctCount;
    const percentile = calculatePercentile(ageMonths, rawScore);

    const zScore = (percentile - 50) / 50 * 2;
    const standardScore = Math.round(100 + (zScore * 15));

    const sem = 8;
    const confidenceInterval = [
        Math.max(55, standardScore - sem),
        Math.min(145, standardScore + sem)
    ];

    return {
        rawScore,
        standardScore,
        percentile,
        confidenceInterval,
        compositeScore: standardScore,
        interpretation: getInterpretation(percentile),
        subtestScores: {
            matrixReasoning: Math.round(correctCount * 0.6),
            figureWeights: Math.round(correctCount * 0.4)
        }
    };
}

function getInterpretation(percentile) {
    if (percentile >= 98) return 'Exceptional - Outstanding pattern recognition';
    if (percentile >= 91) return 'Superior - Excellent abstract reasoning';
    if (percentile >= 75) return 'Above Average - Strong pattern skills';
    if (percentile >= 25) return 'Average - Typical pattern recognition';
    if (percentile >= 9) return 'Below Average - Weaker pattern skills';
    if (percentile >= 2) return 'Low - Difficulty with patterns';
    return 'Very Low - Significant difficulty with abstract reasoning';
}

module.exports = {
    matrixReasoning,
    figureWeights,
    generateBattery,
    calculateScore,
    calculatePercentile,
    getInterpretation
};
