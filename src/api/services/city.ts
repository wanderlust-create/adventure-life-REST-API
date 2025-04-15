import City from 'api/models/city';
import cityDao from '../daos/city';

export default {
  listAllCities,
  getCityById,
  createCity,
  updateCityById,
  deleteCityById,
};

function listAllCities() {
  return cityDao.listAllCities();
}
function getCityById(id: string) {
  return cityDao.getCityById(id);
}
function createCity(cityDto: City) {
  return cityDao.createCity(cityDto);
}
function updateCityById(id: string, cityDto: City) {
  return cityDao.updateCityById(id, cityDto);
}
function deleteCityById(id: string) {
  return cityDao.deleteCityById(id);
}
