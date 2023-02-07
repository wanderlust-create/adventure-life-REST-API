import * as express from "express";
import logger from "../../loaders/logger";

export default {
  listAllCities,
};

async function listAllCities(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering GET All CONTROLLER - cities/ endpoint.`);
  console.log("Connected!")
}
