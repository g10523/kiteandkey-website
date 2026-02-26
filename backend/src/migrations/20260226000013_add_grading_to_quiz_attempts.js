/**
 * Migration: Add grading fields to quiz_attempts
 * Enables tutors to grade quiz submissions per-question and add a final comment.
 */

exports.up = async function (knex) {
    await knex.schema.alterTable('quiz_attempts', (table) => {
        table.jsonb('question_marks').nullable();        // { "mc_1": 1, "text_11": 3, ... }
        table.integer('tutor_final_mark').nullable();   // Final awarded mark
        table.text('tutor_comment').nullable();         // Overall feedback comment
        table.uuid('graded_by').nullable()              // Tutor's user ID
            .references('id').inTable('users').onDelete('SET NULL');
        table.timestamp('graded_at').nullable();        // When it was graded
    });
};

exports.down = async function (knex) {
    await knex.schema.alterTable('quiz_attempts', (table) => {
        table.dropColumn('question_marks');
        table.dropColumn('tutor_final_mark');
        table.dropColumn('tutor_comment');
        table.dropColumn('graded_by');
        table.dropColumn('graded_at');
    });
};
