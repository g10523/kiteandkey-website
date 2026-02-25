/**
 * VERBAL REASONING BATTERY
 * Measures: Verbal comprehension, semantic relationships, abstract verbal logic
 * Duration: ~10 minutes
 */

const { v4: uuidv4 } = require('uuid');

const similarities = {
    name: 'Similarities',
    generateItems(difficulty = 'standard') {
        const counts = { screener: 10, standard: 20, diagnostic: 30 };
        const items = [];

        // Example pairs
        const pairs = [
            { a: 'Apple', b: 'Banana', category: 'Fruit', level: 1 },
            { a: 'Dog', b: 'Cat', category: 'Pet', level: 1 },
            { a: 'Hammer', b: 'Screwdriver', category: 'Tool', level: 1 },
            { a: 'Shirt', b: 'Pants', category: 'Clothing', level: 1 },
            { a: 'Car', b: 'Bicycle', category: 'Transport', level: 2 },
            { a: 'Pen', b: 'Pencil', category: 'Writing Instrument', level: 2 },
            { a: 'Piano', b: 'Guitar', category: 'Musical Instrument', level: 2 },
            { a: 'Mountain', b: 'Valley', category: 'Landform', level: 3 },
            { a: 'Truth', b: 'Honesty', category: 'Virtue', level: 3 },
            { a: 'Peace', b: 'Harmony', category: 'State of Being', level: 4 },
            { a: 'Democracy', b: 'Monarchy', category: 'Government', level: 4 },
            { a: 'Photosynthesis', b: 'Respiration', category: 'Biological Process', level: 5 }
        ];

        for (let i = 0; i < (counts[difficulty] || 20); i++) {
            const pair = pairs[i % pairs.length];
            items.push({
                id: `sim_${i + 1}`,
                type: 'similarities',
                pair: [pair.a, pair.b],
                choices: [pair.category, 'Action', 'Object', 'Location', 'Emotion'],
                correctResponse: pair.category,
                difficulty: pair.level,
                timeLimit: 30000
            });
        }
        return items;
    },
    checkCorrect(item, response) {
        return item.correctResponse === response;
    }
};

const vocabulary = {
    name: 'Vocabulary',
    generateItems(difficulty = 'standard') {
        const counts = { screener: 12, standard: 24, diagnostic: 36 };
        const items = [];

        const words = [
            { word: 'Brave', definition: 'Showing no fear', level: 1 },
            { word: 'Gently', definition: 'In a kind way', level: 1 },
            { word: 'Enormous', definition: 'Very large', level: 2 },
            { word: 'Swift', definition: 'Moving very fast', level: 2 },
            { word: 'Ponder', level: 3, definition: 'To think deeply' },
            { word: 'Ample', level: 3, definition: 'More than enough' },
            { word: 'Diligent', level: 4, definition: 'Hardworking' },
            { word: 'Eloquent', level: 5, definition: 'Persuasive speaking' }
        ];

        for (let i = 0; i < (counts[difficulty] || 24); i++) {
            const w = words[i % words.length];
            items.push({
                id: `voc_${i + 1}`,
                type: 'vocabulary',
                word: w.word,
                choices: [w.definition, 'Incorrect Def 1', 'Incorrect Def 2', 'Incorrect Def 3'],
                correctResponse: w.definition,
                difficulty: w.level,
                timeLimit: 30000
            });
        }
        return items;
    },
    checkCorrect(item, response) {
        return item.correctResponse === response;
    }
};

const NORMS = {
    120: { 8: 1, 16: 16, 24: 50, 32: 84, 40: 99 },
    144: { 10: 1, 20: 16, 30: 50, 40: 84, 50: 99 },
    168: { 12: 1, 24: 16, 36: 50, 48: 84, 60: 99 }
};

function calculatePercentile(ageMonths, rawScore) {
    const ages = [120, 144, 168];
    const closestAge = ages.reduce((prev, curr) =>
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
        id: `vr_battery_${uuidv4()}`,
        dimension: 'verbal_reasoning',
        test_type: testType,
        items: [...similarities.generateItems(testType), ...vocabulary.generateItems(testType)],
        instructions: {
            overview: 'Measures language comprehension and verbal logic.',
            similarities: 'Identify the common category for word pairs.',
            vocabulary: 'Select the correct definition for the given word.'
        }
    };
}

function calculateScore(ageMonths, correctCount) {
    const percentile = calculatePercentile(ageMonths, correctCount);
    const standardScore = Math.round(100 + ((percentile - 50) / 50 * 2) * 15);
    return {
        dimension: 'verbal_reasoning',
        rawScore: correctCount,
        standardScore,
        percentile,
        compositeScore: standardScore
    };
}

module.exports = { similarities, vocabulary, generateBattery, calculateScore };
