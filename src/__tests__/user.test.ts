import request from 'supertest';
import createServer from '../loaders/server';
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
  describe('listAllUsers()', () => {
    it('returns 200 and the full list of users', async () => {
      const response = await request(baseUrl).get(`/api/v1/users`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('returns 404 when there are no users', async () => {
      jest.spyOn(UserService, 'listAllUsers').mockResolvedValueOnce(undefined);
      const response = await request(baseUrl).get(`/api/v1/users`);
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'No users found' });
    });
  });

  describe('getUserById()', () => {
    it('returns 200 and the requested user', async () => {
      const users = await UserService.listAllUsers();
      const userId = users[0].id;
      const response = await request(baseUrl).get(`/api/v1/users/${userId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(users[0].id);
      expect(response.body.firstName).toBe(users[0].firstName);
    });

    it('returns 404 when the userId does not exist', async () => {
      const response = await request(baseUrl).get(`/api/v1/users/123`);
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'No user found' });
    });
  });

  describe('createUser()', () => {
    it('returns 201 and the created user', async () => {
      const newUser = {
        firstName: 'New User First',
        lastName: 'New User Last',
        email: 'newUser@email.com',
      };
      const response = await request(baseUrl)
        .post(`/api/v1/users`)
        .send(newUser)
        .set('Accept', 'application/json');
      expect(response.status).toBe(201);
      expect(response.body.email).toBe('newUser@email.com');
    });

    it('returns 400 if missing information when creating a user', async () => {
      const createUserServiceMock = jest
        .spyOn(UserService, 'createUser')
        .mockResolvedValueOnce(undefined);
      const response = await request(baseUrl)
        .post(`/api/v1/users`)
        .send({})
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('email is a required field');
      expect(createUserServiceMock).not.toHaveBeenCalled();
    });
  });

  describe('updateUserById()', () => {
    it('returns 200 and the updated user', async () => {
      const users = await UserService.listAllUsers();
      const updatedUser = { ...users[0], email: 'newUpdatedEmail@email.com' };
      const updatedUserId = updatedUser.id;
      const response = await request(baseUrl)
        .patch(`/api/v1/users/${updatedUserId}`)
        .send(updatedUser)
        .set('Accept', 'application/json');
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(updatedUserId);
      expect(response.body.email).toBe('newUpdatedEmail@email.com');
    });

    it('returns 404 No User Found when userId does not exist', async () => {
      const response = await request(baseUrl)
        .patch('/api/v1/users/123')
        .send({})
        .set('Accept', 'application/json');
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'No user found' });
    });
  });
  
  describe('deleteUserById()', () => {
    it('returns 200 and the deleted user', async () => {
      const users = await UserService.listAllUsers();
      const response = await request(baseUrl).delete(`/api/v1/users/${users[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body.deletedUser[0].id).toBe(users[0].id);
    });

    it('returns 404 Not when the userId does not exist', async () => {
      const response = await request(baseUrl).delete('/api/v1/users/123');
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: 'No user found' });
    });
  });
});
