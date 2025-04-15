import Knex from 'knex';
import knexfile from '../config/knexfile';
import logger from '../loaders/logger';

export default async function teardown(): Promise<void> {
  const db = Knex(knexfile.test);

  try {
    // Drop the test database
    await db.migrate.rollback();
    await db.raw('DROP TABLE IF EXISTS "user_city" CASCADE');
    await db.raw('DROP TABLE IF EXISTS "event" CASCADE');
    await db.raw('DROP TABLE IF EXISTS "user" CASCADE');
    await db.raw('DROP TABLE IF EXISTS "city" CASCADE');
    logger.info('Migrations rolled back successfully');
  } catch (error) {
    logger.error(`Error rolling back migrations: ${error}`);
  }

  await db.destroy();
}
