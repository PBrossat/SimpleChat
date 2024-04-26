import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function hashPassword(password) {
  try {
    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
}

// Function to verify the token and return the decoded value of the token
export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    return decoded;
  } catch (err) {
    console.error("Error verifying the token:", err);
    return { error: "Unauthorized: invalid token" };
  }
}
