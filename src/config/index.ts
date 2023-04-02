import * as dotenv from "dotenv";
import { isInteger } from "./utils";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// load .env file
const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️Could not find .env file⚠️");
}

// check that process.env.PORT is an integer
const findPORT = function () {
  const portArg = process.env.PORT;
  let port: number;
  if (isInteger(portArg)) {
    port = parseInt(portArg);
  }
  if (!port) {
    port = 8080;
  }
  return port;
};

// Define port number
const port = findPORT();

export default {
  DB_NAME: process.env.DB_NAME,
  TEST_DB_NAME: process.env.TEST_DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USER: process.env.DB_USER,
  LOG_LEVEL: process.env.LOG_LEVEL || "silly",
  PORT: port,
  NODE_ENV: process.env.NODE_ENV,
  API: {
    PREFIX: "/api/v1",
  },
};
