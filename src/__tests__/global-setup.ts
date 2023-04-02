import Knex from "knex";
import knexfile from "../config/knexfile";
import logger from "../loaders/logger";

export default async function setup(): Promise<void> {
  logger.info("Setting up test database");

  try {
    const db = Knex(knexfile.test);

    // Roll back all migrations on the test database
    await db.migrate.rollback();
    await db.raw('DROP TABLE IF EXISTS "user_city" CASCADE');
    await db.raw('DROP TABLE IF EXISTS "event" CASCADE');
    await db.raw('DROP TABLE IF EXISTS "user" CASCADE');
    await db.raw('DROP TABLE IF EXISTS "city" CASCADE');
    logger.info("Migrations rolled back successfully");

    // Run migrations on the test database
    await db.migrate.latest();
    logger.info("Migrations run successfully");

    // Seed the test database with data
    await db.seed.run();
    logger.info("Seed data inserted successfully");

    global.db = db;
  } catch (error) {
    logger.error(`Error setting up test database: ${error}`);
  }
}
