import request from "supertest";
import express from "express";
import userRoutes from "../routes/userRoutes.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

test("GET /users", (done) => {
  request(app).get("/users").expect(200, done);
});
