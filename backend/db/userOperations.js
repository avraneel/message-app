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
        data: { toUserId: 0 },
      }),
      // delete all sessions of user
      await prisma.session.deleteMany({
        where: {
          data: {
            path: ["passport", "user"],
            equals: req.params.id,
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
