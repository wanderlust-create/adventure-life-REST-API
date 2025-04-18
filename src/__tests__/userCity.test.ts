import request from 'supertest';
import createServer from '../loaders/server';
import UserCityService from '../api/services/userCity';
import CityService from '../api/services/city';
import UserService from '../api/services/user';
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

describe('User Controller', () => {
  describe('listAllUserCities()', () => {
    it('returns 200 and a list of all userCities', async () => {
      const response = await request(baseUrl).get(`/api/v1/user-cities`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('returns 404 when no userCities found', async () => {
      jest.spyOn(UserCityService, 'listAllUserCities').mockResolvedValueOnce(undefined);
      const response = await request(baseUrl).get(`/api/v1/user-cities`);
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'No user-cities found' });
    });
  });

  describe('createUserCity()', () => {
    it('returns 201 and the created userCity', async () => {
      const cities = await CityService.listAllCities();
      const cityId = cities[0].id;
      const users = await UserService.listAllUsers();
      const userId = users[0].id;
      const newUserCity = {
        cityId: cityId,
        userId: userId,
      };
      const response = await request(baseUrl)
        .post(`/api/v1/user-cities`)
        .send(newUserCity)
        .set('Accept', 'application/json');
      expect(response.status).toBe(201);
      expect(response.body.cityId).toBe(String(cityId));
      expect(response.body.userId).toBe(String(userId));
    });

    it('returns 400 if missing information when creating a userCity', async () => {
      const createUserCityServiceMock = jest
        .spyOn(UserCityService, 'createUserCity')
        .mockResolvedValueOnce(undefined);
      const response = await request(baseUrl)
        .post(`/api/v1/user-cities`)
        .send({})
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('cityId is a required field');
      expect(createUserCityServiceMock).not.toHaveBeenCalled();
    });
  });

  describe('deleteUserCityById()', () => {
    it('returns 200 and the deleted userCity', async () => {
      const userCities = await UserCityService.listAllUserCities();
      const response = await request(baseUrl).delete(`/api/v1/user-cities/${userCities[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body.deletedUserCity[0].id).toBe(userCities[0].id);
    });

    it('returns 404 when the userId does not exist', async () => {
      const response = await request(baseUrl).delete('/api/v1/user-cities/123');
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'User-city not found' });
    });
  });
});
