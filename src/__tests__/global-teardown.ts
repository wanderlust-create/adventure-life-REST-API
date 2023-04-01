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
async function deleteTestDatabase() {
  const knex = Knex({
    client: "pg",
    connection: {
      ...connectionInfoWithDb,
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

module.exports = async () => {
  try {
    await deleteTestDatabase();
    console.log("Test database created successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};