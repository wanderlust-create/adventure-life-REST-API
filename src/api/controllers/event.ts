import { Request, Response } from 'express';
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

async function listEvents(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ GET /events');

  const { cityId, userId } = req.query;

  try {
    if (cityId) return await getCityEvents(cityId as string, res);
    if (userId) return await getUserEvents(userId as string, res);
    return await getAllEvents(res);
  } catch (err) {
    logger.error('❌ Error in listEvents()', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getEventById(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ GET /events/:id');
  try {
    const event = await EventService.getEventById(req.params.id);
    if (!event) {
      res.status(404).json({ error: 'No event found' });
    } else {
      res.json(event);
    }
  } catch (err) {
    logger.error('❌ Error in getEventById()', err);
    res.status(500).json(err);
  }
}

async function createEvent(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ POST /events');
  try {
    const newEvent = await EventService.createEvent(req.body);
    if (!newEvent) {
      res.status(400).json({ error: 'Event was not created' });
    } else {
      res.status(201).json(newEvent);
    }
  } catch (err) {
    logger.error('❌ Error in createEvent()', err);
    res.status(500).json(err);
  }
}

async function updateEventById(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ PATCH /events/:id');
  try {
    const updatedEvent = await EventService.updateEventById(req.params.id, req.body);
    if (!updatedEvent) {
      res.status(404).json({ error: 'No event found' });
    } else {
      res.json(updatedEvent);
    }
  } catch (err) {
    logger.error('❌ Error in updateEventById()', err);
    res.status(500).json(err);
  }
}

async function deleteEventById(req: Request, res: Response): Promise<void> {
  logger.debug('➡️ DELETE /events/:id');
  try {
    const deletedEvent = await EventService.deleteEventById(req.params.id);
    if (!deletedEvent || deletedEvent.length === 0) {
      res.status(404).json({ error: 'No event found' });
    } else {
      logger.info('🗑️ Event Deleted:', deletedEvent);
      res.json({ alert: 'Event Deleted', deletedEvent });
    }
  } catch (err) {
    logger.error('❌ Error in deleteEventById()', err);
    res.status(500).json(err);
  }
}

//
// 🧩 Internal Helpers (module-scoped only)
//

async function getCityEvents(cityId: string, res: Response) {
  const city = await City.query().findById(cityId);
  if (!city) {
    res.status(404).json({ error: `City with id ${cityId} not found.` });
    return;
  }

  const events = await EventService.filterEventsByCityId(cityId);
  res.json(events);
}

async function getUserEvents(userId: string, res: Response) {
  const user = await User.query().findById(userId);
  if (!user) {
    res.status(404).json({ error: `User with id ${userId} not found.` });
    return;
  }

  const events = await EventService.filterEventsByUserId(userId);
  res.json(events);
}

async function getAllEvents(res: Response) {
  const events = await EventService.listAllEvents();
  if (!events || events.length === 0) {
    res.status(404).json({ error: 'No events found' });
    return;
  }
  res.json(events);
}
