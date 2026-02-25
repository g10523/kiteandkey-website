/**
 * Migration: Create registration token system
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('registration_tokens', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('token_code', 20).unique().notNullable();
            table.string('role', 50).notNullable();
            table.uuid('created_by').notNullable().references('id').inTable('users');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('expires_at').notNullable();
            table.integer('max_uses').defaultTo(1);
            table.integer('used_count').defaultTo(0);
            table.boolean('is_active').defaultTo(true);
            table.jsonb('metadata');

            table.index(['token_code']);
            table.index(['is_active', 'expires_at']);
        })

        .createTable('token_usage_logs', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('token_id').references('id').inTable('registration_tokens');
            table.uuid('used_by').references('id').inTable('users');
            table.timestamp('used_at').defaultTo(knex.fn.now());
            table.string('ip_address', 45);

            table.index(['token_id']);
            table.index(['used_by']);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('token_usage_logs')
        .dropTableIfExists('registration_tokens');
};
