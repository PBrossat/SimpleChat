import { Router } from "express";
import { verifyToken } from "../utils/utils.js";
import { getParticipants } from "../controllers/discussionController.js";

const router = Router();

router.get("/getParticipants/:query", async (req, res) => {
  // Check if the token is valid
  // Authorization : Bearer <token>
  const token = req.headers.authorization.split(" ")[1];

  let user = null;
  user = await verifyToken(token); // Verify and decode the token

  if (user.error) {
    return res.status(401).send(user.error);
  }

  const conversationId = req.params.query;

  getParticipants(conversationId)
    .then((participants) => {
      res.status(200).json(participants);
      console.log(
        "Participants sent to the client for the conversation : ",
        conversationId
      );
      console.log(participants);
    })
    .catch((error) => {
      console.error("Error getting participants from the database:", error);
      res
        .status(400)
        .send(
          `An error occurred while getting the participants of the conversation : ${conversationId} from the database.`
        );
    });
});

export { router as getParticipants };
