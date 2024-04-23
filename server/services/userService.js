import bcrypt from "bcrypt";

const saltRounds = 10; // number of rounds to generate the salt
process.env.BCRYPT_SALT = bcrypt.genSaltSync(saltRounds); // always use the same salt

export async function hashPassword(password) {
  try {
    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_SALT);

    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
}

