require('dotenv').config();

const sslConfig = process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false;

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/kite_and_key_dev',
            ssl: sslConfig,
        },
        pool: {
            min: parseInt(process.env.DATABASE_POOL_MIN) || 2,
            max: parseInt(process.env.DATABASE_POOL_MAX) || 10
        },
        migrations: {
            directory: './src/migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './src/seeds'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: sslConfig,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './src/migrations',
            tableName: 'knex_migrations'
        }
    }
};
