import knex from "knex";
import { Model } from "objection";

import knexConfig from "../config/knexfile";

export default function setupDb() {
  const db = knex(knexConfig.development);
  Model.knex(db);
}
