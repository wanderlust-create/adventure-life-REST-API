import { Model } from 'objection';
import knex from 'knex';
import knexConfig from '../config/knexConfig';
import config from '../config';

const env = config.NODE_ENV || 'development';

if (!knexConfig[env]) {
  throw new Error(`❌ No knex configuration found for environment: ${env}`);
}

console.log(`🔌 Binding knex for environment: ${env}`);
const connection = knex(knexConfig[env]);

Model.knex(connection);

export default connection;
