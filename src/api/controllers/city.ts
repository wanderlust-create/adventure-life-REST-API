import * as express from "express";
import logger from "../../loaders/logger";
import CityService from "../services/city";

export default {
  listAllCities,
  getCityById,
  createCity,
  updateCityById,
  deleteCityById,
};

async function listAllCities(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering GET All CONTROLLER - cities/ endpoint.`);
  const cities = await CityService.listAllCities();
  try {
    if (!cities) {
      res.status(404).json({ error: `No cities found` });
      return;
    } else {
      res.json(cities);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
}
async function getCityById(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering GET BY ID CONTROLLER - cities/ endpoint.`);
  const city = await CityService.getCityById(req.params.id);
  try {
    if (city === undefined) {
      res.status(404).json({ error: "No city found" });
      return;
    } else {
      res.json(city);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
async function createCity(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering CREATE CONTROLLER - cities/ endpoint.`);
  const newCity = await CityService.createCity(req.body);
  try {
    if (newCity === undefined) {
      res.status(404).json({ error: "City was not created" });
      return;
    } else {
      res.json(newCity);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
async function updateCityById(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering UPDATE CONTROLLER - cities/ endpoint.`);
  const id = req.params.id;
  const updatedCity = await CityService.updateCityById(id, req.body);
  try {
    if (!updatedCity) {
      res.status(404).json({ error: "No city found" });
      return;
    } else {
      res.json(updatedCity);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
async function deleteCityById(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering DELETE CONTROLLER - cities/ endpoint.`);
  try {
    const id = req.params.id;
    const deletedCity = await CityService.deleteCityById(id);
    if (deletedCity.length === 0) {
      res.sendStatus(404).json({ error: "No city deleted" });
      return;
    } else {
      logger.info("City Deleted:", deletedCity);
      res.json({ alert: "City Deleted", deletedCity });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
