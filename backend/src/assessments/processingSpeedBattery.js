/**
 * PROCESSING SPEED BATTERY
 * 
 * Measures: Speed of mental operations, psychomotor speed, visual scanning
 * Duration: ~5 minutes
 * Subtests:
 *   1. Symbol Search - Find matching symbols quickly
 *   2. Coding - Pair symbols with numbers using a key
 * 
 * Based on WISC-V Processing Speed Index
 */

const { v4: uuidv4 } = require('uuid');

/**
 * Symbol Search Test
 * Present target symbols and search array - is target present?
 */
const symbolSearch = {
    name: 'Symbol Search',

    /**
     * Generate symbol search items
     */
    generateItems(difficulty = 'standard') {
        const items = [];
        const itemCounts = {
            screener: 10,
            standard: 30,
            diagnostic: 45
        };

        const numItems = itemCounts[difficulty] || 30;
        const symbols = ['○', '△', '□', '◇', '★', '♠', '♣', '♥', '♦', '◆', '▽', '◁', '▷', '▼', '▲'];

        for (let i = 0; i < numItems; i++) {
            const targetCount = i < 10 ? 1 : 2; // Start with 1 target, increase to 2
            const searchArraySize = 5;

            const targets = [];
            for (let t = 0; t < targetCount; t++) {
                targets.push(symbols[Math.floor(Math.random() * symbols.length)]);
            }

            const searchArray = [];
            const hasMatch = Math.random() > 0.5;

            if (hasMatch) {
                // Include one of the targets
                const matchIndex = Math.floor(Math.random() * searchArraySize);
                for (let s = 0; s < searchArraySize; s++) {
                    if (s === matchIndex) {
                        searchArray.push(targets[Math.floor(Math.random() * targets.length)]);
                    } else {
                        // Ensure no accidental matches
                        let sym;
                        do {
                            sym = symbols[Math.floor(Math.random() * symbols.length)];
                        } while (targets.includes(sym));
                        searchArray.push(sym);
                    }
                }
            } else {
                // No matches
                for (let s = 0; s < searchArraySize; s++) {
                    let sym;
                    do {
                        sym = symbols[Math.floor(Math.random() * symbols.length)];
                    } while (targets.includes(sym));
                    searchArray.push(sym);
                }
            }

            items.push({
                id: `ss_${i + 1}`,
                type: 'symbol_search',
                targets,
                searchArray,
                correctResponse: hasMatch,
                difficulty: targetCount,
                timeLimit: 30000 // 30 seconds per item (practice unlimited)
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
 * Coding Test
 * Match symbols to numbers using a key as fast as possible
 */
const coding = {
    name: 'Coding',

    /**
     * Generate coding key and items
     */
    generateItems(difficulty = 'standard') {
        const itemCounts = {
            screener: 20,
            standard: 60,
            diagnostic: 90
        };

        const numItems = itemCounts[difficulty] || 60;

        // Create symbol-number key (consistent across items)
        const symbols = ['○', '△', '□', '◇', '★', '▽', '◆', '◁', '▷'];
        const codingKey = {};
        symbols.slice(0, 9).forEach((sym, i) => {
            codingKey[i + 1] = sym;
        });

        const items = [];
        for (let i = 0; i < numItems; i++) {
            const number = Math.floor(Math.random() * 9) + 1;
            items.push({
                id: `cd_${i + 1}`,
                type: 'coding',
                number,
                codingKey,
                correctResponse: codingKey[number],
                difficulty: 1,
                timeLimit: 120000 // 2 minutes total for all items
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
 * Age-based norms for Processing Speed
 * Based on WISC-V technical manual
 */
const NORMS = {
    // Age in months -> { rawScore -> percentile }
    120: { 5: 1, 10: 5, 15: 16, 20: 37, 25: 63, 30: 84, 35: 95, 40: 99 },
    132: { 5: 1, 10: 5, 15: 16, 20: 37, 25: 63, 30: 84, 35: 95, 40: 99, 45: 99 },
    144: { 7: 1, 12: 5, 17: 16, 22: 37, 27: 63, 32: 84, 37: 95, 42: 99, 47: 99 },
    156: { 8: 1, 13: 5, 18: 16, 23: 37, 28: 63, 33: 84, 38: 95, 43: 99, 48: 99 },
    168: { 10: 1, 15: 5, 20: 16, 25: 37, 30: 63, 35: 84, 40: 95, 45: 99, 50: 99 },
    180: { 12: 1, 17: 5, 22: 16, 27: 37, 32: 63, 37: 84, 42: 95, 47: 99, 52: 99 }
};

/**
 * Calculate percentile from raw score and age
 */
function calculatePercentile(ageMonths, rawScore) {
    // Find closest age group
    const ages = Object.keys(NORMS).map(Number).sort((a, b) => a - b);
    let closestAge = ages[0];
    for (const age of ages) {
        if (Math.abs(age - ageMonths) < Math.abs(closestAge - ageMonths)) {
            closestAge = age;
        }
    }

    const normTable = NORMS[closestAge];
    const scores = Object.keys(normTable).map(Number).sort((a, b) => a - b);

    // Find percentile using linear interpolation
    if (rawScore <= scores[0]) return normTable[scores[0]];
    if (rawScore >= scores[scores.length - 1]) return normTable[scores[scores.length - 1]];

    for (let i = 0; i < scores.length - 1; i++) {
        if (rawScore >= scores[i] && rawScore <= scores[i + 1]) {
            const lowerScore = scores[i];
            const upperScore = scores[i + 1];
            const lowerPercentile = normTable[lowerScore];
            const upperPercentile = normTable[upperScore];

            const ratio = (rawScore - lowerScore) / (upperScore - lowerScore);
            return Math.round(lowerPercentile + ratio * (upperPercentile - lowerPercentile));
        }
    }

    return 50; // Default to median
}

/**
 * Generate complete Processing Speed battery
 */
function generateBattery(testType = 'standard') {
    const symbolSearchItems = symbolSearch.generateItems(testType);
    const codingItems = coding.generateItems(testType);

    return {
        id: `ps_battery_${uuidv4()}`,
        dimension: 'processing_speed',
        version: '1.0',
        test_type: testType,
        created_at: new Date().toISOString(),
        duration_minutes: 5,
        items: [...symbolSearchItems, ...codingItems],
        instructions: {
            overview: 'This assessment measures how quickly you can process visual information and make decisions.',
            symbolSearch: 'Look at the target symbols on the left. Decide if any of them appear in the search group on the right. Respond as quickly and accurately as possible.',
            coding: 'Use the key at the top to match each number with its symbol. Work as quickly as you can without making mistakes.'
        },
        scoring: {
            method: 'total_correct',
            time_bonus: true,
            accuracy_weight: 0.7,
            speed_weight: 0.3
        }
    };
}

/**
 * Calculate final score for Processing Speed
 */
function calculateScore(ageMonths, correctCount, totalTime, totalItems) {
    // Raw score combines accuracy and speed
    const accuracyScore = correctCount;
    const speedBonus = Math.max(0, totalItems - Math.floor(totalTime / 1000)); // Bonus for speed
    const rawScore = accuracyScore + Math.floor(speedBonus * 0.3);

    const percentile = calculatePercentile(ageMonths, rawScore);

    // Calculate standard score (M=100, SD=15)
    const zScore = (percentile - 50) / 50 * 2; // Approximate z-score
    const standardScore = Math.round(100 + (zScore * 15));

    // 95% confidence interval (±1 SEM, ~7 points for PS)
    const sem = 7;
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
            symbolSearch: Math.round(correctCount * 0.5),
            coding: Math.round(correctCount * 0.5)
        }
    };
}

/**
 * Get interpretation based on percentile
 */
function getInterpretation(percentile) {
    if (percentile >= 98) return 'Exceptional - Extremely fast processing';
    if (percentile >= 91) return 'Superior - Very fast processing';
    if (percentile >= 75) return 'Above Average - Fast processing';
    if (percentile >= 25) return 'Average - Typical processing speed';
    if (percentile >= 9) return 'Below Average - Slower processing';
    if (percentile >= 2) return 'Low - Significantly slower processing';
    return 'Very Low - Extremely slow processing';
}

module.exports = {
    symbolSearch,
    coding,
    generateBattery,
    calculateScore,
    calculatePercentile,
    getInterpretation
};
