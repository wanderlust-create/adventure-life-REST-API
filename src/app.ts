import createServer from './loaders/server';
import config from './config';
import swaggerDocs from './loaders/swagger';
import dbSetup from './loaders/dbSetup';
import logger from './loaders/logger';

const port = config.PORT;
const app = createServer();

app.listen(port, () => {
  try {
    console.log('🌱 Booting server...');

    // ⚠️ Do NOT use `await dbSetup()` here:
    // Awaiting this causes Knex to issue `SELECT *` with no table,
    // which triggers a Postgres syntax error.
    // This function only binds models to Knex, so run it synchronously.
    dbSetup();

    swaggerDocs(app, port);

    logger.info(`🚀 Adventure Life REST API listening at http://localhost:${port}/api/v1`);
  } catch (err) {
    logger.error('❌ Startup error:', err);
    process.exit(1);
  }
});

export default app;
