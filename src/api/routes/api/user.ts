import { Router } from 'express';
import UserController from '../../controllers/user';

// Error Handler
import validateDto from '../../reqBodyValidation/middlewear/validate-dto';
import userDto from '../../reqBodyValidation/dtos/user';

const route = Router();
export default (app: Router) => {
  app.use('/users', route);

  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       required:
   *         - firstName
   *         - lastName
   *         - email
   *       properties:
   *         id:
   *           type: number
   *           description: Auto-generated user ID
   *         firstName:
   *           type: string
   *           description: The user's first name
   *         lastName:
   *           type: string
   *           description: The user's last name
   *         email:
   *           type: string
   *           description: The user's email address
   *       example:
   *         id: 4
   *         firstName: Stansie
   *         lastName: Narayan
   *         email: Stansie@email.com
   *     UserArray:
   *       type: array
   *       items:
   *         $ref: '#/components/schemas/User'
   */

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: Adventure Life Users
   */

  /**
   * @swagger
   * /api/v1/users:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: List of users
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserArray'
   *       404:
   *         description: No users found
   *       500:
   *         description: Server error
   */
  route.get('/', UserController.listAllUsers);

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   get:
   *     summary: Get user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: The user ID
   *     responses:
   *       200:
   *         description: User retrieved
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
   *       500:
   *         description: Server error
   */
  route.get('/:id', UserController.getUserById);

  /**
   * @swagger
   * /api/v1/users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       description: User attributes
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *           example:
   *             firstName: Sinead
   *             lastName: Seto
   *             email: Sinead@email.com
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Validation error
   *       500:
   *         description: Server error
   */
  route.post('/', validateDto(userDto), UserController.createUser);

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   patch:
   *     summary: Update a user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: The user ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *           example:
   *             lastName: Corceda
   *     responses:
   *       200:
   *         description: User updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
   *       500:
   *         description: Server error
   */
  route.patch('/:id', UserController.updateUserById);

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   delete:
   *     summary: Delete a user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: The user ID
   *     responses:
   *       200:
   *         description: User deleted successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Server error
   */
  route.delete('/:id', UserController.deleteUserById);
};
