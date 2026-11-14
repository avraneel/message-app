import { Router } from "express";
import prisma from "../lib/prisma.js";
import { restrict } from "../restrict.js";

const messageRoutes = Router({ mergeParams: true });

messageRoutes.get("/:toUserId", restrict, messageForbid, async (req, res) => {
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

messageRoutes.post("/", restrict, async (req, res) => {
  const { from, to, text } = req.body;
  await prisma.message.create({
    data: {
      fromUserId: Number(from),
      toUserId: Number(to),
      time: new Date(),
      text,
    },
  });
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        {
          AND: [
            {
              fromUserId: from,
            },
            {
              toUserId: to,
            },
          ],
        },
        {
          AND: [
            {
              fromUserId: to,
            },
            {
              toUserId: from,
            },
          ],
        },
      ],
    },
    orderBy: {
      time: "asc",
    },
  });
  res.status(201).json(messages);
});

/** Middle for 403 for message routes only, as the param name is userId
 * and not id (in case of user routes)
 */
function messageForbid(req, res, next) {
  if (Number(req.params.userId) !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You are forbidden to perform this action" });
  } else {
    next();
  }
}

export default messageRoutes;
