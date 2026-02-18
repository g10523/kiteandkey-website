/**
 * FOCUS & ATTENTION BATTERY
 * Measures: Sustained attention, vigilance, selective attention
 * Duration: ~8 minutes
 */

const { v4: uuidv4 } = require('uuid');

const cptTest = {
    name: 'Continuous Performance Test',
    generateItems(difficulty = 'standard') {
        const counts = { screener: 40, standard: 100, diagnostic: 200 };
        const items = [];
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'X'];

        for (let i = 0; i < (counts[difficulty] || 100); i++) {
            const letter = letters[Math.floor(Math.random() * letters.length)];
            const isTarget = letter !== 'X'; // Press for everything except X

            items.push({
                id: `cpt_${i + 1}`,
                type: 'cpt',
                stimulus: letter,
                correctResponse: isTarget ? 'press' : 'omit',
                displayDuration: 500,
                interTrialInterval: 1000 + Math.random() * 1000,
                difficulty: 1
            });
        }
        return items;
    }
};

const nBackTest = {
    name: 'N-Back Test',
    generateItems(difficulty = 'standard') {
        const counts = { screener: 20, standard: 40, diagnostic: 60 };
        const items = [];
        const n = difficulty === 'screener' ? 1 : 2;
        const sequence = [];

        for (let i = 0; i < (counts[difficulty] || 40); i++) {
            const val = Math.floor(Math.random() * 9) + 1;
            sequence.push(val);
            const isMatch = i >= n && val === sequence[i - n];

            items.push({
                id: `nb_${i + 1}`,
                type: 'n_back',
                n,
                stimulus: val,
                correctResponse: isMatch,
                displayDuration: 1500,
                difficulty: n
            });
        }
        return items;
    }
};

function generateBattery(testType = 'standard') {
    return {
        id: `fa_battery_${uuidv4()}`,
        dimension: 'focus_attention',
        items: [...cptTest.generateItems(testType), ...nBackTest.generateItems(testType)],
        instructions: {
            cpt: 'Press the button for every letter EXCEPT X.',
            nBack: 'Press the button if the current number matches the one shown N steps ago.'
        }
    };
}

module.exports = { generateBattery };
