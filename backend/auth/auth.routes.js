import { Router } from "express";
import prisma from "../prisma.js";
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

authRoutes.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect(`/${req.user.username}`);
  },
);

export default authRoutes;
