import logger from '../../loaders/logger';
import Event from '../models/event';
import User from '../models/user';

export default {
  listAllEvents,
  getEventById,
  filterEventsByCityId,
  filterEventsByUserId,
  createEvent,
  updateEventById,
  deleteEventById,
};

/**
 * Returns an array of all events, sorted by date.
 * @returns {Promise<Event[]>} The events.
 */
async function listAllEvents() {
  logger.debug(`Entering GET DAO- events/ endpoint.`);
  return Event.query().column('id', 'title').orderBy('created_at', 'desc').withGraphFetched('city');
}

/**
 * Gets an event by ID.
 * @param {string} eventId - The ID of the event to get.
 * @returns {Promise<Event>} The event.
 */
async function getEventById(eventId: string) {
  logger.debug(`Entering GET BY ID DAO- events/ endpoint ${eventId}`);
  return Event.query().findById(eventId).column('id', 'title').withGraphFetched('city');
}

/**
 * Filters events by city ID.
 * @param {string} cityId - The ID of the city to filter by.
 * @returns {Promise<Event[]>} The events.
 */
async function filterEventsByCityId(cityId: string) {
  logger.debug(`Entering FILTER BY CITY DAO- events/ endpoint ${cityId}`);
  return Event.query().select('id', 'title', 'cityId').where('cityId', cityId);
}

/**
 * Filters events by user ID.
 * @param {string} userId - The ID of the user to filter by.
 * @returns {Promise<User>} The user, with their associated city and events.
 */
async function filterEventsByUserId(userId: string) {
  logger.debug(`Entering FILTER BY USER DAO- events/ endpoint ${userId}`);
  return User.query()
    .findById(userId)
    .column('id', 'firstName', 'lastName')
    .withGraphFetched('[city.[event]]');
}

/**
 * Creates a new event.
 * @param {Event} eventData - The event data.
 * @returns {Promise<Event>} The new event.
 */
async function createEvent(eventData: Event) {
  logger.debug(`Entering CREATE DAO- events/ endpoint ${eventData}`);
  const newEvent = await Event.query().insert({
    cityId: eventData.cityId,
    title: eventData.title,
  });
  return newEvent;
}

/**
 * Updates an event by ID.
 * @param {string} eventId - The ID of the event to update.
 * @param {Event} eventData - The new event data.
 * @returns {Promise<Event>} The updated event.
 */
async function updateEventById(eventId: string, eventData: Event) {
  logger.debug(`Entering UPDATE DAO- events/ endpoint ${eventData}`);
  const updatedEvent = await Event.query()
    .findById(eventId)
    .patch({
      cityId: eventData.cityId,
      title: eventData.title,
    })
    .returning('*');
  return updatedEvent;
}

/**
 * Deletes an event by ID.
 * @param {string} eventId - The ID of the event to delete.
 * @returns {Promise<Event>} The deleted event.
 */
async function deleteEventById(eventId: string) {
  logger.debug(`Entering DELETE BY ID DAO- events/ endpoint ${eventId}`);
  const deletedEvent = await Event.query().delete().where({ id: eventId }).returning('*');
  return deletedEvent;
}
