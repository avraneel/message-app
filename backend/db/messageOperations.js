import prisma from "../lib/prisma.js";

export function deleteMessage() {}

export async function deleteAllMessagesFromUser(userId) {
  try {
    await prisma.$transaction(
      prisma.message.deleteMany({ where: { fromUserId: userId } }),
      prisma.message.updateMany({
        where: { toUserId: userId },
        data: { toUserId: 0 },
      }),
    );
  } catch (err) {
    console.error(err);
  }
}
