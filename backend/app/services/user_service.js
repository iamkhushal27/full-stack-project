const User = require("../models/user_model");
const {passwordHashing} = require("../utils/passwordhashing");

module.exports = {
  checkingEmail: async function (email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  },
  checkingUserName: async function (userName) {
    const user = await User.findOne({
      where: {
        userName,
      },
    });
    return user;
  },
  creatingUser: async function ({ userName, email, password }) {
    const hashedPassword = await passwordHashing(password);
    console.log(hashedPassword);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    return user;
  },
  generatingToken: async function (userId) {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
  },
};
