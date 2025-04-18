import * as express from 'express';
import logger from '../../loaders/logger';
import EventService from '../services/event';
import User from '../models/user';
import City from '../models/city';

export default {
  listEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
};

async function listEvents(req: express.Request, res: express.Response): Promise<void> {
  logger.debug(`Entering GET CONTROLLER - /events endpoint.`);
  const { cityId, userId } = req.query;

  try {
    if (cityId) {
      await getCityEvents(cityId as string, res);
    } else if (userId) {
      await getUserEvents(userId as string, res);
    } else {
      await getAllEvents(res);
    }
  } catch (err) {
    logger.error('❌ Error in listEvents controller', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getEventById(req: express.Request, res: express.Response): Promise<void> {
  logger.debug(`Entering GET BY ID CONTROLLER - /events/:id endpoint.`);
  try {
    const event = await EventService.getEventById(req.params.id);
    if (!event) {
      res.status(404).json({ error: 'No event found' });
    } else {
      res.json(event);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

async function createEvent(req: express.Request, res: express.Response): Promise<void> {
  logger.debug(`Entering CREATE CONTROLLER - /events endpoint.`);
  try {
    const newEvent = await EventService.createEvent(req.body);
    if (!newEvent) {
      res.status(400).json({ error: 'Event was not created' });
    } else {
      res.status(201).json(newEvent);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

async function updateEventById(req: express.Request, res: express.Response): Promise<void> {
  logger.debug(`Entering UPDATE CONTROLLER - /events/:id endpoint.`);
  try {
    const updatedEvent = await EventService.updateEventById(req.params.id, req.body);
    if (!updatedEvent) {
      res.status(404).json({ error: 'No event found' });
    } else {
      res.json(updatedEvent);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

async function deleteEventById(req: express.Request, res: express.Response): Promise<void> {
  logger.debug(`Entering DELETE CONTROLLER - /events/:id endpoint.`);
  try {
    const deletedEvent = await EventService.deleteEventById(req.params.id);
    if (!deletedEvent || deletedEvent.length === 0) {
      res.status(404).json({ error: 'No event found' });
    } else {
      logger.info('Event Deleted:', deletedEvent);
      res.json({ alert: 'Event Deleted', deletedEvent });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

//
// 🧩 Internal Helpers (module-scoped only)
//

async function getCityEvents(cityId: string, res: express.Response) {
  const city = await City.query().findById(cityId);
  if (!city) {
    res.status(404).json({ error: `City with id ${cityId} not found.` });
    return;
  }

  const events = await EventService.filterEventsByCityId(cityId);
  res.json(events);
}

async function getUserEvents(userId: string, res: express.Response) {
  const user = await User.query().findById(userId);
  if (!user) {
    res.status(404).json({ error: `User with id ${userId} not found.` });
    return;
  }

  const events = await EventService.filterEventsByUserId(userId);
  res.json(events);
}

async function getAllEvents(res: express.Response) {
  const events = await EventService.listAllEvents();
  if (!events || events.length === 0) {
    res.status(404).json({ error: 'No events found' });
    return;
  }
  res.json(events);
}
