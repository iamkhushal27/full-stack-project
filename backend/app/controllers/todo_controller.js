const {
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} = require("../services/todo_service");
const { BadRequestError } = require("../utils/error");
const {
  parseDateOnly,
  parsePositiveInt,
  parseOptionalRelationId,
} = require("../utils/parsingFunction");

parseOptionalRelationId;

module.exports = {
  createTodoController: async function (req, res, next) {
    try {
      const user = req.user;

      const {
        title,
        description,
        category,
        priority,
        status,
        uploadImage,
        date,
      } = req.body;

      if (!title || !description || !category || !uploadImage || !date) {
        throw new BadRequestError(
          "Title, description, date, category and image are required"
        );
      }

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
    } catch (error) {
      next(error);
    }
  },

  getAllTodoController: async function (req, res, next) {
    try {
      const userId = req.user.id;
      const date = req.query.date ? parseDateOnly(req.query.date) : undefined;
      const todos = await getAllTodos(userId, date);
      res.status(200).json({
        status: "success",
        message: "Todos fetched successfully",
        data: todos,
      });
    } catch (error) {
      next(error);
    }
  },

  getSingleTodoController: async function (req, res, next) {
    try {
      const userId = req.user.id;
      const id = parsePositiveInt(req.params.id, "todo id");
      const todo = await getSingleTodo(id, userId);

      res.status(200).json({
        status: "success",
        message: "Todo fetched successfully",
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  },

  updateTodoController: async function (req, res, next) {
    try {
      const userId = req.user.id;
      const id = parsePositiveInt(req.params.id, "todo id");
      const {
        title,
        description,
        category,
        priority,
        status,
        uploadImage,
        date,
        completed,
      } = req.body;

      const updateData = {};

      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (uploadImage !== undefined) updateData.task_image = uploadImage;
      if (date !== undefined) updateData.date = parseDateOnly(date);
      if (category !== undefined) {
        updateData.category_id = parsePositiveInt(category, "category");
      }
      if (priority !== undefined) {
        updateData.priority_id = parseOptionalRelationId(priority, "priority");
      }
      if (status !== undefined) {
        updateData.status_id = parseOptionalRelationId(status, "status");
      }
      if (completed !== undefined) {
        if (typeof completed !== "boolean") {
          throw new BadRequestError("Invalid completed value");
        }
        updateData.completed = completed;
      }

      if (!Object.keys(updateData).length) {
        throw new BadRequestError("Update data is required");
      }

      const todo = await updateTodo(id, userId, updateData);

      res.status(200).json({
        status: "success",
        message: "Todo updated successfully",
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteTodoController: async function (req, res, next) {
    try {
      const userId = req.user.id;
      console.log(req.params.id);
      const id = parsePositiveInt(req.params.id, "todo id");
      console.log(id);
      await deleteTodo(id, userId);

      res.status(200).json({
        status: "success",
        message: "Todo deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
