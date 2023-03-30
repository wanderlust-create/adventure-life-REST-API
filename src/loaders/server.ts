// import express from "express";
import express from "express";

// Load HTTP request logger
import morgan from "morgan";

// Routes
import api from "../api";

// error handling
import apiErrorHandler from "../api/reqBodyValidation/error/apiErrorHandler";

function createServer() {
  const app = express();
  app.use(express.json());
  app.use(morgan("combined"));
  app.use("/", api);
  app.use(apiErrorHandler);
  return app;
}

export default createServer;
