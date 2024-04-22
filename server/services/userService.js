import bcrypt from "bcrypt";
const salt = await bcrypt.genSalt(10);

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
