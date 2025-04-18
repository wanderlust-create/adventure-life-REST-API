import request from 'supertest';
import createServer from '../loaders/server';
import CityService from '../api/services/city';
import { Server } from 'http';
import { AddressInfo } from 'net';

const app = createServer();
let server: Server;
let baseUrl: string;

beforeAll(async () => {
  server = app.listen(0); // 0 = random available port
  const address = server.address() as AddressInfo;
  baseUrl = `http://localhost:${address.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
});

describe('City Controller', () => {
  describe('listAllCities()', () => {
    it('returns 200 and the full list of cities', async () => {
      const response = await request(baseUrl).get(`/api/v1/cities`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('returns 404 when no cities found', async () => {
      jest.spyOn(CityService, 'listAllCities').mockResolvedValueOnce(undefined);
      const response = await request(baseUrl).get(`/api/v1/cities`);
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'No cities found' });
    });
  });

  describe('getCityById()', () => {
    it('returns 200 and the requested city', async () => {
      const cities = await CityService.listAllCities();
      const cityId = cities[0].id;
      const response = await request(baseUrl).get(`/api/v1/cities/${cityId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(cities[0].id);
      expect(response.body.name).toBe(cities[0].name);
    });

    it('returns 404 when the cityId does not exist', async () => {
      const response = await request(baseUrl).get(`/api/v1/cities/123`);
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'No city found' });
    });
  });

  describe('createCity()', () => {
    it('returns 201 and the created city', async () => {
      const newCity = { name: 'New City', country: 'USA' };
      const response = await request(baseUrl)
        .post(`/api/v1/cities`)
        .send(newCity)
        .set('Accept', 'application/json');
      expect(response.status).toBe(201);
      expect(response.body.name).toBe('New City');
    });

    it('returns 400 if missing information when creating a city', async () => {
      const createCityServiceMock = jest
        .spyOn(CityService, 'createCity')
        .mockResolvedValueOnce(undefined);
      const response = await request(baseUrl)
        .post(`/api/v1/cities`)
        .send({})
        .set('Accept', 'application/json');
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toEqual(
        expect.arrayContaining(['name is a required field', 'country is a required field'])
      );
      expect(createCityServiceMock).not.toHaveBeenCalled();
    });
  });

  describe('updateCityById()', () => {
    it('returns 200 and the updated city', async () => {
      const cities = await CityService.listAllCities();
      const updatedCity = { ...cities[0], name: 'Updated City' };
      const updatedCityId = updatedCity.id;
      const response = await request(baseUrl)
        .patch(`/api/v1/cities/${updatedCityId}`)
        .send(updatedCity)
        .set('Accept', 'application/json');
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(updatedCityId);
      expect(response.body.name).toBe('Updated City');
    });

    it('returns 404 No City Found when when citytId does not exist', async () => {
      const response = await request(baseUrl)
        .patch('/api/v1/cities/123')
        .send({})
        .set('Accept', 'application/json');
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'No city found' });
    });
  });

  describe('deleteCityById()', () => {
    it('returns 200 and the deleted city', async () => {
      const cities = await CityService.listAllCities();
      const response = await request(baseUrl).delete(`/api/v1/cities/${cities[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body.deletedCity[0].id).toBe(cities[0].id);
    });

    it('returns 404 when the cityId does not exist', async () => {
      const response = await request(baseUrl).delete('/api/v1/cities/123');
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'No city found' });
    });

    it('returns 404 when no city was deleted', async () => {
      jest.spyOn(CityService, 'deleteCityById').mockResolvedValueOnce([]);
      const response = await request(baseUrl).delete('/api/v1/cities/1');
      expect(response.status).toBe(404);
    });
  });
});
