import * as express from "express";
import logger from "../../loaders/logger";
import UserCityService from "../services/userCity";

export default {
  listAllUserCities,
  createUserCity,
  deleteUserCityById,
};

async function listAllUserCities(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering GET ALL CONTROLLER - user-cities endpoint.`);
  const userCities = await UserCityService.listAllUserCities();
  try {
    if (!userCities) {
      res.status(404).json({ error: `No user-cities found` });
      return;
    } else {
      res.json(userCities);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
async function createUserCity(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering CREATE CONTROLLER - user-cities endpoint.`);
  const newUserCity = await UserCityService.createUserCity(req.body);
  try {
    if (newUserCity === undefined) {
      res.status(404).json({ error: `User-city not created` });
      return;
    } else {
      res.json(newUserCity);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
async function deleteUserCityById(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering DELETE CONTROLLER - user-cities endpoint.`);
  const id = req.params.id;
  const deletedUserCity = await UserCityService.deleteUserCityById(id);
  try {
    if (deletedUserCity.length === 0) {
      res.status(404).json({ error: `User-city not deleted` });
      return;
    } else {
      logger.info("User-City deleted:", deletedUserCity);
      res.json({ alert: "User-City Deleted", deletedUserCity });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
