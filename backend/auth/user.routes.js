import { Router } from "express";
import prisma from "../prisma";

const userRoutes = Router();

userRoutes.delete("/delete", (req, res) => {
  // first we should logout
  req.logout();
  // then delete user
  const user = prisma.user.delete({
    where: {
      id,
    },
  });
  res.redirect("/");
});

userRoutes.patch("/username", (req, res) => {});
