import { Router } from "express";
import prisma from "../lib/prisma.js";

const messageRoutes = Router();

messageRoutes.get("/", async (req, res) => {
  const messages = await prisma.message.findMany();
  res.status(200).json(messages);
});

export default messageRoutes;
