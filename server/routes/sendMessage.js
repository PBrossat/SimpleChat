import { Router } from "express";
import { verifyToken } from "../utils/utils.js";
import { addMessage } from "../controllers/discussionController.js";

import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

const router = Router();

router.post("/sendMessage", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  let user = null;
  user = await verifyToken(token); // Verify and decode the token

  if (user.error) {
    return res.status(401).send(user.error);
  }

  const body = req.body;
  const senderId = user.id; // the creator is the one who called the route
  const conversationId = body.conversationId;
  const content = body.content;
  const is_read = body.is_read;

  // add the message to the database
  addMessage(conversationId, senderId, content, is_read)
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res.status(500).send("Error sending message");
    });
});

export { router as sendMessage };
