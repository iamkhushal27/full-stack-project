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

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name,email,password)

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
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const existingUserByEmail = await findUserByEmail(email);
  if (!existingUserByEmail) {
    throw new UnauthorizedError("Invalid email or password");
  }
  await verifyPassword(password, existingUserByEmail.password);
  const token = await generateToken(existingUserByEmail?.id);

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
    })
    .json({
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
  await updateUser(user.id, data);
  const updatedUser = await getUserById(user);
  res.status(201).json(updatedUser);
};
