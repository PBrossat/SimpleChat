import { Router } from "express";
import { hashPassword } from "../utils/utils.js";
import { addUsers } from "../controllers/userController.js";

const router = Router();

router.post("/create-account", async (req, res) => {
  //console.log(req.body);
  const body = req.body;

  // hash the password
  const name = body.name;
  const surname = body.surname;
  const username = body.username;
  const email = body.email;
  const password = await hashPassword(body.password).catch((error) => {
    console.error("Error hashing password:", error);
    res.status(500).send("Error hashing password");
  });

  // add the user to the database
  const user = { name, surname, username, email, password };
  addUsers(user)
    .then(() => {
      res.status(200).send("Account created successfully");
    })
    .catch((error) => {
      console.error("Error adding user to the database:", error);
      if (
        error.message.includes("UNIQUE constraint failed") &&
        error.message.includes("Users.email")
      ) {
        res.status(400).send("Email already exists");
        console.log("Email already exists");
        return;
      }
      if (
        error.message.includes("UNIQUE constraint failed") &&
        error.message.includes("Users.username")
      ) {
        res.status(401).send("Username already exists");
        console.log("Username already exists");
        return;
      }
      res.status(500).send("Error adding user to the database");
    });
});

export { router as createAccount };
