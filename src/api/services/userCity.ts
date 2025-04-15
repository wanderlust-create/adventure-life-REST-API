import UserCity from 'api/models/userCity';
import userCityDao from '../daos/userCity';

export default {
  listAllUserCities,
  createUserCity,
  deleteUserCityById,
};

function listAllUserCities() {
  return userCityDao.listAllUserCities();
}
function createUserCity(userCityDto: UserCity) {
  return userCityDao.createUserCity(userCityDto);
}
function deleteUserCityById(id: string) {
  return userCityDao.deleteUserCityById(id);
}
