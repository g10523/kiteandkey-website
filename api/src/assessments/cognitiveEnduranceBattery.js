/**
 * COGNITIVE ENDURANCE BATTERY
 * Measures: Mental stamina, sustained cognitive effort, resistance to fatigue
 * Duration: ~15 minutes
 */

const { v4: uuidv4 } = require('uuid');

const serialSevens = {
    name: 'Serial Sevens',
    generateItems(difficulty = 'standard') {
        const counts = { screener: 10, standard: 20, diagnostic: 30 };
        const items = [];
        let current = 100;

        for (let i = 0; i < (counts[difficulty] || 20); i++) {
            const next = current - 7;
            items.push({
                id: `s7_${i + 1}`,
                type: 'serial_sevens',
                currentValue: current,
                correctResponse: next,
                difficulty: Math.floor(i / 5) + 1,
                timeLimit: 15000
            });
            current = next;
        }
        return items;
    }
};

const mentalArithmetic = {
    name: 'Mental Arithmetic',
    generateItems(difficulty = 'standard') {
        const counts = { screener: 15, standard: 30, diagnostic: 45 };
        const items = [];

        for (let i = 0; i < (counts[difficulty] || 30); i++) {
            const a = Math.floor(Math.random() * 50) + 10;
            const b = Math.floor(Math.random() * 50) + 10;
            const op = Math.random() > 0.5 ? '+' : '-';
            const result = op === '+' ? a + b : a - b;

            items.push({
                id: `ma_${i + 1}`,
                type: 'mental_arithmetic',
                problem: `${a} ${op} ${b}`,
                correctResponse: result,
                difficulty: Math.floor(i / 10) + 1,
                timeLimit: 20000
            });
        }
        return items;
    }
};

function generateBattery(testType = 'standard') {
    return {
        id: `ce_battery_${uuidv4()}`,
        dimension: 'cognitive_endurance',
        items: [...serialSevens.generateItems(testType), ...mentalArithmetic.generateItems(testType)],
        instructions: {
            serialSevens: 'Starting from 100, subtract 7 repeatedly.',
            mentalArithmetic: 'Solve the math problems as quickly as possible.'
        }
    };
}

module.exports = { generateBattery };
