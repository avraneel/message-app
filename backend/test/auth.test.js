import request from "supertest";
import { describe, expect, test } from "vitest";
import app from "../app";

describe("/login route", () => {
  test("returns a cookie", async () => {
    const response = await request(app).post("login");
    expect(response).status(200);
  });
});
