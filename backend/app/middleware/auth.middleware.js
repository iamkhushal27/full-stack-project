const { getUserById } = require("../services/user_service");
const { InvalidTokenError } = require("../utils/error");
const { verifyToken } = require("../utils/generatingToken");

module.exports = {
  Auth: async (req, res, next) => {
    try {
      const token = req?.cookies?.token;
      const userData = await verifyToken(token);
      if (!userData) {
        throw new InvalidTokenError("Invalid token");
      }
      const data = await getUserById(userData);
      req.user = data;
      next();
    } catch (error) {
      next(error);
    }
  },
};
