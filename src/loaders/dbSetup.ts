// import knex from "knex";
// import { Model } from "objection";

// import knexConfig from "../config/knexfile";
// import config from "../config/index";

// const environment = config.NODE_ENV || "development";

// const connectionConfig = knexConfig[environment];

// const db = knex(connectionConfig);

// Model.knex(db);
// export default db;

import knex from "knex";
import { Model } from "objection";

import knexConfig from "../config/knexfile";

export default function db() {
  const db = knex(knexConfig.development);
  Model.knex(db);
}
