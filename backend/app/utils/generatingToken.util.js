import jwt from "jsonwebtoken";
import { InvalidTokenError } from "../utils/error.util.js";

export async function generateToken(id) {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1day",
  });
  return token;
}

export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ← sync, no need for await
    return decoded;
  } catch (err) {
    // jwt.verify throws these specific error types
    if (err.name === "TokenExpiredError") {
      throw new InvalidTokenError("Token has expired"); // ← your AppError
    }
    if (err.name === "JsonWebTokenError") {
      throw new InvalidTokenError("Invalid token"); // ← your AppError
    }
    throw new InvalidTokenError("Token verification failed"); // ← fallback
  }
}
