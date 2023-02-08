import { Request, Response } from "express";
import swaggerJSDocs from 'swagger-jsdoc'
import swaggerUi from "swagger-ui-express";
import * as  appData from "../../package.json";
import logger from "../loaders/logger";
import config from "../config";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Adventure Life REST API docs",
      version: appData.version,
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
      },
    ],
  },
  apis: ["src/api/routes/api/*.ts"],
};

const swaggerSpec = swaggerJSDocs(swaggerOptions);

function swaggerDocs(app: any, port: number) {
  // Browser Swagger docs
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/api-docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  logger.info(
    `%%% 💻 🔑 Adventure Life REST API Docs avaliable at http://localhost:${port}/api-docs 🔑 💻 %%%`
  );
}
export default swaggerDocs;
