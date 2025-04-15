import createServer from './loaders/server';
import config from './config';
import swaggerDocs from './loaders/swagger';
import dbSetup from './loaders/dbSetup';
import logger from './loaders/logger';

const port = config.PORT;
const app = createServer();

app.listen(port, async () => {
  try {
    await dbSetup();
    logger.info('✅ Database is connected');

    swaggerDocs(app, port);
    logger.info(`🚀 Adventure Life REST API listening at http://localhost:${port}/api/v1`);
  } catch (err) {
    logger.error('❌ Failed to start application:', err);
    process.exit(1);
  }
});

export default app;
