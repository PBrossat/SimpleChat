import { Router } from "express";
import { hashPassword } from "../services/userService.js";
import { addUsers } from "../controllers/userController.js";

const router = Router();

router.post("/create-account", async (req, res) => {
  //console.log(req.body);
  const body = req.body;

  // hash the password
  const username = body.name;
  const email = body.email;
  const password = await hashPassword(body.password).catch((error) => {
    console.error("Error hashing password:", error);
    res.status(500).send("Error hashing password");
  });

  // console.log("username : " + username);
  // console.log("email : " + email);
  // console.log("password : " + password);

  // add the user to the database
  const user = { username, email, password };
  addUsers(user)
    .then(() => {
      res.status(200).send("Account created successfully");
    })
    .catch((error) => {
      console.error("Error adding user to the database:", error);
      res.status(500).send("Error adding user to the database");
    });
});

export { router as createAccount };
