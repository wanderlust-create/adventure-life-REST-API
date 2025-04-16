import path from 'path';
import { knexSnakeCaseMappers } from 'objection';
import type { Knex } from 'knex';

require('dotenv').config({ path: '../../.env' });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve(__dirname, '../db/migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.resolve(__dirname, '../db/seeds'),
    },

    // auto convert camelCase to snake case when accessing the Postgresql db
    ...knexSnakeCaseMappers(),
  },
  test: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'adventure-life-test-db',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: 'src/db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: 'src/db/seeds',
    },

    // auto convert camelCase to snake case when accessing the Postgresql db
    ...knexSnakeCaseMappers(),
  },
};

export default config;
