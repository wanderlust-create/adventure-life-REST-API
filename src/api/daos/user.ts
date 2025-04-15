import logger from '../../loaders/logger';
import User from '../models/user';

export default {
  listAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
/**
 * Returns an array of all users, sorted by date.
 * @returns {Promise<User[]>} The users.
 */
async function listAllUsers() {
  logger.debug(`Entering GET DAO- users/ endpoint.`);
  return User.query()
    .column('id', 'firstName', 'lastName', 'email')
    .orderBy('created_at', 'desc')
    .withGraphFetched('city');
}

/**
 * Gets an user by ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise} The user.
 */
async function getUserById(id: string) {
  logger.debug(`Entering GET BY ID DAO- users/ endpoint ${id}`);
  return User.query()
    .findById(id)
    .column('id', 'firstName', 'lastName', 'email')
    .withGraphFetched('city');
}

/**
 * Creates a new user
 * @param {User} userData - The event data.
 * @returns {Promise<User>} The new user.
 */
async function createUser(userData: User) {
  logger.debug(`Entering CREATE DAO- users/ endpoint ${userData}`);
  const newUser = await User.query().insert({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  });
  return newUser;
}

/**
 * Updates a user by ID.
 * @param {string} id - The ID of the user to update.
 * @param {User} userData - The user data to update.
 * @returns {Promise<User>} The updated user.
 */

async function updateUserById(id: string, userData: User) {
  logger.debug(`Entering UPDATE BY ID DAO- users/ endpoint ${id}`);
  const updatedUser = await User.query()
    .findById(id)
    .patch({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    })
    .returning('*');
  return updatedUser;
}

/**
 * Deletes a user by ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<User>} The deleted user.
 */

async function deleteUserById(id: string) {
  logger.debug(`Entering DELETE BY ID DAO- users/ endpoint ${id}`);
  const deletedUser = await User.query().delete().where({ id }).returning('*');
  return deletedUser;
}
