import logger from "../../loaders/logger";
import Event from "../models/event";
import User from "../models/user";

export default {
  listAllEvents,
  getEventById,
  filterEventsByCityId,
  filterEventsByUserId,
  createEvent,
  updateEventById,
  deleteEventById,
};

async function listAllEvents() {
  logger.debug(`Entering GET DAO- events/ endpoint.`);
  return Event.query()
    .column("id", "title")
    .orderBy("created_at", "desc")
    .withGraphFetched("city");
}
async function getEventById(id: string) {
  logger.debug(`Entering GET BY ID DAO- events/ endpoint ${id}`);
  return Event.query()
    .findById(id)
    .column("id", "title")
    .withGraphFetched("city");
}
async function filterEventsByCityId(cityId: string) {
  logger.debug(`Entering FILTER BY NETWORK DAO- events/ endpoint ${cityId}`);
  return Event.query().select("id", "title").where("cityId", cityId);
}
async function filterEventsByUserId(userId: string) {
  logger.debug(`Entering FILTER BY PACKAGE DAO- events/ endpoint ${userId}`);
  return User.query()
    .findById(userId)
    .column("id", "firstName", "lastName")
    .withGraphFetched("[city.[event]]");
}
async function createEvent(eventDto: Event) {
  logger.debug(`Entering CREATE DAO- events/ endpoint ${eventDto}`);
  const newEvent = await Event.query().insert({
    cityId: eventDto.cityId,
    title: eventDto.title,
  });
  return newEvent;
}
async function updateEventById(id: string, eventDto: Event) {
  logger.debug(`Entering UPDATE DAO- events/ endpoint ${eventDto}`);
  const updatedEvent = await Event.query()
    .findById(id)
    .patch({
      cityId: eventDto.cityId,
      title: eventDto.title,
    })
    .returning("*");
  return updatedEvent;
}
async function deleteEventById(id: string) {
  logger.debug(`Entering DELETE BY ID DAO- events/ endpoint ${id}`);
  const deletedEvent = await Event.query()
    .delete()
    .where({ id })
    .returning("*");
  return deletedEvent;
}
