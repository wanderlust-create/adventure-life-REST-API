import logger from "../../loaders/logger";
import UserCity from "../models/userCity";

export default {
  listAllUserCities,
  createUserCity,
  deleteUserCityById,
};

async function listAllUserCities() {
  logger.debug(`Entering GET ALL DAO- user-cities endpoint`);
  return UserCity.query()
    .column("id", "userId", "cityId")
    .orderBy("created_at", "desc");
}
async function createUserCity(userCityDto: UserCity) {
  logger.debug(`Entering CREATE DAO- user-cities endpoint`);
  const newUserCity = await UserCity.query().insert({
    userId: userCityDto.userId,
    cityId: userCityDto.cityId,
  });
  return newUserCity;
}
async function deleteUserCityById(id: string) {
  logger.debug(`Entering DELETE DAO- user-cities endpoint`);
  const deletedUserCity = await UserCity.query()
    .delete()
    .where({ id })
    .returning("*");
  return deletedUserCity;
}
