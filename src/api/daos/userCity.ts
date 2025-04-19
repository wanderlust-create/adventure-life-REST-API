import logger from '../../loaders/logger';
import UserCity from '../models/userCity';

export default {
  listAllUserCities,
  createUserCity,
  deleteUserCityById,
};

/**
 * Returns all user-city records, ordered by creation date.
 */
async function listAllUserCities(): Promise<UserCity[]> {
  logger.debug('➡️ DAO: GET /user-cities');
  return UserCity.query().select('id', 'userId', 'cityId').orderBy('created_at', 'desc');
}

/**
 * Creates a new user-city relation.
 * @param userCityDto The user-city data to insert.
 */
async function createUserCity(userCityDto: UserCity): Promise<UserCity> {
  logger.debug('➡️ DAO: POST /user-cities', userCityDto);
  return UserCity.query().insert({
    userId: userCityDto.userId,
    cityId: userCityDto.cityId,
  });
}

/**
 * Deletes a user-city relation by ID.
 * @param id The ID of the user-city record to delete.
 */
async function deleteUserCityById(id: string): Promise<UserCity[]> {
  logger.debug(`➡️ DAO: DELETE /user-cities/${id}`);
  return UserCity.query().delete().where({ id }).returning('*');
}
