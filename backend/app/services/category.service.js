import db from "../models/index.js";
import { NotFoundError } from "../utils/error.util.js";

const Category = db.Category;

export async function createCategory({ name, user_id }, { transaction } = {}) {
  const category = await Category.create({ name, user_id }, { transaction });
  return category;
}

export async function getAllCategories(user_id, { transaction } = {}) {
  const categories = await Category.findAll({
    where: { user_id: user_id },
    order: [["id", "DESC"]],
    transaction,
  });
  return categories;
}

export async function getCategoryByName({ name, user_id }, { transaction } = {}) {
  const category = await Category.findOne({
    where: { name, user_id },
    transaction,
  });
  return category;
}

export async function getSingleCategory(id, user_id, { transaction } = {}) {
  const category = await Category.findOne({
    where: { id, user_id: user_id },
    transaction,
  });
  if (!category) {
    throw new NotFoundError("Category not found");
  }
  return category;
}

export async function updateCategory(id, userId, data, { transaction } = {}) {
  const category = await Category.findOne({
    where: { id, user_id: userId },
    transaction,
  });
  if (!category) {
    throw new NotFoundError("Category not found");
  }
  await category.update(data, { transaction });
  return category;
}

export async function deleteCategory(id, user_id, { transaction } = {}) {
  const category = await Category.findOne({
    where: { id, user_id: user_id },
    transaction,
  });
  if (!category) {
    throw new NotFoundError("Category not found");
  }
  await category.destroy({ transaction });
}
