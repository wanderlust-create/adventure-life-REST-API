import * as express from "express";
import logger from "../../loaders/logger";
import UserService from "../services/user";

export default {
  listAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

async function listAllUsers(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering GET All CONTROLLER - users/ endpoint.`);
  const users = await UserService.listAllUsers();
  try {
    if (!users) {
      res.status(404).json({ error: `No users found` });
      return;
    } else {
      res.json(users);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
}
async function getUserById(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering GET BY ID CONTROLLER - users/ endpoint.`);
  const findUser = await UserService.getUserById(req.params.id);
  try {
    if (findUser === undefined) {
      res.status(404).json({ error: "No user found" });
      return;
    } else {
      res.json(findUser);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
async function createUser(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering CREATE CONTROLLER - users/ endpoint.`);
  const newUser = await UserService.createUser(req.body);
  try {
    if (newUser === undefined) {
      res.status(404).json({ error: "User was not created" });
      return;
    } else {
      res.json(newUser);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
async function updateUserById(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering UPDATE CONTROLLER - users/ endpoint.`);
  const id = req.params.id;
  const updatedUser = await UserService.updateUserById(id, req.body);
  try {
    if (!updatedUser) {
      res.status(404).json({ error: "No user found" });
      return;
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
async function deleteUserById(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering DELETE CONTROLLER - users/ endpoint.`);
  try {
    const id = req.params.id;
    const deletedUser = await UserService.deleteUserById(id);
    if (deletedUser.length === 0) {
      res.status(404).json({ error: "No user deleted" });
      return;
    } else {
      logger.info("User Deleted:", deletedUser);
      res.json({ alert: "User Deleted", deletedUser });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
