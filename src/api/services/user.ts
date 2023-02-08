import User from "api/models/user";
import userDao from "../daos/user";

export default {
  listAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

function listAllUsers() {
  return userDao.listAllUsers();
}
function getUserById(id: string) {
  return userDao.getUserById(id);
}
function createUser(userDto: User) {
  return userDao.createUser(userDto);
}
function updateUserById(id: string, userDto: User) {
  return userDao.updateUserById(id, userDto);
}
function deleteUserById(id: string) {
  return userDao.deleteUserById(id);
}
