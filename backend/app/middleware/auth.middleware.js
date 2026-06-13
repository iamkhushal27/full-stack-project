import { getUserById } from "../services/user.service.js";

import { verifyToken } from "../utils/generatingToken.util.js";

export const Auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const userData = await verifyToken(token);
  const data = await getUserById(userData);
  req.user = data;
  next();
};
