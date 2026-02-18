/**
 * Migration: Create intervention and session tracking tables
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('intervention_protocols', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('target_dimension', 50).notNullable();
            table.integer('target_range_min').notNullable();
            table.integer('target_range_max').notNullable();
            table.string('priority', 20).notNullable();
            table.string('title', 200).notNullable();
            table.text('description').notNullable();
            table.text('scientific_basis');
            table.jsonb('implementation').notNullable();
            table.jsonb('expected_outcomes');
            table.integer('version').defaultTo(1);

            table.index(['target_dimension', 'priority']);
        })

        .createTable('assigned_interventions', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('protocol_id').references('id').inTable('intervention_protocols');
            table.uuid('student_id').notNullable().references('id').inTable('users');
            table.uuid('assigned_by').notNullable().references('id').inTable('users');
            table.string('status', 20).defaultTo('active');
            table.timestamp('assigned_at').defaultTo(knex.fn.now());
            table.date('target_end_date');
            table.integer('sessions_completed').defaultTo(0);
            table.integer('sessions_target').notNullable();
            table.specificType('progress_notes', 'TEXT[]');
            table.timestamp('last_session_at');

            table.index(['student_id', 'status']);
            table.index(['assigned_by']);
        })

        .createTable('session_logs', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('intervention_id').notNullable().references('id').inTable('assigned_interventions');
            table.uuid('student_id').notNullable().references('id').inTable('users');
            table.uuid('tutor_id').notNullable().references('id').inTable('users');
            table.date('scheduled_date').notNullable();
            table.timestamp('actual_date').defaultTo(knex.fn.now());
            table.integer('duration_minutes');

            // Fidelity tracking
            table.specificType('protocol_steps_completed', 'TEXT[]');
            table.specificType('steps_skipped', 'TEXT[]');
            table.specificType('materials_used', 'TEXT[]');
            table.enum('script_adherence', ['full', 'partial', 'adapted', 'none']);
            table.text('adaptations_made');

            // Student response
            table.integer('engagement_level').checkBetween([1, 5]);
            table.integer('cognitive_load').checkBetween([1, 5]);
            table.string('strategy_use', 20);
            table.specificType('breakthroughs', 'TEXT[]');
            table.specificType('frustrations', 'TEXT[]');

            // Outcomes
            table.boolean('objective_met');
            table.text('evidence');
            table.text('next_session_adjustment');

            // Flags
            table.boolean('requires_supervision').defaultTo(false);
            table.boolean('reassessment_recommended').defaultTo(false);

            table.timestamp('created_at').defaultTo(knex.fn.now());

            table.index(['intervention_id']);
            table.index(['student_id', 'created_at']);
            table.index(['tutor_id']);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('session_logs')
        .dropTableIfExists('assigned_interventions')
        .dropTableIfExists('intervention_protocols');
};
