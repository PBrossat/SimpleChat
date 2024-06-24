import { Router } from "express";
import { verifyToken } from "../utils/utils.js";
import { getAllMessagesFromDiscussion } from "../controllers/discussionController.js";

const router = Router();

router.get("/getAllMessagesFromDiscussion", async (req, res) => {
  // Check if the token is valid
  // Authorization : Bearer <token>
  const token = req.headers.authorization.split(" ")[1];

  let user = null;
  user = await verifyToken(token); // Verify and decode the token

  if (user.error) {
    return res.status(401).send(user.error);
  }

  const body = req.body;
  const discussionId = body.discussionId;

  getAllMessagesFromDiscussion(discussionId)
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      console.error(
        "Error getting all messages from the discussion : " +
          discussionId +
          " in the database:",
        error
      );
      res
        .status(400)
        .send(
          `An error occurred while getting all messages from the discussion : ${discussionId} from the database.`
        );
    });
});

export { router as getAllMessagesFromDiscussion };
