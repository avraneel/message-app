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
  await request(app).post("/users").send({ username: "bob", password: "123" });
});

describe("messages route", () => {
  test("POST messages", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "alice", password: "123" });
    expect(response.status).toBe(200);
    const cookie = response.get("Set-Cookie");
  });
});
