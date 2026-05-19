const db = require("../models");
const { NotFoundError } = require("../utils/error");

const Category = db.Category;

module.exports = {
  createCategory: async function ({ name, user_id }) {
    const category = await Category.create({ name, user_id });
    return category;
  },

  getAllCategories: async function (user_id) {
    const categories = await Category.findAll({
      where: { user_id: user_id },
      order: [["id", "DESC"]],
    });
    return categories;
  },

  getCategoryByName: async function ({ name, user_id }) {
    const category = await Category.findOne({
      where: { name, user_id },
    });
    return category;
  },
  getSingleCategory: async function (id, user_id) {
    const category = await Category.findOne({
      where: { id, user_id: user_id },
    });
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    return category;
  },

  updateCategory: async function (id, userId, data) {
    const category = await Category.findOne({
      where: { id, user_id: userId },
    });
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    await category.update(data);
    return category;
  },

  deleteCategory: async function (id, user_id) {
    const category = await Category.findOne({
      where: { id, user_id: user_id },
    });
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    await category.destroy();
  },
};
