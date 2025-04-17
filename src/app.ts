import createServer from './loaders/server';
import config from './config';
import swaggerDocs from './loaders/swagger';
import dbSetup from './loaders/dbSetup';
import logger from './loaders/logger';

const port = config.PORT;
const app = createServer();

app.listen(port, async () => {
  try {
    console.log('🌱 Booting server...');
    // ⚠️ Do NOT use `await dbSetup()` here:
    // Calling await causes Knex to issue `select *` with no table,
    // triggering a Postgres syntax error. This function only binds models,
    // so it's safe (and preferred) to run it synchronously.
    dbSetup();

    swaggerDocs(app, port);
    logger.info(`🚀 Adventure Life REST API listening at http://localhost:${port}/api/v1`);
  } catch (err) {
    console.error('❌ Startup error:', err.stack || err);
    process.exit(1);
  }
});

export default app;
