import { Router } from 'express';
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
   *         - userId
   *         - cityId
   *       properties:
   *         id:
   *           type: number
   *           description: Auto-generated ID of the userCity
   *         userId:
   *           type: number
   *           description: ID of the user
   *         cityId:
   *           type: number
   *           description: ID of the city
   *       example:
   *         id: 4
   *         userId: 3
   *         cityId: 2
   *     UserCityArray:
   *       type: array
   *       items:
   *         $ref: '#/components/schemas/UserCity'
   */

  /**
   * @swagger
   * tags:
   *   name: User-Cities
   *   description: User travel destinations
   */

  /**
   * @swagger
   * /api/v1/user-cities:
   *   get:
   *     summary: List all user-city associations
   *     tags: [User-Cities]
   *     responses:
   *       200:
   *         description: A list of user-cities
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserCityArray'
   *       404:
   *         description: No user-city entries found
   *       500:
   *         description: Server error
   */
  route.get('/', UserCityController.listAllUserCities);

  /**
   * @swagger
   * /api/v1/user-cities:
   *   post:
   *     summary: Associate a user with a city
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
   *       201:
   *         description: The user-city was created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserCity'
   *       400:
   *         description: Validation error
   *       404:
   *         description: User or city not found
   *       500:
   *         description: Server error
   */
  route.post('/', validateDto(userCityDto), UserCityController.createUserCity);

  /**
   * @swagger
   * /api/v1/user-cities/{id}:
   *   delete:
   *     summary: Remove a user-city association
   *     tags: [User-Cities]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: ID of the userCity record
   *     responses:
   *       200:
   *         description: The user-city entry was deleted
   *       404:
   *         description: The user-city was not found
   *       500:
   *         description: Server error
   */
  route.delete('/:id', UserCityController.deleteUserCityById);
};
