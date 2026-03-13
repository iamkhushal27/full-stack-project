const User = require("../models/user_model");
const {
  findUserByEmail,
  findUserByUsername,
  createUser,
  getUserById,
} = require("../services/user_service");
const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} = require("../utils/error");
const { generateToken } = require("../utils/generatingToken");
const { verifyPassword } = require("../utils/passwordhashing");

module.exports = {
  userRegister: async function (req, res, next) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !name) {
        throw new BadRequestError("UserName ,Email and password are required");
      }

      const existingUserByEmail = await findUserByEmail(email);
      if (existingUserByEmail) {
        throw new ConflictError("Email already exists");
      }
      const existingUserByUserName = await findUserByUsername(name);
      if (existingUserByUserName) {
        throw new ConflictError("UserName already exists");
      }
      const user = await createUser({ name, email, password });
      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  userlogin: async function (req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new BadRequestError("Email and password are required");
      }
      const existingUserByEmail = await findUserByEmail(email);
      if (!existingUserByEmail) {
        throw new UnauthorizedError("Invalid email or password");
      }

      const isPasswordValid = await verifyPassword(
        password,
        existingUserByEmail.password
      );

      if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid email or password");
      }
      const token = await generateToken(existingUserByEmail?.id);
      console.log("done")
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: false, // local dev
        })
        .json({
          status: "success",
          message: "Login successful",
        });
    } catch (error) {
      next(error);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const user = req.user;
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
};
