import prisma from "../lib/prisma.js";

export async function deleteAllSessionFromUser(id) {
  try {
    await prisma.session.deleteMany({
        where: 
    })
  } catch (e) {
    console.error(e);
  }
}
