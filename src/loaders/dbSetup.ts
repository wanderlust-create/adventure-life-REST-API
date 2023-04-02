import { Model } from "objection";
import knex from "knex";

import knexConfig from "../config/knexfile";
import config from "../config/index";

const env = config.NODE_ENV || "development";

const connection = knex(knexConfig[env]);

Model.knex(connection);

export default connection;
