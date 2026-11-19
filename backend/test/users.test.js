import request from "supertest";
import { beforeEach, describe, expect, test } from "vitest";
import app from "../app";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.message.deleteMany(),
    prisma.session.deleteMany(),
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

    test("updates username with 200 with valid cookie", async () => {
      const registerResponse = await request(app)
        .post("/users")
        .send({ username: "alice", password: "123" });
      expect(registerResponse.status).toBe(201);
      const loginResponse = await request(app).post("/login").send({
        username: "alice",
        password: "123",
      });
      expect(loginResponse.status).toBe(200);
      const cookie = loginResponse.headers["set-cookie"];
      const putReponse = await request(app)
        .put(`/users/${loginResponse.body.user.id}/username`)
        .set("Cookie", [cookie])
        .send({ newUsername: "bob" });
      expect(putReponse.status).toBe(200);
    });
  });

  describe("PUT /users/:username/password", () => {
    test("responds with 401 if there is no cookie", async () => {
      const registerResponse = await request(app)
        .post("/users")
        .send({ username: "alice", password: "123" });
      expect(registerResponse.status).toBe(201);
      const putReponse = await request(app)
        .put("/users/alice/password")
        .send({ newPassword: "1234" });
      expect(putReponse.status).toBe(401);
    });

    test("updates password with 200 with valid cookie", async () => {
      const registerResponse = await request(app)
        .post("/users")
        .send({ username: "alice", password: "123" });
      expect(registerResponse.status).toBe(201);
      const loginResponse = await request(app).post("/login").send({
        username: "alice",
        password: "123",
      });
      expect(loginResponse.status).toBe(200);
      const cookie = loginResponse.headers["set-cookie"];
      const putReponse = await request(app)
        .put(`/users/${loginResponse.body.user.id}/password`)
        .set("Cookie", [cookie])
        .send({ newPassword: "1234" });
      expect(putReponse.status).toBe(200);
    });

    describe("GET routes", () => {
      test("/contact route", async () => {
        await request(app)
          .post("/users")
          .send({ username: "alice", password: "123" });
        await request(app)
          .post("/users")
          .send({ username: "bob", password: "123" });
        await request(app)
          .post("/users")
          .send({ username: "cat", password: "123" });
        await request(app)
          .post("/users")
          .send({ username: "delta", password: "123" });
        await request(app)
          .post("/users")
          .send({ username: "delta", password: "123" });
        const loginResponse = await request(app).post("/login").send({
          username: "alice",
          password: "123",
        });
        expect(loginResponse.status).toBe(200);
        const cookie = loginResponse.headers["set-cookie"];
        const getReponse = await request(app)
          .get(`/users/${loginResponse.body.user.id}/contacts`)
          .set("Cookie", [cookie]);
        expect(getReponse.status).toBe(200);
        expect(getReponse.body.map((el) => el.username)).toEqual([
          "bob",
          "cat",
          "delta",
        ]);
      });
      test("/:id route", async () => {
        await request(app)
          .post("/users")
          .send({ username: "alice", password: "123" });
        const loginResponse = await request(app).post("/login").send({
          username: "alice",
          password: "123",
        });
        const cookie = loginResponse.headers["set-cookie"];
        const getReponse = await request(app)
          .get(`/users/${loginResponse.body.user.id}/contacts`)
          .set("Cookie", [cookie]);
        expect(getReponse.status).toBe(200);
      });
    });
  });
});
