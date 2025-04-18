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
async function listAllCities(): Promise<City[]> {
  logger.debug('➡️ DAO: GET /cities');
  return City.query()
    .select('id', 'name', 'country')
    .orderBy('created_at', 'desc')
    .withGraphFetched('event');
}

/**
 * Returns a city by ID.
 * @param cityId The ID of the city to retrieve.
 */
async function getCityById(cityId: string): Promise<City | undefined> {
  logger.debug(`➡️ DAO: GET /cities/${cityId}`);
  return City.query().findById(cityId).select('id', 'name', 'country').withGraphFetched('event');
}

/**
 * Creates a new city.
 * @param cityData The city data to insert.
 */
async function createCity(cityData: City): Promise<City> {
  logger.debug('➡️ DAO: POST /cities', cityData);
  return City.query().insert({
    name: cityData.name,
    country: cityData.country,
  });
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
async function deleteCityById(cityId: string): Promise<City[]> {
  logger.debug(`➡️ DAO: DELETE /cities/${cityId}`);
  return City.query().delete().where({ id: cityId }).returning('*');
}
