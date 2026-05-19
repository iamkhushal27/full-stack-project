import argon2 from "argon2";
import { UnauthorizedError } from "./error.js";

export async function hashPassword(password) {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
}

export async function verifyPassword(password, oldpassword) {
  const decryptPassword = await argon2.verify(oldpassword, password);

  if (!decryptPassword) {
    throw new UnauthorizedError("Invalid email or password");
  }

  return decryptPassword;
}
