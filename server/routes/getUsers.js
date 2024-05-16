import { Router } from "express";
import { verifyToken } from "../utils/utils.js";
import { getUsers } from "../controllers/userController.js";

const router = Router();

router.get("/getUsers", async (req, res) => {
  // Check if the token is valid
  // Authorization : Bearer <token>
  // const token = req.headers.authorization.split(" ")[1];

  // let user = null;
  // user = await verifyToken(token); // Verify and decode the token

  // if (user.error) {
  //   return res.status(401).send(user.error);
  // }

  getUsers()
    .then((users) => {
      res.status(200).json(users);
      console.log("users sent to the client for the conversation : " + users);
    })
    .catch((error) => {
      console.error("Error getting users from the database:", error);
      res
        .status(400)
        .send(`An error occurred while getting the users of the database.`);
    });
});

export { router as getUsers };
