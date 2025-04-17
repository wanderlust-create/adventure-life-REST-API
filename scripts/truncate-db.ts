import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import knexConfig from '../src/config/knexConfig';
import knex from 'knex';

const env = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[env]);

async function truncateDatabase() {
  console.log(`🚀 Truncating tables in Adventure Life database: ${process.env.DB_NAME}`);
  try {
    await db.raw(`
      TRUNCATE TABLE user_city, event, city, "user"
      RESTART IDENTITY CASCADE;
    `);
    console.log('✅ Tables truncated and identity sequences reset.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error truncating tables:', error);
    process.exit(1);
  }
}

truncateDatabase();
