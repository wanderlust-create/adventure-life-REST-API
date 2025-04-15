import { NextFunction, Request, Response, Router } from 'express';
import CityController from '../../controllers/city';

// Error Handler
import validateDto from '../../reqBodyValidation/middlewear/validate-dto';
import cityDto from '../../reqBodyValidation/dtos/city';

const route = Router();

export default (app: Router) => {
  app.use('/cities', route);
  /**
   * @swagger
   * components:
   *   schemas:
   *     City:
   *       type: object
   *       required:
   *         - id
   *         - name
   *         - country
   *       properties:
   *         id:
   *           type: number
   *           description: The auto-generated id of the city
   *         name:
   *           type: string
   *           description: The city name
   *         country:
   *           type: string
   *           description: The country name
   *       example:
   *         id: 6
   *         name: Amsterdam
   *         country: the Netherlands
   *     CityArray:
   *       type: array
   *       items:
   *         type: object
   *         properties:
   *         id:
   *           type: number
   *           description: The auto-generated id of the city
   *         name:
   *           type: string
   *           description: The city name
   *         country:
   *           type: string
   *           description: The country name
   *         example:
   *           id: 6
   *           name: Amsterdam
   *           country: the Netherlands
   */

  /**
   * @swagger
   * tags:
   *   name: Cities
   *   description: Adventure Life Cities
   */

  /**
   * @swagger
   * /api/v1/cities:
   *   get:
   *     summary: Returns an array of all the cities
   *     tags: [Cities]
   *     responses:
   *       200:
   *         description: The cities were successfully retrieved
   *         content:
   *           application/json:
   *             schema:
   *                 type: array
   *                 items:
   *                  $ref: '#/components/schemas/CityArray'
   *
   *       404:
   *         description: Cities were not found
   *       500:
   *         description: An error occurred
   */
  route.get('/', CityController.listAllCities);

  /**
   * @swagger
   * /api/v1/cities/{id}:
   *   get:
   *     summary: Get city attributes with city_id
   *     tags: [Cities]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The city id
   *     responses:
   *       200:
   *         description: The city attributes
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/City'
   *       404:
   *         description: The city was not found
   *       500:
   *         description: An error occurred
   */
  route.get('/:id', CityController.getCityById);

  /**
   * @swagger
   * /api/v1/cities:
   *   post:
   *     summary: Create a new city
   *     tags: [Cities]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/City'
   *           example:
   *             name: Denver
   *             country: USA
   *     responses:
   *       200:
   *         description: The city was successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/City'
   *       404:
   *         description: The city was not found
   *       500:
   *         description: An error occurred
   */
  route.post('/', validateDto(cityDto), CityController.createCity);

  /**
   * @swagger
   * /api/v1/cities/{id}:
   *  patch:
   *    summary: Update city using city_id
   *    tags: [Cities]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: number
   *        required: true
   *        description: The city id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/City'
   *          example:
   *            name: Lisbon
   *    responses:
   *      200:
   *        description: The city was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/City'
   *      404:
   *        description: The city was not found
   *      500:
   *        description: An error occurred
   */
  route.patch('/:id', CityController.updateCityById);

  /**
   * @swagger
   * /api/v1/cities/{id}:
   *   delete:
   *     summary: Delete city using city_id
   *     tags: [Cities]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The city id
   *
   *     responses:
   *       200:
   *         description: The city was deleted
   *       404:
   *         description: The city was not found
   *       500:
   *         description: An error occurred
   */
  route.delete('/:id', CityController.deleteCityById);
};
