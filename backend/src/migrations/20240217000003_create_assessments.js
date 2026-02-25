/**
 * Migration: Create assessment and MindPrint tables
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('assessments', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('student_id').notNullable().references('id').inTable('users');
            table.uuid('tutor_id').notNullable().references('id').inTable('users');
            table.string('dimension', 50).notNullable();
            table.enum('test_type', ['screener', 'standard', 'diagnostic']).notNullable();
            table.jsonb('raw_scores').notNullable();
            table.jsonb('calculated_results').notNullable();
            table.text('behavioral_observations');
            table.jsonb('environmental_factors');
            table.string('status', 20).defaultTo('completed');
            table.timestamp('created_at').defaultTo(knex.fn.now());

            table.index(['student_id', 'dimension', 'created_at']);
            table.index(['tutor_id']);
        })

        .createTable('mindprint_profiles', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('student_id').unique().notNullable().references('id').inTable('users');
            table.string('archetype', 100).notNullable();
            table.text('archetype_description');
            table.jsonb('dimension_scores').notNullable();
            table.jsonb('composite_scores').notNullable();
            table.specificType('development_edges', 'TEXT[]');
            table.specificType('strengths', 'TEXT[]');
            table.timestamp('calculated_at').defaultTo(knex.fn.now());
            table.date('next_reassessment_date');

            table.index(['student_id']);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('mindprint_profiles')
        .dropTableIfExists('assessments');
};
