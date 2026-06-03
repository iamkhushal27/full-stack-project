import {
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} from "../services/todo.service.js";
import { BadRequestError } from "../utils/error.util.js";
import {
  parseDateOnly,
  parsePositiveInt,
  parseOptionalRelationId,
} from "../utils/parsingFunction.util.js";

export const createTodoController = async (req, res) => {
  const user = req.user;

  const { title, description, category, priority, status, uploadImage, date } =
    req.body;

  const categoryId = parsePositiveInt(category, "category");
  const priorityId = parseOptionalRelationId(priority, "priority");
  const statusId = parseOptionalRelationId(status, "status");
  const dateOnly = parseDateOnly(date);

  const todo = await createTodo({
    title,
    description,
    task_image: uploadImage,
    date: dateOnly,
    user_id: user.id,
    category_id: categoryId,
    priority_id: priorityId,
    status_id: statusId,
  });

  res.status(201).json({
    status: "success",
    message: "Todo created successfully",
    data: todo,
  });
};

export const getAllTodoController = async (req, res) => {
  const userId = req.user.id;
  const date = req.query.date ? parseDateOnly(req.query.date) : undefined;
  const todos = await getAllTodos(userId, date);
  res.status(200).json({
    status: "success",
    message: "Todos fetched successfully",
    data: todos,
  });
};

export const getSingleTodoController = async (req, res) => {
  const userId = req.user.id;
  const id = parsePositiveInt(req.params.id, "todo id");
  const todo = await getSingleTodo(id, userId);

  res.status(200).json({
    status: "success",
    message: "Todo fetched successfully",
    data: todo,
  });
};

export const updateTodoController = async (req, res) => {
  const userId = req.user.id;
  const id = parsePositiveInt(req.params.id, "todo id");
  const {
    title,
    description,
    category_id,
    priority_id,
    status_id,
    uploadImage,
    date,
    completed,
  } = req.body;

  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (uploadImage !== undefined) updateData.task_image = uploadImage;
  if (date !== undefined) updateData.date = parseDateOnly(date);
  if (category_id !== undefined) {
    updateData.category_id = parsePositiveInt(category_id, "category");
  }
  if (priority_id !== undefined) {
    updateData.priority_id = parseOptionalRelationId(priority_id, "priority");
  }
  if (status_id !== undefined) {
    updateData.status_id = parseOptionalRelationId(status_id, "status");
  }
  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      throw new BadRequestError("Invalid completed value");
    }
    updateData.completed = completed;
  }

  await updateTodo(id, userId, updateData);

  res.status(200).json({
    status: "success",
    message: "Todo updated successfully",
  });
};

export const deleteTodoController = async (req, res) => {
  const userId = req.user.id;
  const id = parsePositiveInt(req.params.id, "todo id");
  await deleteTodo(id, userId);

  res.status(200).json({
    status: "success",
    message: "Todo deleted successfully",
  });
};
