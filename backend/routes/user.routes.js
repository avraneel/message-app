import { Router } from "express";
import prisma from "../lib/prisma.js";

const userRoutes = Router();

userRoutes.delete("/", restrict, async (req, res) => {
  // first we should logout
  // we should authenticate with session here
  const username = req.baseUrl.substring(1);
  // then delete user
  await prisma.user.delete({
    where: { username },
  });
  req.logOut((err) => {
    if (err) {
      return next(err);
    } else {
      req.session.destroy((err) => {
        if (err) next(err);
        res.clearCookie("connect.sid");
        res.status(202).json({ message: "user deleted" });
      });
    }
  });
});

userRoutes.put("/username", restrict, async (req, res) => {
  const { newUsername } = req.body;
  const { id } = req.user;
  try {
    await prisma.user.update({
      where: { id },
      data: { username: newUsername },
    });
    res.status(200).json({ message: "username update" });
  } catch (err) {
    console.error(err);
  }
});

userRoutes.put("/password", restrict, async (req, res) => {
  const { newPassword } = req.body;
  const { id } = req.user;
  await prisma.user.update({
    where: { id },
    data: { password: newPassword },
  });
  res.status(200).json({ message: "password update" });
});

userRoutes.get("/", async (req, res) => {
  res.status(200).json({ message: "you are in user page" });
});

function restrict(req, res, next) {
  if (req.get("Cookie") === undefined) {
    res.status(401).json({ message: "401 Unauthorized. You need a cookie" });
  } else {
    // TODO give 403 if sid does not exist in cookie
    next();
  }
}

export default userRoutes;
