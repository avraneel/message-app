import prisma from "../lib/prisma.js";

export async function doesUsernameExist(username) {
  const existingUser = await prisma.user.findUnique({ where: { username } });
  return existingUser ? true : false;
}

export async function createUser(username, password) {
  try {
    const user = await prisma.user.create({ data: { username, password } });
    return user;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteUser(userId) {
  try {
    await prisma.$transaction([
      // delete messages sent from user
      prisma.message.deleteMany({ where: { fromUserId: userId } }),
      // update messages sent to other users as 0 id
      prisma.message.updateMany({
        where: { toUserId: userId },
        data: { toUserId: 1 },
      }),
      // delete all sessions of user
      prisma.session.deleteMany({
        where: {
          data: {
            contains: `"user":${userId}`,
          },
        },
      }),
      // finally user can be deleted
      prisma.user.delete({ where: { id: userId } }),
    ]);
  } catch (err) {
    console.error(err);
  }
}

export async function getContacts(userId) {
  try {
    const contacts = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
      },
      select: {
        id: true,
        username: true,
      },
    });
    return contacts;
  } catch (e) {
    console.error(e);
  }
}
