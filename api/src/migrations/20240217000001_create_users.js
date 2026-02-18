/**
 * Migration: Create core user tables and role-specific profiles
 */
exports.up = function (knex) {
    return knex.schema
        // Main users table
        .createTable('users', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('email', 255).unique().notNullable();
            table.string('password_hash', 255).notNullable();
            table.enum('role', ['student', 'tutor', 'parent', 'admin']).notNullable();
            table.string('first_name', 100).notNullable();
            table.string('last_name', 100).notNullable();
            table.string('phone', 20);
            table.date('date_of_birth');
            table.integer('grade_level').checkBetween([5, 10]);
            table.boolean('is_active').defaultTo(true);
            table.boolean('is_verified').defaultTo(false);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.timestamp('last_login');
            table.uuid('created_by').references('id').inTable('users');
            table.uuid('registration_token_id');

            table.index(['email']);
            table.index(['role', 'is_active']);
        })

        // Admin profiles
        .createTable('admin_profiles', (table) => {
            table.uuid('user_id').primary().references('id').inTable('users').onDelete('CASCADE');
            table.boolean('can_create_tokens').defaultTo(false);
            table.boolean('can_manage_users').defaultTo(true);
            table.boolean('can_view_analytics').defaultTo(true);
            table.string('department', 100);
        })

        // Student profiles
        .createTable('student_profiles', (table) => {
            table.uuid('user_id').primary().references('id').inTable('users').onDelete('CASCADE');
            table.specificType('enrolled_subjects', 'TEXT[]');
            table.uuid('parent_id').references('id').inTable('users');
            table.jsonb('cognitive_profile');
            table.specificType('assessment_history', 'JSONB[]');
            table.specificType('current_interventions', 'UUID[]');
            table.text('notes');
            table.date('enrollment_date').defaultTo(knex.fn.now());

            table.index(['parent_id']);
        })

        // Tutor profiles
        .createTable('tutor_profiles', (table) => {
            table.uuid('user_id').primary().references('id').inTable('users').onDelete('CASCADE');
            table.specificType('subjects_teaching', 'TEXT[]');
            table.integer('max_students').defaultTo(20);
            table.text('bio');
            table.specificType('qualifications', 'TEXT[]');
            table.specificType('assigned_student_ids', 'UUID[]');
            table.string('specialization', 100);
        })

        // Parent profiles
        .createTable('parent_profiles', (table) => {
            table.uuid('user_id').primary().references('id').inTable('users').onDelete('CASCADE');
            table.specificType('child_ids', 'UUID[]');
            table.jsonb('billing_info');
            table.jsonb('communication_preferences');
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('parent_profiles')
        .dropTableIfExists('tutor_profiles')
        .dropTableIfExists('student_profiles')
        .dropTableIfExists('admin_profiles')
        .dropTableIfExists('users');
};
