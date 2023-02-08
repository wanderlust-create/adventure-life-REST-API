import logger from "../../loaders/logger";
import User from "../models/user";

export default {
  listAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

async function listAllUsers() {
  logger.debug(`Entering GET DAO- users/ endpoint.`);
  return User.query()
    .column("id", "firstName", "lastName", "email")
    .orderBy("created_at", "desc")
    .withGraphFetched("city");
}
async function getUserById(id: string) {
  logger.debug(`Entering GET BY ID DAO- users/ endpoint ${id}`);
  return User.query()
    .findById(id)
    .column("id", "firstName", "lastName", "email")
    .withGraphFetched("city");
}
async function createUser(userDto: User) {
  logger.debug(`Entering CREATE DAO- users/ endpoint ${userDto}`);
  const newUser = await User.query().insert({
    firstName: userDto.firstName,
    lastName: userDto.lastName,
    email: userDto.email,
  });
  return newUser;
}
async function updateUserById(id: string, userDto: User) {
  logger.debug(`Entering CREATE DAO- users/ endpoint ${userDto}`);
  const updatedUser = await User.query()
    .findById(id)
    .patch({
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
    })
    .returning("*");
  return updatedUser;
}
async function deleteUserById(id: string) {
  logger.debug(`Entering DELETE BY ID DAO- users/ endpoint ${id}`);
  const deletedUser = await User.query().delete().where({ id }).returning("*");
  return deletedUser;
}
