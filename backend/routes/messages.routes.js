import { Router } from "express";
import prisma from "../lib/prisma.js";

const messageRoutes = Router();

messageRoutes.get("/", async (req, res) => {
  const messages = await prisma.message.findMany();
  res.status(200).json(messages);
});

messageRoutes.post("/", async (req, res) => {
  const { from, to, text } = req.body;
  await prisma.message.create({
    data: {
      fromUserId: Number(from),
      toUserId: Number(to),
      time: new Date(),
      text,
    },
  });
  res.status(201).json({ message: "message created" });
});

export default messageRoutes;
