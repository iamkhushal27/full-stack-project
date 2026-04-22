const express = require("express");
const { Auth } = require("../middleware/auth.middleware");
const {
  createTodoController,
  getAllTodoController,
  getSingleTodoController,
  updateTodoController,
  deleteTodoController,
} = require("../controllers/todo_controller");

const router = express.Router();

router.post("/", Auth, createTodoController);
router.get("/", Auth, getAllTodoController);
router.get("/:id", Auth, getSingleTodoController);
router.patch("/:id", Auth, updateTodoController);
router.delete("/:id", Auth, deleteTodoController);

module.exports = router;
