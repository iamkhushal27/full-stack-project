const express = require("express");
const {
  userRegister,
  userLogin,
  userGetOne,
  userUpdate,
  userSingle,
} = require("../controllers/user_controller");
const { Auth } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/", Auth, userSingle);
router.patch("/", Auth, userUpdate);

module.exports = router;
