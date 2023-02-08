import { NextFunction, Request, Response, Router } from "express";
import EventController from "../../controllers/event";

// Error Handlers
import validateDto from "../../reqBodyValidation/middlewear/validate-dto";
import eventDto from "../../reqBodyValidation/dtos/event";

const route = Router();
export default (app: Router) => {
  app.use("/events", route);

  /**
   * @swagger
   * components:
   *   schemas:
   *     Event:
   *       type: object
   *       required:
   *         - id
   *         - city_id
   *         - title
   *       properties:
   *         id:
   *           type: number
   *           description: The auto-generated id of the event
   *         city_id:
   *           type: number
   *           description: The foreign key for the city
   *         title:
   *           type: string
   *           description: The event title
   *         imdbRating:
   *           type: number
   *           description: The event's IMDb rating
   *       example:
   *         id: 22
   *         city_id: 1
   *         title: Zoey's Extraordinary Playlist
   *         imdbRating: 8.1
   *     EventArray:
   *       type: array
   *       items:
   *         type: object
   *         properties:
   *         id:
   *           type: number
   *           description: The auto-generated id of the event
   *         city_id:
   *           type: number
   *           description: The id of the city the event belongs to
   *         title:
   *           type: string
   *           description: The event title
   *         ibmdRating:
   *           type: number
   *           description: The event IMBd rating
   *         example: {
   *           id: 22,
   *           city_id: 1,
   *           title: Zoey's Extraordinary Playlist,
   *           imdbRating: 8.1}
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
   *     summary: Returns an array of all the events. Can be filtered using a user_id or city_id in parameters
   *     tags: [Events]
   *     parameters:
   *       - in: query
   *         name: city_id
   *         schema:
   *           type: number
   *         description: Choose only one option- city or user filter. When included events will be filtered by the city_id.
   *       - in: query
   *         name: user_id
   *         schema:
   *           type: number
   *         description: Choose only one option- city or user filter. When included events will be filtered by the user_id
   *     responses:
   *       200:
   *         description: The events were successfully retrieved
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/EventArray'
   *       404:
   *         description: Events were not found
   *       500:
   *         description: An error occurred
   */
  route.get("/", EventController.listEvents);

  /**
   * @swagger
   * /api/v1/events/{id}:
   *   get:
   *     summary: Get event attributes with event_id
   *     tags: [Events]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The event id
   *     responses:
   *       200:
   *         description: The event attributes
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Event'
   *       404:
   *         description: The event was not found
   *       500:
   *         description: An error occurred
   */
  route.get("/:id", EventController.getEventById);

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
   *             title: Zoey's Extraordinary Playlist
   *             cityId: 8
   *             imdbRating: 8.1
   *     responses:
   *       200:
   *         description: The event was successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Event'
   *       404:
   *         description: The event was not found
   *       500:
   *         description: An error occurred
   */
  route.post("/", validateDto(eventDto), EventController.createEvent);

  /**
   * @swagger
   * /api/v1/events/{id}:
   *  patch:
   *    summary: Update event using event_id
   *    tags: [Events]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: number
   *        required: true
   *        description: The event id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Event'
   *          example:
   *             imbdRating: 9.2
   *    responses:
   *      200:
   *        description: The event was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Event'
   *      404:
   *        description: The event was not found
   *      500:
   *        description: An error occurred
   */
  route.patch("/:id", EventController.updateEventById);

  /**
   * @swagger
   * /api/v1/events/{id}:
   *   delete:
   *     summary: Delete event using event_id
   *     tags: [Events]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The event id
   *     responses:
   *       200:
   *         description: The event was deleted
   *       404:
   *         description: The event was not found
   *       500:
   *         description: An error occurred
   */
  route.delete("/:id", EventController.deleteEventById);
};
