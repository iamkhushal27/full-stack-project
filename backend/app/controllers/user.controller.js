import {
  findUserByEmail,
  findUserByUsername,
  createUser,
  getUserById,
  updateUser,
} from "../services/user.service.js";
import { ConflictError, UnauthorizedError } from "../utils/error.util.js";
import { generateToken } from "../utils/generatingToken.util.js";
import { verifyPassword } from "../utils/passwordhashing.util.js";
import { withTransaction } from "../utils/transaction.util.js";

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const idempotency_key = req.headers.idempotency_key;

  const user = await withTransaction(async (transaction) => {
    const existingUserByEmail = await findUserByEmail(email, { transaction });
    if (existingUserByEmail) {
      throw new ConflictError("Email already exists");
    }

    const existingUserByUserName = await findUserByUsername(name, { transaction });
    if (existingUserByUserName) {
      throw new ConflictError("UserName already exists");
    }

    return createUser({ name, email, password, idempotency_key }, { transaction });
  });

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: user,
  });
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const existingUserByEmail = await findUserByEmail(email);
  if (!existingUserByEmail) {
    throw new UnauthorizedError("Invalid email or password");
  }
  await verifyPassword(password, existingUserByEmail.password);
  const token = await generateToken(existingUserByEmail?.id);

  res.status(200).json({
    status: "success",
    data: existingUserByEmail,
    token,
    message: "Login successful",
  });
};

export const userSingle = async (req, res) => {
  const user = req.user;
  res.status(201).json(user);
};

export const userUpdate = async (req, res) => {
  const user = req.user;
  const data = req.body;

  const updatedUser = await withTransaction(async (transaction) => {
    await updateUser(user.id, data, { transaction });
    return getUserById(user, { transaction });
  });

  res.status(201).json(updatedUser);
};
