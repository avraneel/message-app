import LocalStrategy from "passport-local";
import { prisma } from "../lib/prisma";

const strategy = new LocalStrategy(function verify(username, password, cb) {
  const user;
});
