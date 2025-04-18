import { Router } from 'express';
import CityController from '../../controllers/city';
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
   *         - name
   *         - country
   *       properties:
   *         id:
   *           type: number
   *           description: The auto-generated ID of the city
   *         name:
   *           type: string
   *           description: The name of the city
   *         country:
   *           type: string
   *           description: The country the city belongs to
   *       example:
   *         id: 6
   *         name: Amsterdam
   *         country: the Netherlands
   *
   *     CityArray:
   *       type: array
   *       items:
   *         $ref: '#/components/schemas/City'
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
   *     summary: Get a list of all cities
   *     tags: [Cities]
   *     responses:
   *       200:
   *         description: List of cities retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CityArray'
   *       404:
   *         description: No cities found
   *       500:
   *         description: Server error
   */
  route.get('/', CityController.listAllCities);

  /**
   * @swagger
   * /api/v1/cities/{id}:
   *   get:
   *     summary: Get a specific city by ID
   *     tags: [Cities]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: City ID
   *     responses:
   *       200:
   *         description: City found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/City'
   *       404:
   *         description: City not found
   *       500:
   *         description: Server error
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
   *       201:
   *         description: City created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/City'
   *       400:
   *         description: Validation error
   *       500:
   *         description: Server error
   */
  route.post('/', validateDto(cityDto), CityController.createCity);

  /**
   * @swagger
   * /api/v1/cities/{id}:
   *   patch:
   *     summary: Update a city by ID
   *     tags: [Cities]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: City ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/City'
   *           example:
   *             name: Lisbon
   *     responses:
   *       200:
   *         description: City updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/City'
   *       404:
   *         description: City not found
   *       500:
   *         description: Server error
   */
  route.patch('/:id', CityController.updateCityById);

  /**
   * @swagger
   * /api/v1/cities/{id}:
   *   delete:
   *     summary: Delete a city by ID
   *     tags: [Cities]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: City ID
   *     responses:
   *       200:
   *         description: City deleted successfully
   *       404:
   *         description: City not found
   *       500:
   *         description: Server error
   */
  route.delete('/:id', CityController.deleteCityById);
};
