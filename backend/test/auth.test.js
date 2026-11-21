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
  await request(app)
    .post("/users")
    .send({ username: "alice", password: "123" });
});

describe("/login route", () => {
  test("returns a cookie on successful login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "alice", password: "123" });
    expect(response.status).toBe(200);
    expect(response.get("Set-Cookie")).not.toBeNull();
  });

  test("returns 401 on unsuccessful login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "alice", password: "1234" });
    expect(response.status).toBe(401);
  });
});

describe("logout route", async () => {
  test("returns a cookie on successful login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "alice", password: "123" });
    expect(response.status).toBe(200);
    expect(response.get("Set-Cookie")).not.toBeNull();
    const cookie = response.get("Set-Cookie");
  });
});

describe("id route", () => {
  test("gets userId from cookie", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "alice", password: "123" });
    const cookie = loginResponse.headers["set-cookie"];
    const getUserIdResponse = await request(app)
      .get("/id")
      .set("Cookie", cookie);
    expect(getUserIdResponse.status).toBe(200);
    expect(getUserIdResponse.body.userId).toBeGreaterThan(0);
  });
});
