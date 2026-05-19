const db = require("../models");
const { NotFoundError } = require("../utils/error");
const User = db.User;
const { hashPassword } = require("../utils/passwordhashing");

module.exports = {
  findUserByEmail: async function (email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  },
  findUserByUsername: async function (userName) {
    const user = await User.findOne({
      where: {
        name: userName,
      },
    });

    return user;
  },
  createUser: async function ({ name, email, password }) {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name: name,
      email,
      password: hashedPassword,
    });
    if (!user) {
      throw new NotFoundError("User could not be created");
    }

    return user;
  },
  getUserById: async function (data) {
    const user = await User.findByPk(data.id);
    if (!user) {
      throw new NotFoundError(`User with id ${data.id} not found`);
    }

    return user.dataValues;
  },
  updateUser: async function (id, data) {
    await User.update(data, { where: { id } });
  },
};
