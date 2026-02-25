exports.up = async function up(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.integer('learning_characteristic').checkBetween([1, 15]);
  });

  await knex.schema.createTable('mindprint_attempts', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('dimension', 50).notNullable();
    table.string('attempt_type', 20).notNullable(); // baseline | checkin
    table.string('status', 20).notNullable().defaultTo('in_progress');
    table.string('age_band', 20).notNullable();
    table.integer('learning_characteristic');
    table.timestamp('started_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('completed_at');
    table.timestamp('next_eligible_at');
    table.string('data_quality', 20); // high | medium | low
    table.jsonb('data_quality_notes');
    table.jsonb('diagnostics_json');
    table.jsonb('meta_json');
    table.uuid('created_by').references('id').inTable('users');

    table.index(['user_id', 'dimension', 'started_at']);
    table.index(['user_id', 'next_eligible_at']);
  });

  await knex.schema.createTable('mindprint_item_responses', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('attempt_id').notNullable().references('id').inTable('mindprint_attempts').onDelete('CASCADE');
    table.string('item_id', 100).notNullable();
    table.string('task_type', 50).notNullable();
    table.jsonb('presented_payload').notNullable();
    table.jsonb('response_payload').notNullable();
    table.boolean('correct').notNullable().defaultTo(false);
    table.integer('time_ms').notNullable();
    table.boolean('omission_error').notNullable().defaultTo(false);
    table.boolean('commission_error').notNullable().defaultTo(false);
    table.boolean('attention_check_passed');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.index(['attempt_id']);
    table.index(['attempt_id', 'task_type']);
  });

  await knex.schema.createTable('mindprint_scores', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('attempt_id').notNullable().unique().references('id').inTable('mindprint_attempts').onDelete('CASCADE');
    table.integer('score_0_to_100').notNullable();
    table.string('band', 30).notNullable();
    table.jsonb('subscores_json').notNullable();
    table.jsonb('trend_json').notNullable();
    table.jsonb('integrity_json').notNullable();
    table.jsonb('diagnostics_json').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.index(['score_0_to_100']);
  });

  await knex.schema.createTable('mindprint_recommendations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('attempt_id').notNullable().references('id').inTable('mindprint_attempts').onDelete('CASCADE');
    table.string('audience', 20).notNullable(); // student | parent | tutor
    table.jsonb('content_json').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.index(['attempt_id', 'audience']);
  });

  await knex.schema.createTable('mindprint_training_plans', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('attempt_id').notNullable().unique().references('id').inTable('mindprint_attempts').onDelete('CASCADE');
    table.jsonb('plan_json').notNullable();
    table.jsonb('schedule_json').notNullable();
    table.jsonb('completion_json').notNullable();
    table.date('starts_on').notNullable();
    table.date('ends_on').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('working_memory_item_bank', (table) => {
    table.string('id', 100).primary();
    table.string('task_type', 50).notNullable();
    table.string('age_band', 20).notNullable();
    table.integer('difficulty').notNullable();
    table.boolean('is_active').notNullable().defaultTo(true);
    table.jsonb('prompt_json').notNullable();
    table.jsonb('correct_answer_json').notNullable();
    table.jsonb('scoring_json').notNullable();
    table.jsonb('ui_json').notNullable();

    table.index(['age_band', 'task_type', 'difficulty']);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists('working_memory_item_bank');
  await knex.schema.dropTableIfExists('mindprint_training_plans');
  await knex.schema.dropTableIfExists('mindprint_recommendations');
  await knex.schema.dropTableIfExists('mindprint_scores');
  await knex.schema.dropTableIfExists('mindprint_item_responses');
  await knex.schema.dropTableIfExists('mindprint_attempts');

  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('learning_characteristic');
  });
};
