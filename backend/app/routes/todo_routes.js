const express = require("express");
const { Auth } = require("../middleware/auth.middleware");
const {
  createTodoController,
  getAllTodoController,
  getSingleTodoController,
  updateTodoController,
  deleteTodoController,
} = require("../controllers/todo_controller");
const { validate } = require("../middleware/schema.middleware");
const {
  createTodoSchema,
  updateTodoSchema,
} = require("../schemas/todo.schema");

const router = express.Router();
router.post("/", Auth, validate(createTodoSchema), createTodoController);
router.get("/", Auth, getAllTodoController);
router.get("/:id", Auth, getSingleTodoController);
router.patch("/:id", Auth, validate(updateTodoSchema), updateTodoController);
router.delete("/:id", Auth, deleteTodoController);

module.exports = router;
