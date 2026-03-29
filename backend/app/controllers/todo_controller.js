const { createTodo } = require("../services/todo_service");
const { BadRequestError } = require("../utils/error");

module.exports = {
  createTodoController: async function (req, res, next) {
    try {
      const user = req.user;

      const { title, description, priority, uploadImage, date } = req.body;

      if (!title || !description || !priority || !uploadImage || !date) {
        throw new BadRequestError(
          "Title, description, date, priority and image are required"
        );
      }

      const role = String(priority).toLowerCase();
      const allowedRoles = ["extreme", "moderate", "low"];
      if (!allowedRoles.includes(role)) {
        throw new BadRequestError("Invalid priority value");
      }

      const parsedDate = new Date(date);
      if (Number.isNaN(parsedDate.getTime())) {
        throw new BadRequestError("Invalid date");
      }
      const dateOnly = parsedDate.toISOString().slice(0, 10); // YYYY-MM-DD

      const todo = await createTodo({
        title,
        description,
        role,
        task_image: uploadImage,
        date: dateOnly,
        user_id: user.id,
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
};

