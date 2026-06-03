import db from "../models/index.js";
import { NotFoundError } from "../utils/error.util.js";
import { hashPassword } from "../utils/passwordhashing.util.js";

const User = db.User;

export async function findUserByEmail(email) {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  return user;
}

export async function findUserByUsername(userName) {
  const user = await User.findOne({
    where: {
      name: userName,
    },
  });

  return user;
}

export async function createUser({ name, email, password }) {
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
}

export async function getUserById(data) {
  const user = await User.findByPk(data.id);
  if (!user) {
    throw new NotFoundError(`User with id ${data.id} not found`);
  }

  return user.dataValues;
}

export async function updateUser(id, data) {
  await User.update(data, { where: { id } });
}
