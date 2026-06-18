import db from "../models/index.js";
import { NotFoundError } from "../utils/error.util.js";
import { hashPassword } from "../utils/passwordhashing.util.js";

const User = db.User;

export async function findUserByEmail(email, { transaction } = {}) {
  const user = await User.findOne({
    where: {
      email,
    },
    transaction,
  });
  return user;
}

export async function findUserByUsername(userName, { transaction } = {}) {
  const user = await User.findOne({
    where: {
      name: userName,
    },
    transaction,
  });

  return user;
}

export async function createUser(
  { name, email, password, idempotency_key },
  { transaction } = {},
) {
  const hashedPassword = await hashPassword(password);
  const user = await User.create(
    {
      name: name,
      email,
      password: hashedPassword,
      idempotency_key,
    },
    {
      transaction,
    },
  );
  if (!user) {
    throw new NotFoundError("User could not be created");
  }

  return user;
}

export async function getUserById(data, { transaction } = {}) {
  const user = await User.findByPk(data.id, { transaction });
  if (!user) {
    throw new NotFoundError(`User with id ${data.id} not found`);
  }

  return user.dataValues;
}

export async function updateUser(id, data, { transaction } = {}) {
  await User.update(data, { where: { id }, transaction });
}
