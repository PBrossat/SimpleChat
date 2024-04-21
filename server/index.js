import express from "express";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);

app.get("/", (req, res) => {
  res.send("<h1>Backend</h1>");
});

server.listen(3001, () => {
  console.log("server running at http://localhost:3001");
});
