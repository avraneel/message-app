import "dotenv/config";
import express from "express";
import session from "express-session";
import prisma from "./prisma.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import cors from "cors";
import passport from "./auth/passport.js";
import authRoutes from "./auth/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    store: new PrismaSessionStore(prisma, {
      dbRecordIdIsSessionId: true,
    }),
    secret: process.env.SECRET,
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    cookie: {},
  }),
);
app.use(passport.session());

app.use("/", authRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on port ${process.env.PORT}`);
});
