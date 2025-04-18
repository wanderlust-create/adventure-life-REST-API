import { Request, Response } from 'express';
import logger from '../../loaders/logger';
import UserService from '../services/user';

export default {
  listAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

async function listAllUsers(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ GET /users');
  try {
    const users = await UserService.listAllUsers();
    if (!users) {
      res.status(404).json({ error: `No users found` });
      return;
    } else {
      res.json(users);
    }
  } catch (err) {
    logger.error('❌ Error in listAllUsers()', err);
    res.status(500).send(err);
  }
}

async function getUserById(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ GET /users/:id');
  try {
    const findUser = await UserService.getUserById(req.params.id);
    if (findUser === undefined) {
      res.status(404).json({ error: 'No user found' });
      return;
    } else {
      res.json(findUser);
    }
  } catch (err) {
    logger.error('❌ Error in getUserById()', err);
    res.status(500).json(err);
  }
}
async function createUser(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ POST /users');
  try {
    const newUser = await UserService.createUser(req.body);
    if (newUser === undefined) {
      res.status(404).json({ error: 'User was not created' });
      return;
    } else {
      res.status(201).json(newUser);
    }
  } catch (err) {
    logger.error('❌ Error in createUser()', err);
    res.status(500).json(err);
  }
}

async function updateUserById(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ PATCH /users/:id');
  try {
    const updatedUser = await UserService.updateUserById(req.params.id, req.body);
    if (!updatedUser) {
      res.status(404).json({ error: 'No user found' });
      return;
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    logger.error('❌ Error in updateUserById()', err);
    res.status(500).json(err);
  }
}

async function deleteUserById(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ DELETE /users/:id');
  try {
    const deletedUser = await UserService.deleteUserById(req.params.id);
    if (deletedUser.length === 0) {
      res.status(404).json({ error: 'No user found' });
      return;
    } else {
      logger.info('🗑️ User Deleted:', deletedUser);
      res.json({ alert: 'User Deleted', deletedUser });
    }
  } catch (err) {
    logger.error('❌ Error in deleteUserById()', err);
    res.status(500).json(err);
  }
}
