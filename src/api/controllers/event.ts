import * as express from "express";
import logger from "../../loaders/logger";
import EventService from "../services/event";
import Event from "../models/event";
import User from "../models/user";

export default {
  listEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
};

async function listEvents(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering GET CONTROLLER - events/ endpoint.`);
  type ReturnValue = User | Event[];
  let events: ReturnValue = [];
  if (req.query.city_id) {
    let cityId = req.query.city_id as string;
    events = await EventService.filterEventsByCityId(cityId);
  } else if (req.query.user_id) {
    let userId = req.query.user_id as string;
    events = await EventService.filterEventsByUserId(userId);
  } else {
    events = await EventService.listAllEvents();
  }
  try {
    if (!events) {
      res.status(404).json({ error: `No events found` });
      return;
    } else {
      res.json(events);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
}
async function getEventById(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering GET BY ID CONTROLLER - events/ endpoint.`);
  const event = await EventService.getEventById(req.params.id);
  try {
    if (event === undefined) {
      res.status(404).json({ error: "No event found" });
      return;
    } else {
      res.json(event);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
async function createEvent(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering CREATE CONTROLLER - events/ endpoint.`);
  const newEvent = await EventService.createEvent(req.body);
  try {
    if (newEvent === undefined) {
      res.status(404).json({ error: "Event was not created" });
      return;
    } else {
      res.json(newEvent);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
async function updateEventById(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering UPDATE CONTROLLER - events/ endpoint.`);
  const id = req.params.id;
  const updatedEvent = await EventService.updateEventById(id, req.body);
  try {
    if (!updatedEvent) {
      res.status(404).json({ error: "No event found" });
      return;
    } else {
      res.json(updatedEvent);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
async function deleteEventById(
  req: express.Request,
  res: express.Response
): Promise<void> {
  logger.debug(`Entering DELETE CONTROLLER - events/ endpoint.`);
  try {
    const id = req.params.id;
    const deletedEvent = await EventService.deleteEventById(id);
    if (deletedEvent.length === 0) {
      res.sendStatus(404).json({ error: "No event deleted" });
      return;
    } else {
      logger.info("Event Deleted:", deletedEvent);
      res.json({ alert: "Event Deleted", deletedEvent });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
