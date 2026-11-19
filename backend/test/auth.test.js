import request from "supertest";
import { beforeEach, describe, expect, test } from "vitest";
import app from "../app";
import prisma from "../lib/prisma.js";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.message.deleteMany(),
    prisma.session.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});

describe("/login route", () => {
  test("returns a cookie on successful login", async () => {
    const registerResponse = await request(app)
      .post("/users")
      .send({ username: "alice", password: "123" });
    expect(registerResponse.status).toBe(201);
    const response = await request(app)
      .post("/login")
      .send({ username: "alice", password: "123" });
    expect(response.status).toBe(200);
    console.log(response.get("Set-Cookie"));
  });

  test("returns 401 on unsuccessful login", async () => {
    const registerResponse = await request(app)
      .post("/users")
      .send({ username: "alice", password: "123" });
    expect(registerResponse.status).toBe(201);
    const response = await request(app)
      .post("/login")
      .send({ username: "alice", password: "1234" });
    expect(response.status).toBe(401);
  });
});
