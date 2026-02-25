/**
 * Migration: Add username column to users table
 * Usernames are used as the primary login identifier instead of email.
 */
exports.up = function (knex) {
    return knex.schema.alterTable('users', (table) => {
        table.string('username', 50).unique();
        table.index(['username']);
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('users', (table) => {
        table.dropIndex(['username']);
        table.dropColumn('username');
    });
};
