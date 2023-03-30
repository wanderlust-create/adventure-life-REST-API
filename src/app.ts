import createServer from "./loaders/server";

// access to .env files
import config from "./config";

// Swagger docs
import swaggerDocs from "./loaders/swagger";

// Set up database access
import setupDb from "./loaders/dbSetup";

// load winston logger
import logger from "./loaders/logger";

// find port
const port = config.PORT;

const app = createServer();

app.listen(port, async () => {
  swaggerDocs(app, port);
  logger.info(`🎆 🚕 ✈️  Adventure Life REST API listening at http://localhost:${config.PORT} ✈️ 🚕 🎆
    `);

  setupDb();
});
