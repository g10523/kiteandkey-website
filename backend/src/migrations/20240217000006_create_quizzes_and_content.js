/**
 * Migration: Create quizzes, quiz_attempts, and content_visibility tables
 * Required for quiz server-side grading and content management features
 */
exports.up = function (knex) {
    return knex.schema
        // Quizzes table — answer_key stored server-side, never sent to frontend
        .createTable('quizzes', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('lesson_id', 100).notNullable();
            table.string('title', 200).notNullable();
            table.text('description');
            table.jsonb('questions').notNullable(); // Array of {id, question, type, options, points, explanation}
            table.jsonb('answer_key').notNullable(); // Map of questionId -> correctAnswer (NEVER sent to client)
            table.integer('time_limit'); // minutes, nullable
            table.integer('passing_score').defaultTo(70); // percentage
            table.integer('max_attempts'); // null = unlimited
            table.boolean('is_required').defaultTo(false);
            table.boolean('is_visible').defaultTo(true);
            table.uuid('created_by').references('id').inTable('users');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());

            table.index(['lesson_id']);
            table.index(['is_visible']);
        })

        // Quiz Attempts — records each student submission with graded results
        .createTable('quiz_attempts', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('quiz_id').notNullable().references('id').inTable('quizzes').onDelete('CASCADE');
            table.uuid('student_id').notNullable().references('id').inTable('users');
            table.jsonb('answers').notNullable(); // Student's submitted answers
            table.jsonb('graded_results').notNullable(); // Per-question grading
            table.integer('score').notNullable(); // Percentage score
            table.boolean('passed').notNullable();
            table.integer('time_spent'); // seconds
            table.integer('attempt_number').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());

            table.index(['quiz_id', 'student_id']);
            table.index(['student_id', 'score']);
        })

        // Content Visibility — controls what students can see
        .createTable('content_visibility', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.enum('content_type', ['lesson', 'quiz', 'unit', 'assignment']).notNullable();
            table.string('content_id', 100).notNullable();
            table.uuid('student_id').references('id').inTable('users'); // null = applies to all
            table.boolean('is_visible').defaultTo(true);
            table.timestamp('release_date'); // Content becomes visible at this time
            table.timestamp('hide_date'); // Content becomes hidden at this time
            table.uuid('set_by').notNullable().references('id').inTable('users');
            table.timestamp('set_at').defaultTo(knex.fn.now());
            table.text('notes');

            table.index(['content_type', 'content_id']);
            table.index(['student_id']);
            table.index(['release_date']);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('content_visibility')
        .dropTableIfExists('quiz_attempts')
        .dropTableIfExists('quizzes');
};
