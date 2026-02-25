/**
 * Migration: Create schedule tables
 * - scheduled_classes: weekly recurring class slots
 * - schedule_change_requests: student/parent requests to move a class
 */
exports.up = async function (knex) {
    await knex.schema.createTable('scheduled_classes', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('student_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
        table.uuid('tutor_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
        table.string('subject', 100).notNullable();
        table.integer('day_of_week').notNullable(); // 0=Monday … 6=Sunday
        table.time('start_time').notNullable();
        table.time('end_time').notNullable();
        table.string('location', 200).defaultTo('Online');
        table.string('color', 20).defaultTo('#a78bfa');
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);

        table.index(['student_id']);
        table.index(['tutor_id']);
    });

    await knex.schema.createTable('schedule_change_requests', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('class_id').references('id').inTable('scheduled_classes').onDelete('CASCADE').notNullable();
        table.uuid('requested_by').references('id').inTable('users').onDelete('CASCADE').notNullable();
        table.integer('proposed_day').notNullable();
        table.time('proposed_start_time').notNullable();
        table.time('proposed_end_time').notNullable();
        table.text('reason');
        table.string('status', 20).defaultTo('pending'); // pending, approved, rejected
        table.uuid('reviewed_by').references('id').inTable('users').onDelete('SET NULL');
        table.timestamp('reviewed_at');
        table.text('review_note');
        table.timestamps(true, true);

        table.index(['class_id']);
        table.index(['status']);
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('schedule_change_requests');
    await knex.schema.dropTableIfExists('scheduled_classes');
};
