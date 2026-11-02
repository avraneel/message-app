import { Router } from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import passport from "passport";

const authRoutes = Router();

authRoutes.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      res.status(409).json({
        message: "user already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      res.status(201).send({
        message: "user created",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

authRoutes.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "logged in" });
});

authRoutes.post("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    } else {
      console.log(req.user);
      req.session.destroy((err) => {
        if (err) next(err);
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "logged out" });
      });
    }
  });
});

export default authRoutes;
