const express = require("express");
const { userRegister,userlogin } = require("../controllers/user_controller");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userlogin);


module.exports = router;
