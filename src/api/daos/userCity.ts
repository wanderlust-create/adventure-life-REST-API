import logger from '../../loaders/logger';
import UserCity from '../models/userCity';

export default {
  listAllUserCities,
  createUserCity,
  deleteUserCityById,
};

/**
 * Returns an array of all userCities, sorted by date.
 * @returns {Promise<UserCity[]>} The cities.
 */
async function listAllUserCities(): Promise<UserCity[]> {
  logger.debug(`Entering GET ALL DAO- user-cities endpoint`);
  return UserCity.query().column('id', 'userId', 'cityId').orderBy('created_at', 'desc');
}

/**
 * Creates a new userCity.
 * @param {userCityDto} userCityDto - The user city data.
 * @returns {Promise<UserCity>} The new user city.
 */
async function createUserCity(userCityDto: UserCity) {
  logger.debug(`Entering CREATE DAO- user-cities endpoint`);
  const newUserCity = await UserCity.query().insert({
    userId: userCityDto.userId,
    cityId: userCityDto.cityId,
  });
  return newUserCity;
}

/**
 * Deletes a userCity by ID.
 * @param {string} id - The ID of the userCity to delete.
 * @returns {Promise<UserCity>} The deleted userCity.
 */
async function deleteUserCityById(id: string) {
  logger.debug(`Entering DELETE DAO- user-cities endpoint`);
  const deletedUserCity = await UserCity.query().delete().where({ id }).returning('*');
  return deletedUserCity;
}
