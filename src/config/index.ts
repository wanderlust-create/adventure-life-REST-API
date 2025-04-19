import * as dotenv from 'dotenv';
import { isInteger } from './utils';

// Default to development environment
process.env.NODE_ENV ||= 'development';

// Load .env variables
const envFound = dotenv.config();
if (!envFound) {
  throw new Error('⚠️ Could not load .env file');
}

// Dynamically determine port from env or fallback
function resolvePort(): number {
  const portArg = process.env.PORT;
  return isInteger(portArg) ? parseInt(portArg) : 3000;
}

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: resolvePort(),
  LOG_LEVEL: process.env.LOG_LEVEL || 'silly',

  DB_NAME: process.env.DB_NAME,
  TEST_DB_NAME: process.env.DB_NAME_TEST || process.env.TEST_DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,

  API: {
    PREFIX: '/api/v1',
  },
};

export default config;
