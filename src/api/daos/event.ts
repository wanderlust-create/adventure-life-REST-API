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
 * Returns all events, sorted by creation date.
 */
async function listAllEvents(): Promise<Event[]> {
  logger.debug('➡️ DAO: GET /events');
  return Event.query().select('id', 'title').orderBy('created_at', 'desc').withGraphFetched('city');
}

/**
 * Gets an event by ID.
 * @param eventId The ID of the event.
 */
async function getEventById(eventId: string): Promise<Event | undefined> {
  logger.debug(`➡️ DAO: GET /events/${eventId}`);
  return Event.query().findById(eventId).select('id', 'title').withGraphFetched('city');
}

/**
 * Filters events by city ID.
 * @param cityId The ID of the city.
 */
async function filterEventsByCityId(cityId: string): Promise<Event[]> {
  logger.debug(`➡️ DAO: GET /events?cityId=${cityId}`);
  return Event.query().select('id', 'title', 'cityId').where('cityId', cityId);
}

/**
 * Filters events by user ID.
 * @param userId The ID of the user.
 */
async function filterEventsByUserId(userId: string): Promise<User | undefined> {
  logger.debug(`➡️ DAO: GET /events?userId=${userId}`);
  return User.query()
    .findById(userId)
    .select('id', 'firstName', 'lastName')
    .withGraphFetched('city.event');
}

/**
 * Creates a new event.
 * @param eventData The event to create.
 */
async function createEvent(eventData: Event): Promise<Event> {
  logger.debug('➡️ DAO: POST /events', eventData);
  return Event.query().insert({
    cityId: eventData.cityId,
    title: eventData.title,
  });
}

/**
 * Updates an event by ID.
 * @param eventId The ID of the event to update.
 * @param eventData The updated event data.
 */
async function updateEventById(eventId: string, eventData: Event) {
  logger.debug(`➡️ DAO: PATCH /events/${eventId}`, eventData);
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
 * @param eventId The ID of the event to delete.
 */
async function deleteEventById(eventId: string): Promise<Event[]> {
  logger.debug(`➡️ DAO: DELETE /events/${eventId}`);
  const deletedEvent = await Event.query().delete().where({ id: eventId }).returning('*');
  return deletedEvent;
}
