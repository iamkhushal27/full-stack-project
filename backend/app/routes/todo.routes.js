import express from "express";
import { Auth } from "../middleware/auth.middleware.js";
import {
  createTodoController,
  getAllTodoController,
  getSingleTodoController,
  updateTodoController,
  deleteTodoController,
} from "../controllers/todo.controller.js";
import { validate } from "../middleware/schema.middleware.js";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../schemas/todo.schema.js";

const router = express.Router();
router.post("/", Auth, validate(createTodoSchema), createTodoController);
router.get("/", Auth, getAllTodoController);
router.get("/:id", Auth, getSingleTodoController);
router.patch("/:id", Auth, validate(updateTodoSchema), updateTodoController);
router.delete("/:id", Auth, deleteTodoController);

export default router;
