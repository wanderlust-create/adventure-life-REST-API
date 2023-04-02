import * as express from "express";
import request from "supertest";
import app from "../app";
import CityService from "../api/services/city";

let server: any;

beforeAll((done) => {
  server = app.listen(3000, () => {
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    done();
  });
});

describe("City Controller", () => {
  describe("listAllCities()", () => {
    it("should return 200 OK and all cities", async () => {
      const response = await request(app).get(`/api/v1/cities`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should return 404 Not Found when there are no cities", async () => {
      jest.spyOn(CityService, "listAllCities").mockResolvedValueOnce(undefined);
      const response = await request(app).get(`/api/v1/cities`);
      expect(response.status).toBe(404);
    });
  });

  describe("getCityById()", () => {
    it("should return 200 OK and the requested city", async () => {
      const cities = await CityService.listAllCities();
      const response = await request(app).get(`/api/v1/cities/${cities[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(cities[0].id);
    });

    it("should return 404 Not Found when the city with the given id does not exist", async () => {
      const response = await request(app).get(`/api/v1/cities/123`);
      expect(response.status).toBe(404);
    });
  });

  describe("createCity()", () => {
    it("should return 200 OK and the created city", async () => {
      const newCity = { name: "New City", country: "USA" };
      const response = await request(app)
        .post(`/api/v1/cities`)
        .send(newCity)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("New City");
    });

    it("should return 404 Not Found when the new city could not be created", async () => {
      jest.spyOn(CityService, "createCity").mockResolvedValueOnce(undefined);
      const response = await request(app)
        .post(`/api/v1/cities`)
        .send({})
        .set("Accept", "application/json");
      expect(response.status).toBe(404);
    });
  });

  describe("updateCityById()", () => {
    it("should return 200 OK and the updated city", async () => {
      const cities = await CityService.listAllCities();
      const updatedCity = { ...cities[0], name: "Updated City" };
      const response = await request(app)
        .put(`/api/v1/cities${updatedCity.id}`)
        .send(updatedCity)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Updated City");
    });

  //   it("should return 404 Not Found when the city with the given id does not exist", async () => {
  //     const response = await request(app)
  //       .put("/api/v1/cities/123")
  //       .send({})
  //       .set("Accept", "application/json");
  //     expect(response.status).toBe(404);
  //   });
  // });

  // describe("deleteCityById()", () => {
  //   it("should return 200 OK and the deleted city", async () => {
  //     const cities = await CityService.listAllCities();
  //     const response = await request(app).delete(
  //       `/api/v1/cities/${cities[0].id}`
  //     );
  //     expect(response.status).toBe(200);
  //     expect(response.body.deletedCity[0].id).toBe(cities[0].id);
  //   });

  //   it("should return 404 Not Found when the city with the given id does not exist", async () => {
  //     const response = await request(app).delete("/api/v1/cities/123");
  //     expect(response.status).toBe(404);
  //   });

  //   it("should return 404 Not Found when no city was deleted", async () => {
  //     jest.spyOn(CityService, "deleteCityById").mockResolvedValueOnce([]);
  //     const response = await request(app).delete("/api/v1/cities/1");
  //     expect(response.status).toBe(404);
  //   });
  // });
});
