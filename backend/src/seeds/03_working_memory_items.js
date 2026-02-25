const fs = require('fs');
const path = require('path');

exports.seed = async function seed(knex) {
  const file = path.join(__dirname, '../data/workingMemoryItemBank.json');
  const items = JSON.parse(fs.readFileSync(file, 'utf8'));

  await knex('working_memory_item_bank').del();
  await knex('working_memory_item_bank').insert(items.map((item) => ({
    id: item.id,
    task_type: item.taskType,
    age_band: item.ageBand,
    difficulty: item.difficulty,
    is_active: true,
    prompt_json: item.prompt,
    correct_answer_json: item.correctAnswer,
    scoring_json: item.scoring,
    ui_json: item.ui
  })));
};
