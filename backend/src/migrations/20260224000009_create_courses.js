/**
 * Course Module — Database Schema
 * Kite & Key Academy LMS
 *
 * Tables: courses, course_terms, lessons, lesson_access_logs, quiz_attempts
 */

exports.up = async function (knex) {
    // Clean up any leftover tables from partial previous runs
    await knex.schema.dropTableIfExists('course_enrollments');
    await knex.schema.dropTableIfExists('homework_tracking');
    await knex.schema.dropTableIfExists('quiz_attempts');
    await knex.schema.dropTableIfExists('lesson_access_logs');
    await knex.schema.dropTableIfExists('lessons');
    await knex.schema.dropTableIfExists('course_terms');
    await knex.schema.dropTableIfExists('courses');

    // ═══════════════════════════════════════
    //  1. COURSES
    // ═══════════════════════════════════════
    await knex.schema.createTable('courses', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.string('name', 255).notNullable();
        table.text('description');
        table.string('subject_type', 50).notNullable(); // english, mathematics, science
        table.integer('year_level').notNullable().defaultTo(10);
        table.string('curriculum_code', 10).notNullable().defaultTo('NSW');
        table.string('icon', 50).defaultTo('BookOpen');
        table.string('color', 20).defaultTo('#6B5B95');
        table.boolean('is_active').defaultTo(true);
        table.uuid('created_by').references('id').inTable('users').onDelete('SET NULL');
        table.timestamps(true, true);
    });

    // ═══════════════════════════════════════
    //  2. COURSE TERMS
    // ═══════════════════════════════════════
    await knex.schema.createTable('course_terms', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('course_id').references('id').inTable('courses').onDelete('CASCADE').notNullable();
        table.integer('term_number').notNullable(); // 1-4
        table.string('title', 255);
        table.boolean('is_locked').defaultTo(false);
        table.timestamps(true, true);

        table.unique(['course_id', 'term_number']);
    });

    // ═══════════════════════════════════════
    //  3. LESSONS
    // ═══════════════════════════════════════
    await knex.schema.createTable('lessons', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('term_id').references('id').inTable('course_terms').onDelete('CASCADE').notNullable();
        table.integer('lesson_number').notNullable(); // 1-10
        table.string('title', 255);
        table.jsonb('content_notes').defaultTo('{}');   // Rich text lesson content
        table.jsonb('homework_content').defaultTo('{}'); // Homework questions
        table.boolean('is_accessible').defaultTo(false); // Tutor toggle
        table.jsonb('quiz_settings').defaultTo(JSON.stringify({
            available_from: null,
            available_until: null,
            due_date: null,
            time_limit_minutes: 30
        }));
        table.jsonb('quiz_questions').defaultTo('[]');   // Array of questions
        table.timestamps(true, true);

        table.unique(['term_id', 'lesson_number']);
    });

    // ═══════════════════════════════════════
    //  4. LESSON ACCESS LOGS
    // ═══════════════════════════════════════
    await knex.schema.createTable('lesson_access_logs', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('lesson_id').references('id').inTable('lessons').onDelete('CASCADE').notNullable();
        table.uuid('tutor_id').references('id').inTable('users').onDelete('SET NULL');
        table.string('action', 20).notNullable(); // 'grant' or 'revoke'
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });

    // ═══════════════════════════════════════
    //  5. QUIZ ATTEMPTS
    // ═══════════════════════════════════════
    await knex.schema.createTable('quiz_attempts', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('lesson_id').references('id').inTable('lessons').onDelete('CASCADE').notNullable();
        table.uuid('student_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
        table.timestamp('started_at').defaultTo(knex.fn.now());
        table.timestamp('completed_at');
        table.integer('score');
        table.jsonb('answers_json').defaultTo('{}');
        table.string('status', 20).defaultTo('in_progress'); // in_progress, completed, timed_out
        table.timestamps(true, true);
    });

    // ═══════════════════════════════════════
    //  6. HOMEWORK TRACKING
    // ═══════════════════════════════════════
    await knex.schema.createTable('homework_tracking', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('lesson_id').references('id').inTable('lessons').onDelete('CASCADE').notNullable();
        table.uuid('student_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
        table.boolean('completed_in_book').defaultTo(false);
        table.timestamp('marked_at');
        table.timestamps(true, true);

        table.unique(['lesson_id', 'student_id']);
    });

    // ═══════════════════════════════════════
    //  7. COURSE ENROLLMENTS
    // ═══════════════════════════════════════
    await knex.schema.createTable('course_enrollments', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('course_id').references('id').inTable('courses').onDelete('CASCADE').notNullable();
        table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
        table.string('role', 20).notNullable(); // student, tutor
        table.uuid('enrolled_by').references('id').inTable('users').onDelete('SET NULL');
        table.timestamps(true, true);

        table.unique(['course_id', 'user_id']);
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('course_enrollments');
    await knex.schema.dropTableIfExists('homework_tracking');
    await knex.schema.dropTableIfExists('quiz_attempts');
    await knex.schema.dropTableIfExists('lesson_access_logs');
    await knex.schema.dropTableIfExists('lessons');
    await knex.schema.dropTableIfExists('course_terms');
    await knex.schema.dropTableIfExists('courses');
};
