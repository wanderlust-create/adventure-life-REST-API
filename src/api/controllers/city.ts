import { Request, Response } from 'express';
import logger from '../../loaders/logger';
import CityService from '../services/city';

export default {
  listAllCities,
  getCityById,
  createCity,
  updateCityById,
  deleteCityById,
};

async function listAllCities(req: Request, res: Response): Promise<void> {
  logger.debug('GET /cities - listAllCities');
  try {
    const cities = await CityService.listAllCities();
    if (!cities) {
      res.status(404).json({ error: 'No cities found' });
    } else {
      res.json(cities);
    }
  } catch (err) {
    logger.error('Error in listAllCities:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getCityById(req: Request, res: Response): Promise<void> {
  logger.debug(`GET /cities/${req.params.id} - getCityById`);
  try {
    const city = await CityService.getCityById(req.params.id);
    if (!city) {
      res.status(404).json({ error: 'No city found' });
    } else {
      res.json(city);
    }
  } catch (err) {
    logger.error('Error in getCityById:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createCity(req: Request, res: Response): Promise<void> {
  logger.debug('POST /cities - createCity');
  try {
    const newCity = await CityService.createCity(req.body);
    if (!newCity) {
      res.status(400).json({ error: 'City was not created' });
    } else {
      res.status(201).json(newCity);
    }
  } catch (err) {
    logger.error('Error in createCity:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateCityById(req: Request, res: Response): Promise<void> {
  logger.debug(`PATCH /cities/${req.params.id} - updateCityById`);
  try {
    const updatedCity = await CityService.updateCityById(req.params.id, req.body);
    if (!updatedCity) {
      res.status(404).json({ error: 'No city found' });
    } else {
      res.json(updatedCity);
    }
  } catch (err) {
    logger.error('Error in updateCityById:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteCityById(req: Request, res: Response): Promise<void> {
  logger.debug(`DELETE /cities/${req.params.id} - deleteCityById`);
  try {
    const deletedCity = await CityService.deleteCityById(req.params.id);
    if (!deletedCity || deletedCity.length === 0) {
      res.status(404).json({ error: 'No city found' });
    } else {
      logger.info('City deleted:', deletedCity);
      res.json({ alert: 'City Deleted', deletedCity });
    }
  } catch (err) {
    logger.error('Error in deleteCityById:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
