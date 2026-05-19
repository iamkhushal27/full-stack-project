const express = require("express");
const {
  userRegister,
  userLogin,
  userGetOne,
  userUpdate,
  userSingle,
} = require("../controllers/user_controller");
const { Auth } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/schema.middleware");
const {
  registerSchema,
  loginSchema,
  updateUserSchema,
} = require("../schemas/user.schema");

const router = express.Router();

router.post("/register", validate(registerSchema), userRegister);
router.post("/login", validate(loginSchema), userLogin);
router.get("/", Auth, userSingle);
router.patch("/", Auth, validate(updateUserSchema), userUpdate);

module.exports = router;
