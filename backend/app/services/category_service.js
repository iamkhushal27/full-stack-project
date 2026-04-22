const db = require("../models");
const { DatabaseError, NotFoundError } = require("../utils/error");

const Category = db.Category;

module.exports = {
  createCategory: async function ({ name, user_id }) {
    try {
      const category = await Category.create({ name, user_id });
      return category;
    } catch (error) {
      throw new DatabaseError(error);
    }
  },

  getAllCategories: async function (user_id) {
    try {
      const categories = await Category.findAll({
        where: { user_id: user_id },
        order: [["id", "DESC"]],
      });
      return categories;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  },

  getCategoryByName: async function ({ name, user_id }) {
    const category = await Category.findOne({
      where: { name, user_id },
    });
    return category;
  },
  getSingleCategory: async function (id, user_id) {
    try {
      const category = await Category.findOne({
        where: { id, user_id: user_id },
      });
      if (!category) {
        throw new NotFoundError("Category not found");
      }
      return category;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError(error.message);
    }
  },

  updateCategory: async function (id, userId, data) {
    try {
      const category = await Category.findOne({
        where: { id, user_id: userId },
      });
      if (!category) {
        throw new NotFoundError("Category not found");
      }
      await category.update(data);
      return category;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError(error.message);
    }
  },

  deleteCategory: async function (id, user_id) {
    try {
      const category = await Category.findOne({
        where: { id, user_id: user_id },
      });
      if (!category) {
        throw new NotFoundError("Category not found");
      }
      await category.destroy();
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError(error.message);
    }
  },
};
