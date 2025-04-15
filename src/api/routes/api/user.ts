import { NextFunction, Request, Response, Router } from 'express';
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
   *         - id
   *         - firstName
   *         - lastName
   *         - email
   *       properties:
   *         id:
   *           type: number
   *           description: The auto-generated id of the user
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
   *         type: object
   *         properties:
   *         id:
   *           type: number
   *           description: The auto-generated id of the user
   *         firstName:
   *           type: string
   *           description: The user's first name
   *         lastName:
   *           type: string
   *           description: The user's last name
   *         email:
   *           type: string
   *           description: The user's email address
   *         example:
   *           id: 4
   *           firstName: Stansie
   *           lastName: Narayan
   *           email: Stansie@email.com
   *
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
   *     summary: Returns an array of all the users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: The users were successfully retrieved
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               $ref: '#/components/schemas/UserArray'
   *       404:
   *         description: Users were  not found
   *       500:
   *         description: An error occurred
   */
  route.get('/', UserController.listAllUsers);

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   get:
   *     summary: Get user attributes with user_id
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The user id
   *     responses:
   *       200:
   *         description: The user attributes
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: The user was not found
   *       500:
   *         description: An error occurred
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
   *       200:
   *         description: The user was successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: The user was not found
   *       500:
   *         description: An error occurred
   */
  route.post('/', validateDto(userDto), UserController.createUser);

  /**
   * @swagger
   * /api/v1/users/{id}:
   *  patch:
   *    summary: Update user using user_id
   *    tags: [Users]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: number
   *        required: true
   *        description: The user id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/User'
   *          example:
   *             lastName: Corceda
   *    responses:
   *      200:
   *        description: The user was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *      404:
   *        description: The user was not found
   *      500:
   *        description: An error occurred
   */
  route.patch('/:id', UserController.updateUserById);

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   delete:
   *     summary: Delete user using user_id
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The user id
   *
   *     responses:
   *       200:
   *         description: The user was deleted
   *       404:
   *         description: The user was not found
   *       500:
   *         description: An error occurred
   */
  route.delete('/:id', UserController.deleteUserById);
};
