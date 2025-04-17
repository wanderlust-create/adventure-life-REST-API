import dotenv from 'dotenv';
dotenv.config();

import type { Knex } from 'knex';
import knex from 'knex';
import knexfile from '../config/knexConfig';
import logger from '../loaders/logger';

export default async function setup(): Promise<void> {
  logger.info('Setting up test database');

  let db: Knex | undefined;

  try {
    db = knex(knexfile.test);

    await db.migrate.rollback();
    await db.raw('DROP TABLE IF EXISTS "user_city" CASCADE');
    await db.raw('DROP TABLE IF EXISTS "event" CASCADE');
    await db.raw('DROP TABLE IF EXISTS "user" CASCADE');
    await db.raw('DROP TABLE IF EXISTS "city" CASCADE');

    logger.info('Migrations rolled back successfully');

    await db.migrate.latest();
    logger.info('Migrations run successfully');

    await db.seed.run();
    logger.info('Seed data inserted successfully');

    global.db = db;
  } catch (error) {
    logger.error(`Error setting up test database: ${error}`);
    await db?.destroy();
    process.exit(1);
  }
}
