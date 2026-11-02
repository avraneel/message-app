import "dotenv/config";
import express from "express";
import session from "express-session";
import prisma from "./lib/prisma.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import cors from "cors";
import passport from "./lib/passport.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    // used to send the cookie to client
    origin: `${process.env.ORIGIN}`,
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      dbRecordIdIsSessionId: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);

/**
 * this is the same as passport.authenticate('session'), which will
 * supply us with req.login(), req.logout() and authenticate() is used
 */
app.use(passport.session());

app.use("/", authRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on port ${process.env.PORT}...`);
});
