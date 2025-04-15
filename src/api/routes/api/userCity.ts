import { NextFunction, Request, Response, Router } from 'express';
import UserCityController from '../../controllers/userCity';

// Error Handler
import validateDto from '../../reqBodyValidation/middlewear/validate-dto';
import userCityDto from '../../reqBodyValidation/dtos/userCity';

const route = Router();
export default (app: Router) => {
  app.use('/user-cities', route);

  /**
   * @swagger
   * components:
   *   schemas:
   *     UserCity:
   *       type: object
   *       required:
   *         - id
   *         - user_id
   *         - city_id
   *       properties:
   *         id:
   *           type: number
   *           description: The auto-generated id of the user
   *         user_id:
   *           type: string
   *           description: User id to add the city to
   *         city_id:
   *           type: number
   *           description: City id to add to the user
   *       example:
   *         id: 4
   *         city_id: 2
   *         user_id: 3
   *     UserCityArray:
   *       type: array
   *       items:
   *         type: object
   *         properties:
   *         id:
   *           type: number
   *           description: The auto-generated id of the city
   *         user_id:
   *           type: number
   *           description: The user id
   *         city_id:
   *           type: number
   *           description: The city id
   *         example:
   *           id: 78
   *           user_id: 10
   *           city_id: 2
   */

  /**
   * @swagger
   * tags:
   *   name: User-Cities
   *   description: Adventure Life User Cities
   */

  /**
   * @swagger
   * /api/v1/user-cities:
   *   get:
   *     summary: Returns an array of all the UserCities
   *     tags: [User-Cities]
   *     responses:
   *       200:
   *         description: The user-cities were successfully retrieved
   *         content:
   *           application/json:
   *             schema:
   *                 type: array
   *                 items:
   *                  $ref: '#/components/schemas/UserCityArray'
   *       404:
   *         description: The user-city was not found
   *       500:
   *         description: An error occurred
   */
  route.get('/', UserCityController.listAllUserCities);

  /**
   * @swagger
   * /api/v1/user-cities:
   *   post:
   *     summary: Add a city to a user
   *     tags: [User-Cities]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserCity'
   *           example:
   *             userId: 3
   *             cityId: 4
   *     responses:
   *       200:
   *         description: The city was successfully added to the user
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserCity'
   *       404:
   *         description: The user and/or city was not found
   *       500:
   *         description: An error occurred
   */
  route.post('/', validateDto(userCityDto), UserCityController.createUserCity);

  /**
   * @swagger
   * /api/v1/user-cities/{id}:
   *   delete:
   *     summary: Delete userCity using userCity_id
   *     tags: [User-Cities]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The userCity_id
   *     responses:
   *       200:
   *         description: The user-city was deleted
   *       404:
   *         description: The user-city was not found
   *       500:
   *         description: An error occurred
   */
  route.delete('/:id', UserCityController.deleteUserCityById);
};
