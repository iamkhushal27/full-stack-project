import { getUserById } from "../services/user.service.js";
import { InvalidTokenError } from "../utils/error.util.js";
import { verifyToken } from "../utils/generatingToken.util.js";

export const Auth = async (req, res, next) => {
  const token = req?.cookies?.token;
  const userData = await verifyToken(token);
  if (!userData) {
    throw new InvalidTokenError("Invalid token");
  }
  const data = await getUserById(userData);
  req.user = data;
  next();
};
