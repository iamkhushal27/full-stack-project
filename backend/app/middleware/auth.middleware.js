const { getUserById } = require("../services/user_service");
const { InvalidTokenError } = require("../utils/error");
const {  verifyToken } = require("../utils/generatingToken");

module.exports = {
  Auth: async (req, res, next) => {
    try {
      const token = req?.cookies?.token;

      const userId = await verifyToken(token);
      if (!userId) {
        throw new InvalidTokenError("Invalid token");
      }

      const data = await getUserById(userId);

      console.log(data, "data");
      req.user = data;
      next();
    } catch (error) {
      next(error);
    }
  },
};
