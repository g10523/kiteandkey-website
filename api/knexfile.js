require('dotenv').config();

module.exports = {
    development: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL || {
            host: 'localhost',
            port: 5432,
            database: 'kite_and_key_dev',
            user: 'postgres',
            password: 'postgres'
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
            ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
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
