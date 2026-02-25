const fs = require('fs');
const path = require('path');
const db = require('../config/database');
const { TASK_TYPES } = require('./constants');

const localItemBankPath = path.join(__dirname, '../data/workingMemoryItemBank.json');

function loadFallbackItemBank() {
  return JSON.parse(fs.readFileSync(localItemBankPath, 'utf8'));
}

async function getItemBank() {
  try {
    const rows = await db('working_memory_item_bank').where({ is_active: true });
    if (!rows || rows.length === 0) {
      return loadFallbackItemBank();
    }

    return rows.map((row) => ({
      id: row.id,
      taskType: row.task_type,
      ageBand: row.age_band,
      difficulty: row.difficulty,
      prompt: row.prompt_json,
      correctAnswer: row.correct_answer_json,
      scoring: row.scoring_json,
      ui: row.ui_json
    }));
  } catch (error) {
    return loadFallbackItemBank();
  }
}

function sample(items, size) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.max(0, Math.min(size, copy.length)));
}

async function buildAttemptItems(ageBand, attemptType) {
  const bank = await getItemBank();
  const inBand = bank.filter((item) => item.ageBand === ageBand || item.ageBand === 'ALL');

  const targetByTask = attemptType === 'baseline'
    ? {
      [TASK_TYPES.SPAN_FORWARD]: 3,
      [TASK_TYPES.SPAN_BACKWARD]: 3,
      [TASK_TYPES.N_BACK]: 3,
      [TASK_TYPES.INSTRUCTION]: 2,
      [TASK_TYPES.MENTAL_MATH_HOLD]: 2
    }
    : {
      [TASK_TYPES.SPAN_FORWARD]: 2,
      [TASK_TYPES.SPAN_BACKWARD]: 2,
      [TASK_TYPES.N_BACK]: 2,
      [TASK_TYPES.INSTRUCTION]: 1,
      [TASK_TYPES.MENTAL_MATH_HOLD]: 1
    };

  const selected = [];
  Object.entries(targetByTask).forEach(([taskType, count]) => {
    const pool = inBand.filter((item) => item.taskType === taskType);
    selected.push(...sample(pool, count));
  });

  return sample(selected, selected.length);
}

function normalizeValue(value) {
  if (Array.isArray(value)) return value.join(',');
  if (typeof value === 'object' && value !== null) return JSON.stringify(value);
  return String(value ?? '');
}

function evaluateResponse(item, response) {
  const expected = item.correctAnswer;

  if (Array.isArray(expected) && Array.isArray(response)) {
    const correct = expected.length === response.length && expected.every((v, idx) => normalizeValue(v) === normalizeValue(response[idx]));
    return { correct, omissionError: response.length < expected.length, commissionError: response.length > expected.length };
  }

  const correct = normalizeValue(expected) === normalizeValue(response);
  const omissionError = response === null || response === undefined || response === '';
  const commissionError = !correct && !omissionError;

  return { correct, omissionError, commissionError };
}

module.exports = {
  buildAttemptItems,
  evaluateResponse
};
