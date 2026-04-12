const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../services/category_service");
const { BadRequestError } = require("../utils/error");

module.exports = {
  createCategoryController: async function (req, res, next) {
    try {
      const userId = req.user.id;
      const { name } = req.body;

      if (!name) {
        throw new BadRequestError("Category name is required");
      }

      const category = await createCategory({ name, user_id: userId });

      res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllCategoryController: async function (req, res, next) {
    try {
      const userId = req.user.id;
      const categories = await getAllCategories(userId);

      res.status(200).json({
        status: "success",
        message: "Categories fetched successfully",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  },

  getSingleCategoryController: async function (req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const category = await getSingleCategory(id, userId);

      res.status(200).json({
        status: "success",
        message: "Category fetched successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  },

  updateCategoryController: async function (req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const data = req.body;

      if (!Object.keys(data).length) {
        throw new BadRequestError("Update data is required");
      }

      const category = await updateCategory(id, userId, data);

      res.status(200).json({
        status: "success",
        message: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteCategoryController: async function (req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      await deleteCategory(id, userId);

      res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
