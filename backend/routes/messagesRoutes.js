import { Router } from "express";
import prisma from "../lib/prisma.js";

const messageRoutes = Router({ mergeParams: true });

messageRoutes.get("/", async (req, res) => {
  const { from } = req.params.userId;
  try {
    const messages = await prisma.message.findMany({
      where: {
        fromUserId: from,
      },
    });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
  }
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

messageRoutes.delete("/:id", async (req, res) => {
  await prisma.message.delete({
    where: { id: Number(req.params.id) },
  });
  res.status(202).json({ message: "message deleted" });
});

export default messageRoutes;
