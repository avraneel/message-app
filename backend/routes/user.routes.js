import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

const userRoutes = Router();

authRoutes.post("/", async (req, res) => {
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

userRoutes.delete("/", restrict, async (req, res) => {
  const username = req.baseUrl.substring(1);
  await prisma.user.delete({
    where: { username },
  });
  req.logOut((err) => {
    if (err) {
      return next(err);
    } else {
      req.session.destroy((err) => {
        if (err) next(err);
        res.clearCookie("connect.sid");
        res.status(202).json({ message: "user deleted" });
      });
    }
  });
});

userRoutes.put("/username", restrict, async (req, res) => {
  const { newUsername } = req.body;
  const { id } = req.user;
  try {
    await prisma.user.update({
      where: { id },
      data: { username: newUsername },
    });
    res.status(200).json({ message: "username updated" });
  } catch (err) {
    console.error(err);
  }
});

userRoutes.put("/password", restrict, async (req, res) => {
  const { newPassword } = req.body;
  const { id } = req.user;
  await prisma.user.update({
    where: { id },
    data: { password: newPassword },
  });
  res.status(200).json({ message: "password updated" });
});

userRoutes.get("/", async (req, res) => {
  res.status(200).json({ message: "you are in user page" });
});

function restrict(req, res, next) {
  if (req.get("Cookie") === undefined) {
    res.status(401).json({ message: "401 Unauthorized. You need a cookie" });
  } else {
    // TODO give 403 if sid does not exist in cookie
    next();
  }
}

export default userRoutes;
