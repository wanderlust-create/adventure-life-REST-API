import request from 'supertest';
import createServer from '../loaders/server';
import EventService from '../api/services/event';
import CityService from '../api/services/city';
import UserService from '../api/services/user';
import { Server } from 'http';
const nonExistentId = '999999';
type EventSummary = {
  id: number;
  title: string;
  cityId: number;
};


const app = createServer();
let server: Server;

beforeAll(async () => {
  server = app.listen(8080);
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
});

describe('Event Controller', () => {
  describe('listEvents()', () => {
    it('returns 200 and the full list of events', async () => {
      const response = await request(app).get(`/api/v1/events`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('returns events filtered by cityId', async () => {
      const cities = await CityService.listAllCities();
      const cityId = cities[0].id;
      const response = await request(app).get(`/api/v1/events?cityId=${cityId}`);
      expect(response.status).toBe(200);
      const filteredEventsByCity = response.body;
      filteredEventsByCity.forEach((event: EventSummary) => {
        expect(event.cityId).toBe(cityId);
      });
    });

    it('returns events filtered by userId', async () => {
      const users = await UserService.listAllUsers();
      const userId = users[0].id;
      const response = await request(app).get(`/api/v1/events?userId=${userId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(userId);
      expect(response.body.city.length).toBeGreaterThan(0);
    });

    it('returns 404 when no events are returned', async () => {
      jest.spyOn(EventService, 'listAllEvents').mockResolvedValueOnce(undefined);
      const response = await request(app).get(`/api/v1/events`);
      expect(response.status).toBe(404);
    });
  });

  describe('getEventById()', () => {
    it('returns 200 and the requested event', async () => {
      const events = await EventService.listAllEvents();
      const eventId = events[0].id;
      const response = await request(app).get(`/api/v1/events/${eventId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(events[0].id);
      expect(response.body.title).toBe(events[0].title);
    });

    it('returns 404 when the evenId does not exist', async () => {
      const response = await request(app).get(`/api/v1/events/${nonExistentId}`);
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'No event found' });
    });
  });

  describe('createEvent()', () => {
    it('returns 201 and the created event', async () => {
      const cities = await CityService.listAllCities();
      const cityId = cities[0].id;
      const newEvent = { title: 'New Event', cityId: cityId };
      const response = await request(app)
        .post(`/api/v1/events`)
        .send(newEvent)
        .set('Accept', 'application/json');
      expect(response.status).toBe(201);
      expect(response.body.title).toBe('New Event');
      expect(response.body.cityId).toBe(String(cityId));
    });

    it('returns 400 if missing information when creating an event', async () => {
      const createEventServiceMock = jest
        .spyOn(EventService, 'createEvent')
        .mockResolvedValueOnce(undefined);
      const response = await request(app)
        .post(`/api/v1/events`)
        .send({})
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('title is a required field');
      expect(createEventServiceMock).not.toHaveBeenCalled();
    });
  });

  describe('updateEventById()', () => {
    it('returns 200 and the updated event', async () => {
      const events = await EventService.listAllEvents();
      const updatedEvent = { ...events[0], title: 'Updated Event' };
      const updatedEventId = updatedEvent.id;
      const response = await request(app)
        .patch(`/api/v1/events/${updatedEventId}`)
        .send(updatedEvent)
        .set('Accept', 'application/json');
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(updatedEventId);
      expect(response.body.title).toBe('Updated Event');
    });

    it('returns 404 when eventId does not exist', async () => {
      const response = await request(app)
        .patch(`/api/v1/events/${nonExistentId}`)
        .send({})
        .set('Accept', 'application/json');
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'No event found' });
    });
  });

  describe('deleteEventById()', () => {
    it('returns 200 and the deleted event', async () => {
      const events = await EventService.listAllEvents();
      const response = await request(app).delete(`/api/v1/events/${events[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body.deletedEvent[0].id).toBe(events[0].id);
    });

    it('returns 404 when the eventId does not exist', async () => {
      const response = await request(app).delete(`/api/v1/events/${nonExistentId}`);
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'No event found' });
    });
  });
});
