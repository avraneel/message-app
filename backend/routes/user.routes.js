import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

const userRoutes = Router();

userRoutes.post("/", async (req, res) => {
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

userRoutes.delete("/:id", restrict, async (req, res) => {
  await prisma.user.delete({
    where: { id: Number(req.params.id) },
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

userRoutes.put("/:id/username", restrict, async (req, res) => {
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

userRoutes.put("/:id/password", restrict, async (req, res) => {
  const { newPassword } = req.body;
  const { id } = req.user;
  await prisma.user.update({
    where: { id },
    data: { password: newPassword },
  });
  res.status(200).json({ message: "password updated" });
});

userRoutes.get("/:id", restrict, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.status(200).json({ user });
});

function restrict(req, res, next) {
  if (req.user === undefined) {
    return res
      .status(401)
      .json({ message: "401 Unauthorized. You need a valid cookie" });
  } else if (Number(req.params.id) !== req.user.id) {
    return res.status(403).json({
      message: "403 forbidden. You are not allowed to access this info",
    });
  } else {
    next();
  }
}

export default userRoutes;
