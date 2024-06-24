import express from "express";
import { createServer } from "node:http";
import { createAccount } from "./routes/createAccount.js";
import { login } from "./routes/login.js";
import { researchUser } from "./routes/researchUser.js";
import { refreshToken } from "./routes/refreshToken.js";
import { getActiveDiscussions } from "./routes/getActiveDiscussions.js";
import { sendMessage } from "./routes/sendMessage.js";
import { getParticipants } from "./routes/getParticipants.js";
import { createDiscussion } from "./routes/createDiscussion.js";
import { getUsers } from "./routes/getUsers.js";
import { getAllMessagesFromDiscussion } from "./routes/getAllMessagesFromDiscussion.js";
import bodyParser from "body-parser";
import cors from "cors";
import { send } from "node:process";

const app = express();
const server = createServer(app);

// Enable CORS
app.options("*", cors());

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Accept requests from the frontend
app.use(cors({ origin: "http://localhost:3000" }));

// default route
app.get("/", (req, res) => {
  res.send("<h1>Backend</h1>");
});

// routes of the api application
app
  .use("/api", createAccount)
  .use("/api", login)
  .use("/api", researchUser)
  .use("/api", refreshToken)
  .use("/api", getActiveDiscussions)
  .use("/api", getParticipants)
  .use("/api", createDiscussion)
  .use("/api", getUsers)
  .use("/api", sendMessage)
  .use("/api", getAllMessagesFromDiscussion);

server.listen(3001, () => {
  console.log("server running at http://localhost:3001");
});
