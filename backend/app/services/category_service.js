const db = require("../models");
const { DatabaseError, NotFoundError } = require("../utils/error");

const Category = db.Category;

module.exports = {
  createCategory: async function ({ name }) {
    try {
      const category = await Category.create({ name });
      return category;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  },

  getAllCategories: async function () {
    try {
      const categories = await Category.findAll({
        order: [["id", "DESC"]],
      });
      return categories;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  },

  getSingleCategory: async function (id) {
    try {
      const category = await Category.findByPk(id);
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

  updateCategory: async function (id, data) {
    try {
      const category = await Category.findByPk(id);
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

  deleteCategory: async function (id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new NotFoundError("Category not found");
      }
      await category.destroy();
      return true;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError(error.message);
    }
  },
};
