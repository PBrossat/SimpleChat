import "dotenv/config";
import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// Function to refresh the token
router.post("/refreshToken", async (req, res) => {
  // Autorization : Bearer token
  const refreshToken = req.headers.authorization.split(" ")[1];

  if (!refreshToken) {
    return res.status(401).send("No token provided");
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(403).send("Refresh token invalid");
    }

    // we need to delete the creation and expiration date of the playload to create a new token
    delete data.iat;
    delete data.exp;

    const token = jwt.sign(data, process.env.ACCES_TOKEN_SECRET, {
      expiresIn: "10s",
    });
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, refreshToken });
  });
});

export { router as refreshToken };