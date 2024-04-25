import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", async (req, res) => {
  const body = req.body;

  //console.log("body:", body);
  // hash the password
  const username = body.username;

  // Verify if the user exist in the database
  getUser(username)
    .then((user) => {
      if (user.username === "") {
        // If the user does not exist, return an error
        res.status(401).send("No user with this username");
      } else {
        // If the user exists, compare the passwords

        // Get the password of the user in the database
        const passwordInDb = user.password;
        const password = body.password;

        // Compare the passwords
        bcrypt.compare(password, passwordInDb, (err, result) => {
          if (err) {
            // internal error
            console.error("Error comparing passwords:", err);
            res
              .status(500)
              .send(
                "An error occurred while comparing the passwords. Please try again later"
              );
          } else if (result) {
            // If the passwords match, send the user information to the client

            delete user.password; // don't send the password to the client
            res.status(200).json(user);
          } else {
            res.status(401).send("Incorrect password");
          }
        });
      }
    })
    .catch((error) => {
      // If an error occurs while getting the user from the database, return an error
      console.error("Error getting user from the database:", error);
      res
        .status(500)
        .send(
          "An error occurred while getting the user from the database. Please try again later"
        );
    });
});

export { router as login };
