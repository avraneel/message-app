import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import { restrict, forbid } from "../restrict.js";
import { validationResult } from "express-validator";
import {
  createUser,
  deleteUser,
  doesUsernameExist,
  getContacts,
} from "../db/userOperations.js";

const userRoutes = Router();

/** Creates a user */
userRoutes.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = validationResult(req);
    console.log(result);
    if (!(await doesUsernameExist(username))) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await createUser(username, hashedPassword);
      res.status(201).send(user);
    } else {
      res.status(409).json({ message: "user already exists" });
    }
  } catch (err) {
    console.log(err);
  }
});

/** Deletes a user */
userRoutes.delete("/:id", restrict, forbid, async (req, res) => {
  await deleteUser(Number(req.params.id));
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

/** Updates a user's username */
userRoutes.put("/:id/username", restrict, forbid, async (req, res) => {
  const { newUsername } = req.body;
  const { id } = req.user;
  try {
    if (!(await doesUsernameExist(newUsername))) {
      const user = await prisma.user.update({
        where: { id },
        data: { username: newUsername },
      });
      res.status(200).json(user);
    } else {
      res.status(409).json({ message: "user already exists" });
    }
  } catch (err) {
    console.error(err);
  }
});

/** Updates a user's password */
userRoutes.put("/:id/password", restrict, forbid, async (req, res) => {
  const { newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const { id } = req.user;
  await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });

  res.status(200).json({ message: "password updated" });
});

userRoutes.get("/:id/contacts", restrict, forbid, async (req, res) => {
  const contacts = await getContacts(Number(req.params.id));
  res.status(200).json(contacts);
});

/** reads own user details */
userRoutes.get("/:id", restrict, forbid, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.status(200).json({ user });
});

export default userRoutes;
