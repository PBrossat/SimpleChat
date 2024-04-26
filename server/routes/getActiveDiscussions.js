import { Router } from "express";
import { verifyToken } from "../utils/utils.js";
import { getActiveDiscussions } from "../controllers/userController.js";

const router = Router();

router.get("/getActiveDiscussions", async (req, res) => {
  // Check if the token is valid
  // Authorization : Bearer <token>
  const token = req.headers.authorization.split(" ")[1];

  let user = null;
  user = await verifyToken(token); // Verify and decode the token

  if (user.error) {
    return res.status(401).send(user.error);
  }

  const userId = user.id;

  // Get all active discussions
  getActiveDiscussions(userId)
    .then((discussions) => {
      res.status(200).json(discussions);
      console.log("Active discussions sent to the client");
      console.log(discussions);
    })
    .catch((error) => {
      console.error(
        "Error getting active discussions from the database:",
        error
      );
      res
        .status(500)
        .send(
          "An error occurred while getting the active discussions from the database. Please try again later"
        );
    });
});

export { router as getActiveDiscussions };
