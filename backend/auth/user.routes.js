import { Router } from "express";
import prisma from "../prisma.js";

const userRoutes = Router();

userRoutes.delete("/:username", async (req, res) => {
  // first we should logout
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
  res.status(204).json({ message: "user deleted" });
});

userRoutes.patch("/username", (req, res) => {});

export default userRoutes;
