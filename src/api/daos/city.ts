import logger from "../../loaders/logger";
import City from "../models/city";

export default {
  listAllCities,
  getCityById,
  createCity,
  updateCityById,
  deleteCityById,
};

/**
 * Returns an array of all cities, sorted by date.
 * @returns {Promise<City[]>} The cities.
 */
async function listAllCities() {
  logger.debug(`Entering GET DAO- cities/ endpoint.`);
  return City.query()
    .column("id", "name", "country")
    .orderBy("created_at", "desc")
    .withGraphFetched("event");
}

/**
 * Gets a city by ID.
 * @param {string} cityId - The ID of the city to get.\n * @returns {Promise<City>} The city.
 */
async function getCityById(cityId: string) {
  logger.debug(`Entering GET BY ID DAO- cities/ endpoint ${cityId}`);
  return City.query()
    .findById(cityId)
    .column("id", "name", "country")
    .withGraphFetched("event");
}

/**
 * Creates a new city.
 * @param {City} cityData - The city data.
 * @returns {Promise<City>} The new city.
 */
async function createCity(cityData: City) {
  logger.debug(`Entering CREATE DAO- cities/ endpoint ${cityData}`);
  const newCity = await City.query().insert({
    name: cityData.name,
    country: cityData.country,
  });
  return newCity;
}

/**
 * Updates a city by ID.
 * @param {string} cityId - The ID of the city to update.
 * @param {City} cityData - The new city data.
 * @returns {Promise<City>} The updated city.
 */
async function updateCityById(cityId: string, cityData: City) {
  logger.debug(`Entering UPDATE DAO- cities/ endpoint ${cityData}`);
  const updatedCity = await City.query()
    .findById(cityId)
    .patch({
      name: cityData.name,
      country: cityData.country,
    })
    .returning("*");
  return updatedCity;
}

/**
 * Deletes a city by ID.
 * @param {string} cityId - The ID of the city to delete.
 * @returns {Promise<City>} The deleted city.
 */
async function deleteCityById(cityId: string) {
  logger.debug(`Entering DELETE BY ID DAO- cities/ endpoint ${cityId}`);
  const deletedCity = await City.query()
    .delete()
    .where({ id: cityId })
    .returning("*");
  return deletedCity;
}
