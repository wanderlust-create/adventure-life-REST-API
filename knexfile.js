// This file is used to configure Knex.js for database migrations and seeding.
require('ts-node/register');
require('dotenv').config(); // 👈 Load .env from project root

const config = require('./src/config/knexConfig.ts').default;

module.exports = config;
