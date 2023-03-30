import supertest from "supertest";
import createServer from "../loaders/server";

const app = createServer;

import * as utils from "../config/utils";
import config from "../config";

describe("Utility isInteger Method", () => {
  test("returns false if not an integer", () => {
    expect(utils.isInteger("abc9000")).toBe(false);
  });

  describe("GET /api/v1/cities", () => {
    it("should respond with an array of cities", async () => {
      const response = await supertest(app)
        .get(`/api/v1/cities`)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
