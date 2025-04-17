// This file is used to configure Knex.js for database migrations and seeding.
import 'ts-node/register';
import dotenv from 'dotenv';
dotenv.config();

import config from './src/config/knexConfig';
export default config;

