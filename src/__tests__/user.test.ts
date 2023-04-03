import request from "supertest";
import createServer from "../loaders/server";
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

describe("User Controller", () => {
  describe("listAllUsers()", () => {
    it("should return 200 OK and all users", async () => {
      const response = await request(app).get(`/api/v1/users`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should return 404 Not Found when there are no users", async () => {
      jest.spyOn(UserService, "listAllUsers").mockResolvedValueOnce(undefined);
      const response = await request(app).get(`/api/v1/users`);
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: "No users found" });
    });
  });
  describe("getUserById()", () => {
    it("should return 200 OK and the requested user", async () => {
      const users = await UserService.listAllUsers();
      const userId = users[0].id;
      const response = await request(app).get(`/api/v1/users/${userId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(users[0].id);
      expect(response.body.firstName).toBe(users[0].firstName);
    });

    it("should return 404 Not Found when the user with the given id does not exist", async () => {
      const response = await request(app).get(`/api/v1/users/123`);
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: "No user found" });
    });
  });
  describe("createUser()", () => {
    it("should return 200 OK and the created user", async () => {
      const newUser = { firstName: "New User First", lastName: "New User Last", email: "newUser@email.com" };
      const response = await request(app)
        .post(`/api/v1/users`)
        .send(newUser)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body.email).toBe("newUser@email.com");
    });

    it("should return 400 Error when required information is not provided when creating a new user", async () => {
      const createUserServiceMock = jest
        .spyOn(UserService, "createUser")
        .mockResolvedValueOnce(undefined);
      const response = await request(app)
        .post(`/api/v1/users`)
        .send({})
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("email is a required field");
      expect(createUserServiceMock).not.toHaveBeenCalled();
    });
  });
  describe("updateUserById()", () => {
    it("should return 200 OK and the updated user", async () => {
      const users = await UserService.listAllUsers();
      const updatedUser = { ...users[0], email: "newUpdatedEmail@email.com" };
      const updatedUserId = updatedUser.id;
      const response = await request(app)
        .patch(`/api/v1/users/${updatedUserId}`)
        .send(updatedUser)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(updatedUserId);
      expect(response.body.email).toBe("newUpdatedEmail@email.com");
    });

    it("should return 404 No User Found when the user with the given id does not exist", async () => {
      const response = await request(app)
        .patch("/api/v1/users/123")
        .send({})
        .set("Accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: "No user found" });
    });
  });
  describe("deleteUserById()", () => {
    it("should return 200 OK and the deleted user", async () => {
      const users = await UserService.listAllUsers();
      const response = await request(app).delete(
        `/api/v1/users/${users[0].id}`
      );
      expect(response.status).toBe(200);
      expect(response.body.deletedUser[0].id).toBe(users[0].id);
    });

    it("should return 404 Not Found when the user with the given id does not exist", async () => {
      const response = await request(app).delete("/api/v1/users/123");
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({ error: "No user found" });
    });
  });
});
