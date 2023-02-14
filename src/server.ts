import express from "express";

// Load HTTP request logger
import morgan from "morgan";

// access .env variables
import config from "./config";

// load winston logger
import logger from "./loaders/logger";

// Routes
import api from "./api";

// Set up database access
import setupDb from "./loaders/dbSetup";

// error handling
import apiErrorHandler from "./api/reqBodyValidation/error/apiErrorHandler";

// Swagger docs
import swaggerDocs from "./loaders/swagger";

async function startServer() {
  setupDb();
  const app = express();
  app.use(express.json());
  app.use(morgan("combined"));
  app.use("/", api);
  app.use(apiErrorHandler);

  app.listen(config.PORT, () => {
    swaggerDocs(app, config.PORT);
    logger.info(`
      🎆 🚕 ✈️  Adventure Life REST API listening at http://localhost:${config.PORT} ✈️ 🚕 🎆
    `);
  });
}

startServer();
