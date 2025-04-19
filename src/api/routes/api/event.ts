import { Router } from 'express';
import EventController from '../../controllers/event';
import validateDto from '../../reqBodyValidation/middlewear/validate-dto';
import eventDto from '../../reqBodyValidation/dtos/event';

const route = Router();

export default (app: Router) => {
  app.use('/events', route);

  /**
   * @swagger
   * components:
   *   schemas:
   *     Event:
   *       type: object
   *       required:
   *         - title
   *         - cityId
   *       properties:
   *         id:
   *           type: number
   *           description: Auto-generated ID of the event
   *         title:
   *           type: string
   *           description: Event title
   *         cityId:
   *           type: number
   *           description: Foreign key referencing the city
   *       example:
   *         id: 19
   *         title: Basilica de Santa Maria de Guadalupe
   *         cityId: 5
   *
   *     EventArray:
   *       type: array
   *       items:
   *         $ref: '#/components/schemas/Event'
   */

  /**
   * @swagger
   * tags:
   *   name: Events
   *   description: Adventure Life Events
   */

  /**
   * @swagger
   * /api/v1/events:
   *   get:
   *     summary: Get all events (optionally filter by userId or cityId)
   *     tags: [Events]
   *     parameters:
   *       - in: query
   *         name: cityId
   *         schema:
   *           type: number
   *         description: Filter events by city ID
   *       - in: query
   *         name: userId
   *         schema:
   *           type: number
   *         description: Filter events by user ID
   *     responses:
   *       200:
   *         description: Events retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/EventArray'
   *       404:
   *         description: No events found
   *       500:
   *         description: Server error
   */
  route.get('/', EventController.listEvents);

  /**
   * @swagger
   * /api/v1/events/{id}:
   *   get:
   *     summary: Get a single event by ID
   *     tags: [Events]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: Event ID
   *     responses:
   *       200:
   *         description: Event retrieved
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Event'
   *       404:
   *         description: Event not found
   *       500:
   *         description: Server error
   */
  route.get('/:id', EventController.getEventById);

  /**
   * @swagger
   * /api/v1/events:
   *   post:
   *     summary: Create a new event
   *     tags: [Events]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Event'
   *           example:
   *             title: The Amber Museum
   *             cityId: 3
   *     responses:
   *       201:
   *         description: Event created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Event'
   *       400:
   *         description: Validation error
   *       500:
   *         description: Server error
   */
  route.post('/', validateDto(eventDto), EventController.createEvent);

  /**
   * @swagger
   * /api/v1/events/{id}:
   *   patch:
   *     summary: Update an event by ID
   *     tags: [Events]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: Event ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Event'
   *           example:
   *             title: The Jade Museum
   *     responses:
   *       200:
   *         description: Event updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Event'
   *       404:
   *         description: Event not found
   *       500:
   *         description: Server error
   */
  route.patch('/:id', EventController.updateEventById);

  /**
   * @swagger
   * /api/v1/events/{id}:
   *   delete:
   *     summary: Delete an event by ID
   *     tags: [Events]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: Event ID
   *     responses:
   *       200:
   *         description: Event deleted successfully
   *       404:
   *         description: Event not found
   *       500:
   *         description: Server error
   */
  route.delete('/:id', EventController.deleteEventById);
};
