import { Model } from 'objection';

// import express from "express";
import express from 'express';

// Load HTTP request logger
import morgan from 'morgan';

// Routes
import api from '../api';

// Db connection
import connection from '../loaders/dbSetup';

// error handling
import apiErrorHandler from '../api/reqBodyValidation/error/apiErrorHandler';

function createServer() {
  const app = express();
  Model.knex(connection);
  app.use(express.json());
  app.use(morgan('combined'));
  app.use('/', api);
  app.use(apiErrorHandler);
  return app;
}

export default createServer;
