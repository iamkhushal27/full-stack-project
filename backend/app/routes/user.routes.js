import express from "express";
import {
  userRegister,
  userLogin,
  userUpdate,
  userSingle,
} from "../controllers/user.controller.js";
import { Auth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/schema.middleware.js";
import {
  registerSchema,
  loginSchema,
  updateUserSchema,
} from "../schemas/user.schema.js";

const router = express.Router();

router.post("/register", validate(registerSchema), userRegister);
router.post("/login", validate(loginSchema), userLogin);
router.get("/", Auth, userSingle);
router.patch("/", Auth, validate(updateUserSchema), userUpdate);

export default router;
