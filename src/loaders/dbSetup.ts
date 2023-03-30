import knex from "knex";
import { Model } from "objection";
import logger from "./logger"

import knexConfig from "../config/knexfile";


async function setupDb() {
  const db = knex(knexConfig.development);
  try {
    Model.knex(db);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export default setupDb;
