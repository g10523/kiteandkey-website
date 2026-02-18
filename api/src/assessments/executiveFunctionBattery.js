/**
 * EXECUTIVE FUNCTION BATTERY
 * Measures: Cognitive flexibility, inhibition, task switching, planning
 * Duration: ~12 minutes
 */

const { v4: uuidv4 } = require('uuid');

const stroopTest = {
    name: 'Stroop Test',
    generateItems(difficulty = 'standard') {
        const counts = { screener: 15, standard: 30, diagnostic: 45 };
        const items = [];
        const colors = ['Red', 'Blue', 'Green', 'Yellow'];

        for (let i = 0; i < (counts[difficulty] || 30); i++) {
            const textColor = colors[Math.floor(Math.random() * colors.length)];
            const labelColor = colors[Math.floor(Math.random() * colors.length)];
            const isCongruent = textColor === labelColor;

            items.push({
                id: `st_${i + 1}`,
                type: 'stroop',
                text: labelColor,
                color: textColor, // The actual color to name
                choices: colors,
                correctResponse: textColor,
                isCongruent,
                difficulty: isCongruent ? 1 : 3,
                timeLimit: 3000
            });
        }
        return items;
    }
};

const trailMaking = {
    name: 'Trail Making',
    generateItems(difficulty = 'standard') {
        const counts = { screener: 5, standard: 10, diagnostic: 15 };
        const items = [];

        for (let i = 0; i < (counts[difficulty] || 10); i++) {
            const sequenceLength = 5 + i;
            // Mixed sequence: 1 - A - 2 - B - 3 - C ...
            const sequence = [];
            for (let j = 0; j < sequenceLength; j++) {
                sequence.push((j + 1).toString());
                sequence.push(String.fromCharCode(65 + j));
            }

            items.push({
                id: `tm_${i + 1}`,
                type: 'trail_making',
                sequence,
                timeLimit: 120000,
                difficulty: Math.floor(i / 3) + 1
            });
        }
        return items;
    }
};

const NORMS = {
    120: { 10: 1, 25: 50, 40: 99 },
    144: { 15: 1, 30: 50, 45: 99 },
    168: { 20: 1, 35: 50, 50: 99 }
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
        id: `ef_battery_${uuidv4()}`,
        dimension: 'executive_function',
        items: [...stroopTest.generateItems(testType), ...trailMaking.generateItems(testType)],
        instructions: {
            stroop: 'Name the color of the text, not what the word says.',
            trailMaking: 'Connect numbers and letters in alternating order (1-A-2-B...).'
        }
    };
}

module.exports = { generateBattery, calculatePercentile };
