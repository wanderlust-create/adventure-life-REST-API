import createServer from "./loaders/server";
import config from "./config";
import swaggerDocs from "./loaders/swagger";
import dbSetup from "./loaders/dbSetup";
import logger from "./loaders/logger";

const port = config.PORT;

const app = createServer();

app.listen(port, async () => {
  swaggerDocs(app, port);
  logger.info(
    `🎆 🚕 ✈️  Adventure Life REST API listening at http://localhost:${config.PORT} ✈️ 🚕 🎆`
  );
  dbSetup();
  logger.info("Database is connected");
});

export default app;
