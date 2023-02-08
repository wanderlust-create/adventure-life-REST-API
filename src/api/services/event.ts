import Event from "api/models/event";
import EventDAO from "../daos/event";

export default {
  listAllEvents,
  getEventById,
  filterEventsByCityId,
  filterEventsByUserId,
  createEvent,
  updateEventById,
  deleteEventById,
};

function listAllEvents() {
  return EventDAO.listAllEvents();
}
function getEventById(id: string) {
  return EventDAO.getEventById(id);
}
function filterEventsByCityId(cityId: string) {
  return EventDAO.filterEventsByCityId(cityId);
}
function filterEventsByUserId(userId: string) {
  return EventDAO.filterEventsByUserId(userId);
}
function createEvent(eventDto: Event) {
  return EventDAO.createEvent(eventDto);
}
function updateEventById(id: string, eventDto: Event) {
  return EventDAO.updateEventById(id, eventDto);
}
function deleteEventById(id: string) {
  return EventDAO.deleteEventById(id);
}
