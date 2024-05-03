import { Router } from "express";
import { verifyToken } from "../utils/utils.js";
import {
  addDiscussion,
  addParticipantToDiscussion,
} from "../controllers/discussionController.js";

const router = Router();

router.post("/createDiscussion", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  let user = null;
  user = await verifyToken(token); // Verify and decode the token

  if (user.error) {
    return res.status(401).send(user.error);
  }

  const body = req.body;
  const creatorId = user.id; // the creator is the one who called the route
  const nameDiscussion = body.nameDiscussion;
  const participants = body.participants;
  // add current user if not already in the list
  if (!participants.includes(user)) {
    participants.push(user);
  }

  const typeDiscussion = participants.length <= 2 ? "0" : "1"; // 0 for private, 1 for group

  const discussion = {
    creator_id: creatorId,
    name: nameDiscussion,
    type: typeDiscussion,
  };

  try {
    // Create the discussion
    const createdDiscussionId = await addDiscussion(discussion);

    // Associate participants with the discussion when the discussion is created
    await Promise.all(
      participants.map(async (participant) => {
        await addParticipantToDiscussion(participant, createdDiscussionId);
      })
    );

    res.status(200).send("Discussion created successfully");
  } catch (error) {
    console.error("Error creating discussion or adding participants:", error);
    res.status(500).send("Error creating discussion or adding participants");
  }
});

export { router as createDiscussion };
