import prisma from "../lib/prisma.js";

export function deleteMessage() {}

export async function deleteAllMessagesFromUser(userId) {
  try {
    const messages = await prisma.$transaction(
      prisma.message.deleteMany({ where: { fromUserId: userId } }),
      prisma.message.updateMany({
        where: { toUserId: userId },
        data: { toUserId: 0 },
      }),
    );
    return messages;
  } catch (err) {
    console.error(err);
  }
}

export async function createMessage(from, to, text) {
  try {
    const messages = await prisma.$transaction([
      prisma.message.create({
        data: {
          fromUserId: from,
          toUserId: to,
          time: new Date(),
          text,
        },
      }),
      prisma.message.findMany({
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
      }),
    ]);
    return messages;
  } catch (e) {
    console.error(e);
  }
}

export async function getMessages(from, to) {
  try {
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
    return messages;
  } catch (e) {
    console.error(e);
  }
}
