import bcrypt from "bcrypt";

const saltRounds = 10; // number of rounds to generate the salt
const salt = bcrypt.genSalt(saltRounds);

export async function hashPassword(password) {
  try {
    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
}