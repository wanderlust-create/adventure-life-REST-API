import type { Knex } from 'knex';
import knex from 'knex';
import knexfile from '../config/knexConfig';
import logger from '../loaders/logger';

export default async function teardown(): Promise<void> {
  const db: Knex = knex(knexfile.test);

  try {
    logger.info('Tearing down test database');

    await db.migrate.rollback();

    await db.raw('DROP TABLE IF EXISTS "user_city" CASCADE');
    await db.raw('DROP TABLE IF EXISTS "event" CASCADE');
    await db.raw('DROP TABLE IF EXISTS "user" CASCADE');
    await db.raw('DROP TABLE IF EXISTS "city" CASCADE');

    logger.info('Test database cleaned up successfully');
  } catch (error) {
    logger.error(`❌ Error tearing down test database: ${error}`);
  } finally {
    await db.destroy();
  }
}
