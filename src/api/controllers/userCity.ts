import { Request, Response } from 'express';
import logger from '../../loaders/logger';
import UserCityService from '../services/userCity';

export default {
  listAllUserCities,
  createUserCity,
  deleteUserCityById,
};

async function listAllUserCities(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ GET /user-cities');
  try {
    const userCities = await UserCityService.listAllUserCities();
    if (!userCities || userCities.length === 0) {
      res.status(404).json({ error: `No user-cities found` });
      return;
    } else {
      res.json(userCities);
    }
  } catch (err) {
    logger.error('❌ Error in listAllUserCities()', err);
    res.status(500).json(err);
  }
}

async function createUserCity(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ POST /user-cities');
  try {
    const newUserCity = await UserCityService.createUserCity(req.body);
    if (!newUserCity) {
      res.status(400).json({ error: `User-city not created` });
      return;
    } else {
      res.status(201).json(newUserCity);
    }
  } catch (err) {
    logger.error('❌ Error in createUserCity()', err);
    res.status(500).json(err);
  }
}

async function deleteUserCityById(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ DELETE /user-cities/:id');
  try {
    const id = req.params.id;
    const deletedUserCity = await UserCityService.deleteUserCityById(id);
    if (!deletedUserCity || deletedUserCity.length === 0) {
      res.status(404).json({ error: `User-city not found` });
      return;
    } else {
      logger.info('🗑️ User-City deleted:', deletedUserCity);
      res.json({ alert: 'User-City Deleted', deletedUserCity });
    }
  } catch (err) {
    logger.error('❌ Error in deleteUserCityById()', err);
    res.status(500).json(err);
  }
}
