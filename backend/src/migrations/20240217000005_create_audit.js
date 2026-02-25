/**
 * Migration: Create audit logging and token blacklist tables
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('audit_logs', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('user_id').references('id').inTable('users');
            table.string('action', 100).notNullable();
            table.string('entity_type', 50);
            table.uuid('entity_id');
            table.jsonb('old_value');
            table.jsonb('new_value');
            table.string('ip_address', 45);
            table.text('user_agent');
            table.timestamp('created_at').defaultTo(knex.fn.now());

            table.index(['user_id', 'created_at']);
            table.index(['entity_type', 'entity_id']);
        })

        .createTable('token_blacklist', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.text('token').notNullable();
            table.timestamp('expires_at').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());

            table.index(['expires_at']);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('token_blacklist')
        .dropTableIfExists('audit_logs');
};
