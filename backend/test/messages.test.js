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
  /** Testing this makes me think that using the database PK as the api call endpoint isn't really the best idea */
  test("POST messages", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "alice", password: "123" });
    expect(loginResponse.status).toBe(200);
    const cookie = loginResponse.get("Set-Cookie");
    const user1Id = loginResponse.body.user.id;
    const contactsResponse = await request(app)
      .get(`/users/${user1Id}/contacts`)
      .set("Cookie", cookie);
    expect(contactsResponse.status).toBe(200);
    const bob = contactsResponse.body.filter((el) => el.username === "bob")[0];
    const createMessage1Response = await request(app)
      .post(`/users/${user1Id}/messages/`)
      .set("Cookie", cookie)
      .send({ from: user1Id, to: bob.id, text: "Hey, how are you Bob? " });
    expect(createMessage1Response.status).toBe(201);
  });
});
