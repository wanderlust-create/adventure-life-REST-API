import logger from "../../loaders/logger";
import City from "../models/city";

export default {
  listAllCities,
  getCityById,
  createCity,
  updateCityById,
  deleteCityById,
};

async function listAllCities() {
  logger.debug(`Entering GET DAO- cities/ endpoint.`);
  return City.query()
    .column("id", "name", "country")
    .orderBy("created_at", "desc")
    .withGraphFetched("event");
}
async function getCityById(id: string) {
  logger.debug(`Entering GET BY ID DAO- cities/ endpoint ${id}`);
  return City.query()
    .findById(id)
    .column("id", "name", "country")
    .withGraphFetched("event");
}
async function createCity(cityDto: City) {
  logger.debug(`Entering CREATE DAO- cities/ endpoint ${cityDto}`);
  const newCity = await City.query().insert({
    name: cityDto.name,
    country: cityDto.country,
  });
  return newCity;
}
async function updateCityById(id: string, cityDto: City) {
  logger.debug(`Entering CREATE DAO- cities/ endpoint ${cityDto}`);
  const updatedCity = await City.query()
    .findById(id)
    .patch({
      name: cityDto.name,
      country: cityDto.country,
    })
    .returning("*");
  return updatedCity;
}
async function deleteCityById(id: string) {
  logger.debug(`Entering DELETE BY ID DAO- cities/ endpoint ${id}`);
  const deletedCity = await City.query().delete().where({ id }).returning("*");
  return deletedCity;
}
