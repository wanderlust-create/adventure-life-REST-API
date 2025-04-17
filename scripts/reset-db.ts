import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import knexConfig from '../src/config/knexConfig';
import knex from 'knex';

(async () => {
  const env = process.env.NODE_ENV || 'development';
  const db = knex(knexConfig[env]);

  if (env === 'production') {
    throw new Error('⚠️ Do NOT reset database in production!');
  }

  console.log('🧨 Dropping all tables...');
  await db.raw(`
    DO $$ DECLARE
        r RECORD;
    BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
            EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
        END LOOP;
    END $$;
  `);

  console.log('📦 Running latest migrations...');
  await db.migrate.latest();

  console.log('🌱 Seeding fresh data...');
  await db.seed.run();

  await db.destroy();
  console.log('✅ Done!');
})();
