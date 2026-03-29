const db = require("../models");
const { DatabaseError } = require("../utils/error");

const Todo = db.Todo;

module.exports = {
  createTodo: async function ({ title, description, role, task_image, date, user_id }) {
    try {
      const todo = await Todo.create({
        title,
        description,
        role,
        task_image,
        date,
        user_id,
      });

      return todo;
    } catch (error) {
      // Wrap low-level DB issues in a consistent error type
      throw new DatabaseError(error.message);
    }
  },
};

