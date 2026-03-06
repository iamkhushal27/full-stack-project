const User = require("../models/user_model");
const {
  checkingEmail,
  checkingUserName,
  creatingUser,
  userNameExists,
} = require("../services/user_service");
const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} = require("../utils/error");
const { generatingToken } = require("../utils/generatingToken");
const { passwordDecrypting } = require("../utils/passwordhashing");






module.exports = {
  userRegister: async function (req, res, next) {
    try {
      const { name, email, password } = req.body;
      console.log('inside')
gena
      const emailExists = await checkingEmail(email);
      if (emailExists?.email) {
        throw new ConflictError("Email is already exists");
      }
      const userNameExists = await checkingUserName(name);
      if (userNameExists?.userName) {
        throw new ConflictError("userName is already exists");
      }
      const user = await creatingUser({ name, email, password });
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

      const existingUser = await checkingEmail(email);

      if (!existingUser) {
        throw new UnauthorizedError("Invalid email or password");
      }
      console.log(existingUser.password)
      console.log(password)

      const isPasswordValid = await passwordDecrypting(
        password,
        existingUser.password
      );

      if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid email or password");
      }

      const token = await generatingToken(existingUser?.id);
      

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000,
        })
        .status(200)
        .json({
          status: "success",
          message: "Login successful",
        });
    } catch (error) {
      next(error);
    }
  },
};
