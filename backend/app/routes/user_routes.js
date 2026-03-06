const express = require("express");
const { userRegister } = require("../controllers/user_controller");
const router = express.Router();

router.post("/register", userRegister);

module.exports = router;
