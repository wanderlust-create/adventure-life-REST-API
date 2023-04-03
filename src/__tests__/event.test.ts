import request from "supertest";
import createServer from "../loaders/server";
import EventService from "../api/services/event";
import CityService from "../api/services/city";
import UserService from "../api/services/user";

import logger from "../loaders/logger";

let app = createServer();
let server: any;

beforeAll((done) => {
  server = app.listen(8080, () => {
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    done();
  });
});

describe("Event Controller", () => {
  describe("listEvents()", () => {
    it("should return 200 OK and a list of all events", async () => {
      const response = await request(app).get(`/api/v1/events`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
    it("should return a filtered list of events by cityId", async () => {
      const cities = await CityService.listAllCities();
      const cityId = cities[0].id;
      const response = await request(app).get(
        `/api/v1/events?cityId=${cityId}`
      );
      expect(response.status).toEqual(200);
      const filteredEventsByCity = response.body;
      filteredEventsByCity.forEach((event: any) => {
        expect(event.cityId).toEqual(cityId);
      });
    });
    it("should return a filtered list of events by userId", async () => {
      const users = await UserService.listAllUsers();
      const userId = users[0].id;
      const response = await request(app).get(
        `/api/v1/events?userId=${userId}`
      );
      expect(response.status).toEqual(200);
      expect(response.body.id).toEqual(userId);
      expect(response.body.city.length).toBeGreaterThan(0);
    });
    it("should return 404 Not Found when there are no events", async () => {
      jest
        .spyOn(EventService, "listAllEvents")
        .mockResolvedValueOnce(undefined);
      const response = await request(app).get(`/api/v1/events`);
      expect(response.status).toBe(404);
    });
  });
  describe("getEventById()", () => {
    it("should return 200 OK and the requested event", async () => {
      const events = await EventService.listAllEvents();
      const eventId = events[0].id;
      const response = await request(app).get(`/api/v1/events/${eventId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(events[0].id);
      expect(response.body.title).toBe(events[0].title);
    });

    it("should return 404 Not Found when the event with the given id does not exist", async () => {
      const response = await request(app).get(`/api/v1/events/123`);
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: "No event found" });
    });
  });
  describe("createEvent()", () => {
    it("should return 200 OK and the created event", async () => {
      const cities = await CityService.listAllCities();
      const cityId = cities[0].id;
      const newEvent = { title: "New Event", cityId: cityId };
      const response = await request(app)
        .post(`/api/v1/events`)
        .send(newEvent)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body.title).toBe("New Event");
      expect(response.body.cityId).toBe(String(cityId));
    });

    it("should return 400 Error when required information is not provided when creating a new event", async () => {
      const createEventServiceMock = jest
        .spyOn(EventService, "createEvent")
        .mockResolvedValueOnce(undefined);
      const response = await request(app)
        .post(`/api/v1/events`)
        .send({})
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("title is a required field");
      expect(createEventServiceMock).not.toHaveBeenCalled();
    });
  });
  describe("updateEventById()", () => {
    it("should return 200 OK and the updated event", async () => {
      const events = await EventService.listAllEvents();
      const updatedEvent = { ...events[0], title: "Updated Event" };
      const updatedEventId = updatedEvent.id;
      const response = await request(app)
        .patch(`/api/v1/events/${updatedEventId}`)
        .send(updatedEvent)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(updatedEventId);
      expect(response.body.title).toBe("Updated Event");
    });

    it("should return 404 No Event Found when the event with the given id does not exist", async () => {
      const response = await request(app)
        .patch("/api/v1/events/123")
        .send({})
        .set("Accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: "No event found" });
    });
  });
  describe("deleteEventById()", () => {
    it("should return 200 OK and the deleted event", async () => {
      const events = await EventService.listAllEvents();
      const response = await request(app).delete(
        `/api/v1/events/${events[0].id}`
      );
      expect(response.status).toBe(200);
      expect(response.body.deletedEvent[0].id).toBe(events[0].id);
    });

    it("should return 404 Not Found when the event with the given id does not exist", async () => {
      const response = await request(app).delete("/api/v1/events/123");
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: "No event found" });
    });
  });
});
