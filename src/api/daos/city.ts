import logger from '../../loaders/logger';
import City from '../models/city';

export default {
  listAllCities,
  getCityById,
  createCity,
  updateCityById,
  deleteCityById,
};

/**
 * Returns all cities, ordered by creation date.
 */
async function listAllCities() {
  logger.debug('➡️ DAO: GET /cities');
  return City.query()
    .column('id', 'name', 'country')
    .orderBy('created_at', 'desc')
    .withGraphFetched('event');
}

/**
 * Returns a city by ID.
 * @param cityId The ID of the city to retrieve.
 */
async function getCityById(cityId: string) {
  logger.debug(`➡️ DAO: GET /cities/${cityId}`);
  return City.query().findById(cityId).column('id', 'name', 'country').withGraphFetched('event');
}


/**
 * Creates a new city.
 * @param cityData The city data to insert.
 */
async function createCity(cityData: City) {
  logger.debug('➡️ DAO: POST /cities', cityData);
  const newCity = await City.query().insert({
    name: cityData.name,
    country: cityData.country,
  });
  return newCity;
}

/**
 * Updates a city by ID.
 * @param cityId The ID of the city to update.
 * @param cityData The updated city data.
 */
async function updateCityById(cityId: string, cityData: City) {
  logger.debug(`➡️ DAO: PATCH /cities/${cityId}`, cityData);
  const updatedCity = await City.query()
    .findById(cityId)
    .patch({
      name: cityData.name,
      country: cityData.country,
    })
    .returning('*');
  return updatedCity;
}

/**
 * Deletes a city by ID.
 * @param cityId The ID of the city to delete.
 */
async function deleteCityById(cityId: string) {
  logger.debug(`➡️ DAO: DELETE /cities/${cityId}`);
  const deletedCity = await City.query().delete().where({ id: cityId }).returning('*');
  return deletedCity;
}
