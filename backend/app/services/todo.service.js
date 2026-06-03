import db from "../models/index.js";
import { NotFoundError, BadRequestError } from "../utils/error.util.js";

const Todo = db.Todo;
const Category = db.Category;
const Priority = db.Priority;
const Status = db.Status;

const todoInclude = [
  {
    model: Category,
    as: "category",
    attributes: ["id", "name"],
  },
  {
    model: Priority,
    as: "priority",
    attributes: ["id", "priority_name", "category_id"],
  },
  {
    model: Status,
    as: "status",
    attributes: ["id", "status_name", "category_id"],
  },
];

export async function getAllTodos(user_id, date) {
  const where = { user_id };
  if (date) {
    where.date = date;
  }

  const todos = await Todo.findAll({
    where,
    include: todoInclude,
    order: [["id", "DESC"]],
  });
  return todos;
}

export async function getSingleTodo(id, user_id) {
  const todo = await Todo.findOne({
    where: { id, user_id },
    include: todoInclude,
  });
  if (!todo) {
    throw new NotFoundError("Todo not found");
  }
  return todo;
}

export async function createTodo({
  title,
  description,
  task_image,
  date,
  user_id,
  category_id,
  priority_id,
  status_id,
}) {
  const category = await Category.findOne({
    where: { id: category_id, user_id },
  });
  if (!category) {
    throw new BadRequestError("Invalid category for this user");
  }

  if (priority_id) {
    const priority = await Priority.findOne({
      where: { id: priority_id, category_id },
    });
    if (!priority) {
      throw new BadRequestError("Invalid priority for selected category");
    }
  }

  if (status_id) {
    const status = await Status.findOne({
      where: { id: status_id, category_id },
    });
    if (!status) {
      throw new BadRequestError("Invalid status for selected category");
    }
  }

  const todo = await Todo.create({
    title,
    description,
    task_image,
    date,
    user_id,
    category_id,
    priority_id,
    status_id,
  });

  return todo;
}

export async function updateTodo(id, user_id, data) {
  console.log(data);
  const todo = await Todo.findOne({
    where: { id, user_id },
  });
  if (!todo) {
    throw new NotFoundError("Todo not found");
  }

  const nextCategoryId =
    data.category_id !== undefined ? data.category_id : todo.category_id;

  if (data.category_id !== undefined) {
    const category = await Category.findOne({
      where: { id: data.category_id, user_id },
    });
    if (!category) {
      throw new BadRequestError("Invalid category for this user");
    }
  }

  if (data.priority_id !== undefined && data.priority_id !== null) {
    const priority = await Priority.findOne({
      where: { id: data.priority_id, category_id: nextCategoryId },
    });
    if (!priority) {
      throw new BadRequestError("Invalid priority for selected category");
    }
  }

  if (data.status_id !== undefined && data.status_id !== null) {
    const status = await Status.findOne({
      where: { id: data.status_id, category_id: nextCategoryId },
    });
    if (!status) {
      throw new BadRequestError("Invalid status for selected category");
    }
  }

  await todo.update(data);
}

export async function deleteTodo(id, user_id) {
  const todo = await Todo.findOne({
    where: { id, user_id },
  });
  if (!todo) {
    throw new NotFoundError("Todo not found");
  }
  await todo.destroy();
}
