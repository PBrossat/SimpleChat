import express from "express";
import { createServer } from "node:http";
import { createAccount } from "./routes/createAccount.js";
import { login } from "./routes/login.js";
import { researchUser } from "./routes/researchUser.js";
import { refreshToken } from "./routes/refreshToken.js";
import bodyParser from "body-parser";
import cors from "cors";

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
app.use("/api", createAccount);
app.use("/api", login);
app.use("/api", researchUser);
app.use("/api", refreshToken);

server.listen(3001, () => {
  console.log("server running at http://localhost:3001");
});
