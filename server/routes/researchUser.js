import { Router } from "express";
import { getAllUsersContainingInput } from "../controllers/userController.js";

const router = Router();

router.get("/researchUser", async (req, res) => {
  const usernameToSearch = req.query.username; // after the "username?" in the URL

  getAllUsersContainingInput(usernameToSearch)
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
