import express from 'express';
import morgan from 'morgan';
import { Model } from 'objection';

import api from '../api';
import connection from '../loaders/dbSetup';
import apiErrorHandler from '../api/reqBodyValidation/error/apiErrorHandler';

function createServer() {
  const app = express();

  // Bind knex instance to objection Model
  Model.knex(connection);

  // Middleware
  app.use(express.json());
  app.use(morgan('combined'));

  // Routes
  app.use('/', api);

  // Global error handler
  app.use(apiErrorHandler);

  return app;
}

export default createServer;
