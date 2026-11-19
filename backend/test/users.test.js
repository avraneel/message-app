import request from "supertest";
import { beforeEach, describe, expect, test } from "vitest";
import app from "../app";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.message.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});

describe("/users route", () => {
  describe("POST /users", () => {
    test("responds with 201 and user details on sending valid username and password", async () => {
      const response = await request(app)
        .post("/users")
        .send({ username: "alice", password: "123" });
      expect(response.status).toBe(201);
      expect(response.body.username).toBe("alice");
      expect(await bcrypt.compare("123", response.body.password)).toBe(true);
    });

    test("responds with 409 on sending duplicate username", async () => {
      const response = await request(app)
        .post("/users")
        .send({ username: "alice", password: "123" });
      expect(response.status).toBe(201);
      const response2 = await request(app)
        .post("/users")
        .send({ username: "alice", password: "12345" });
      expect(response2.status).toBe(409);
    });
  });

  describe("PUT /users/:username/username", () => {
    test("responds with 401 if there is no cookie", async () => {
      const registerResponse = await request(app)
        .post("/users")
        .send({ username: "alice", password: "123" });
      expect(registerResponse.status).toBe(201);
      const putReponse = await request(app)
        .put("/users/alice/username")
        .send({ newUsername: "bob" });
      expect(putReponse.status).toBe(401);
    });
  });

  describe("PUT /users/:username/password", () => {
    test("responds with 401 if there is no cookie", async () => {
      const registerResponse = await request(app)
        .post("/users")
        .send({ username: "alice", password: "123" });
      expect(registerResponse.status).toBe(201);
    });
  });
});
