/**
 * Migration: Create security_keys table for account creation
 * 
 * Each security key is a unique, one-time-use secret that must be provided
 * during account registration. This ensures only authorised users can create
 * accounts on the platform. Keys are pre-generated and role-locked.
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('security_keys', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('key_hash', 255).notNullable().unique()
                .comment('bcrypt hash of the security key — plaintext is never stored');
            table.string('key_label', 100).notNullable()
                .comment('Human-readable label, e.g. "Parent Key #1"');
            table.enum('role', ['student', 'tutor', 'parent', 'admin']).notNullable()
                .comment('The role this key grants upon registration');
            table.boolean('is_used').defaultTo(false)
                .comment('Once used, the key is permanently consumed');
            table.uuid('used_by').references('id').inTable('users')
                .comment('The user who consumed this key');
            table.timestamp('used_at')
                .comment('When the key was consumed');
            table.boolean('is_active').defaultTo(true)
                .comment('Admin can revoke keys by setting this to false');
            table.timestamp('expires_at').notNullable()
                .comment('Key expires after this timestamp');
            table.uuid('created_by').references('id').inTable('users')
                .comment('Admin who generated this key');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.string('ip_used_from', 45)
                .comment('IP address of the client that consumed this key');

            table.index(['is_used', 'is_active', 'expires_at']);
            table.index(['role']);
        })

        // Security event log — granular audit trail for all auth actions
        .createTable('security_events', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('event_type', 100).notNullable()
                .comment('e.g. LOGIN_SUCCESS, LOGIN_FAILED, KEY_USED, KEY_REVOKED, ACCOUNT_LOCKED');
            table.uuid('user_id').references('id').inTable('users');
            table.string('email', 255)
                .comment('Email attempted (for failed logins where user may not exist)');
            table.string('ip_address', 45);
            table.text('user_agent');
            table.jsonb('metadata')
                .comment('Additional context (e.g. failure reason, key_id used, etc.)');
            table.string('severity', 20).defaultTo('info')
                .comment('info, warning, critical');
            table.timestamp('created_at').defaultTo(knex.fn.now());

            table.index(['event_type', 'created_at']);
            table.index(['user_id', 'created_at']);
            table.index(['ip_address', 'created_at']);
            table.index(['severity']);
        })

        // Account lockout tracking
        .createTable('login_attempts', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('email', 255).notNullable();
            table.string('ip_address', 45);
            table.boolean('success').defaultTo(false);
            table.timestamp('attempted_at').defaultTo(knex.fn.now());

            table.index(['email', 'attempted_at']);
            table.index(['ip_address', 'attempted_at']);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('login_attempts')
        .dropTableIfExists('security_events')
        .dropTableIfExists('security_keys');
};
