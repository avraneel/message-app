import { Router } from "express";
import { restrict } from "../restrict.js";
import { createMessage, getMessages } from "../db/messageOperations.js";

const messageRoutes = Router({ mergeParams: true });

messageRoutes.get("/:toUserId", restrict, messageForbid, async (req, res) => {
  const { userId, toUserId } = req.params;
  try {
    const messages = await getMessages(Number(userId), Number(toUserId));
    res.status(200).json(messages);
  } catch (e) {
    console.error(e);
  }
});

messageRoutes.post("/", restrict, async (req, res) => {
  try {
    const { from, to, text } = req.body;
    const messages = await createMessage(Number(from), Number(to), text);
    res.status(201).json(messages);
  } catch (e) {
    console.error(e);
  }
});

/** Middle for 403 for message routes only, as the param name is userId
 * and not id (in case of user routes)
 */
function messageForbid(req, res, next) {
  if (Number(req.params.userId) !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You are forbidden to perform this action" });
  } else {
    next();
  }
}

export default messageRoutes;
