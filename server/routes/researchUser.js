import "dotenv/config";
import { Router } from "express";
import { getAllUsersContainingInput } from "../controllers/userController.js";
import { verifyToken } from "../utils/utils.js";

const router = Router();

router.get("/researchUser/:query", async (req, res) => {
  // Check if the token is valid
  // Authorization : Bearer <token>
  const token = req.headers.authorization.split(" ")[1];

  let user = null;
  user = await verifyToken(token); // Verify and decode the token

  if (user.error) {
    return res.status(401).send(user.error);
  }

  const usernameToSearch = req.params.query;
  const userId = user.id;
  getAllUsersContainingInput(usernameToSearch, userId)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error("Error getting users from the database:", error);
      res
        .status(500)
        .send(
          "An error occurred while getting the users from the database. Please try again later"
        );
    });
});

export { router as researchUser };
