import { Router } from "express";
import prisma from "../prisma.js";

const userRoutes = Router();

userRoutes.delete("/:username", restrict, async (req, res) => {
  // first we should logout
  // we should authenticate with session here
  req.logOut((err) => {
    if (err) {
      return next(err);
    } else {
      req.session.destroy((err) => {
        if (err) next(err);
        res.clearCookie("connect.sid");
      });
    }
  });
  const { username } = req.params;
  // then delete user
  await prisma.user.delete({
    where: {
      // username is to be gotten from req.user
      username,
    },
  });
  res.status(202).json({ message: "user deleted" });
});

userRoutes.get("/", async (req, res) => {
  res.status(200).json({ message: "you are in user page" });
});

function restrict(req, res, next) {
  if (req.get("Cookie") === undefined) {
    res.status(401).json({ message: "401 Unauthorized" });
  } else {
    next();
  }
}

export default userRoutes;
