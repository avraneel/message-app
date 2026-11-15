import request from "supertest";
import app from "../app.js";

describe("userRoutes", () => {
  test("GET /users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toEqual(200);
  });
});
