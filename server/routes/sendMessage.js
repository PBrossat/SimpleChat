import { Router } from "express";
import { verifyToken } from "../utils/utils.js";
import {
    addMessage
} from "../controllers/discussionController.js";

import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

const router = Router();

router.post("/sendMessage", async (req, res) => {
  console.log("in sendMessage : "+req.body.test);

  // const token = req.headers.authorization.split(" ")[1];

  // let user = null;
  // user = await verifyToken(token); // Verify and decode the token

  // if (user.error) {
  //   return res.status(401).send(user.error);
  // }

  // const body = req.body;
  // console.log("body : " + body);
  // const creatorId = user.id; // the creator is the one who called the route
  // const participants = body.participants;

  // // add current user if not already in the list (shoyld not happen but just in case)
  // if (!participants.includes(user)) {
  //   participants.push(user);
  // }

  // const typeDiscussion = participants.length <= 2 ? "0" : "1"; // 0 for private, 1 for group

  // const nameDiscussion = typeDiscussion === "0" ? null : body.nameDiscussion; // if it's a private discussion, we don't need a name
  
  // const discussion = {
  //   creator_id: creatorId,
  //   name: nameDiscussion,
  //   type: typeDiscussion,
  // };

  try {
    // Create the discussion
    //const createMessage = await addDiscussion(discussion);
    //console.log("in try : "+discussion);
    // Associate participants with the discussion when the discussion is created
    // await Promise.all(
    //   participants.map(async (participant) => {
    //     await addParticipantToDiscussion(participant, createdDiscussionId);
    //   })
    // );

    res.status(200).send("Message bien envoyé");
  } catch (error) {
    console.error("Erreur lors de l'envoi du message : ", error);
    res.status(500).send("Erreur lors de l'envoi du message");
  }
});

export { router as sendMessages };
