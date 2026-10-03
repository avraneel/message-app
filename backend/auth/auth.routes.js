import { Router } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

const authRoutes = Router();

authRoutes.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUser) {
    res.status(409).json({
      message: "user already exists",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username,
      hashedPassword,
    },
  });
  res.status(201).send({
    message: "user created",
  });
});

authRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    res.status(404).json({
      message: "username not avaialbe",
    });
    return;
  }
  if (!bcrypt.compare(password, user.password)) {
    res.status(401).json({
      message: "Password is invalid",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username,
      hashedPassword,
    },
  });
  res.status(201).send({
    message: "user created",
  });
});
