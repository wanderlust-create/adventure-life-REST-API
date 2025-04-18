import type { Application, Request, Response } from 'express';
import swaggerJSDocs from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import * as appData from '../../package.json';
import config from '../config';
import logger from '../loaders/logger';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Adventure Life REST API Docs',
      version: appData.version,
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
      },
    ],
  },
  apis: ['src/api/routes/api/*.ts'],
};

const swaggerSpec = swaggerJSDocs(swaggerOptions);

function swaggerDocs(app: Application, port: number): void {
  // Serve Swagger UI at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Serve raw Swagger JSON at /api-docs.json
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.type('application/json').send(swaggerSpec);
  });

  logger.info(`📚 Swagger docs available at http://localhost:${port}/api-docs`);
}

export default swaggerDocs;
