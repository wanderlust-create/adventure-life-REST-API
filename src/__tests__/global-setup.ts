import { knexSnakeCaseMappers } from "objection";
import Knex from "knex";
import config from "../config";
import logger from "../loaders/logger";

const database = "adventure-test-database";


const connectionInfoWithoutDb = {
  host: "localhost",
  port: 5432,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
};

const connectionInfoWithDb = {
  host: "localhost",
  port: 5432,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: database,
};

// Create the database
async function createTestDatabase() {
  const knex = Knex({
    client: "pg",
    connection: {
      ...connectionInfoWithoutDb,
    },
  });

  try {
    console.info(`database:${database}`);
    await knex.raw(`DROP DATABASE IF EXISTS "${database}"`);
    await knex.raw(`CREATE DATABASE "${database}"`);
    console.info(`database dropped`);
  } catch (error) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
}

// Seed the database with schema and data
async function seedTestDatabase() {
  const knex = Knex({
    client: "pg",
    connection: connectionInfoWithDb,
    migrations: {
      directory: "../adventure-life-with-jest/src/db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "../adventure-life-with-jest/src/db/seeds",
    },
    ...knexSnakeCaseMappers(),
  });

  try {
    await knex.migrate.latest();
    console.info("Database migrated successfully")
    await knex.seed.run();
    console.info("Database seeded successfully");
  } catch (error) {
    throw new Error(error);
  } 
}
module.exports = async () => {
  try {
    await createTestDatabase();
    await seedTestDatabase();
    console.log("Test database created successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
