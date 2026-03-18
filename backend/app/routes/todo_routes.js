const express = require("express");
const { Auth } = require("../middleware/auth.middleware");
const { createTodoController } = require("../controllers/todo_controller");

const router = express.Router();

// Create a new todo for the authenticated user
router.post("/", Auth, createTodoController);

module.exports = router;
