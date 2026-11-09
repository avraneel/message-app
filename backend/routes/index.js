import { Router } from "express";
import userRoutes from "./userRoutes.js";
import messageRoutes from "./messagesRoutes.js";
import authRoutes from "./authRoutes.js";

const router = Router();

router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/users/:userId/messages", messageRoutes);

export default router;
