import { Router } from "express";
import prisma from "../lib/prisma.js";

const messageRoutes = Router({ mergeParams: true });

messageRoutes.get("/:toUserId", async (req, res) => {
  const { userId, toUserId } = req.params;
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                fromUserId: Number(userId),
              },
              {
                toUserId: Number(toUserId),
              },
            ],
          },
          {
            AND: [
              {
                fromUserId: Number(toUserId),
              },
              {
                toUserId: Number(userId),
              },
            ],
          },
        ],
      },
      orderBy: {
        time: "asc",
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

export default messageRoutes;
