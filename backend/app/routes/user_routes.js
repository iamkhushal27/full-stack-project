const express = require("express");
const {
  userRegister,
  userlogin,
  getUser,
} = require("../controllers/user_controller");
const { Auth } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userlogin);
router.get("/", Auth, getUser);

module.exports = router;
