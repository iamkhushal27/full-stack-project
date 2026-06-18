import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  getCategoryByName,
} from "../services/category.service.js";
import { BadRequestError, ConflictError } from "../utils/error.util.js";
import { withTransaction } from "../utils/transaction.util.js";

export const createCategoryController = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  const category = await withTransaction(async (transaction) => {
    const existingCategoryByName = await getCategoryByName(
      { name, user_id: userId },
      { transaction },
    );
    if (existingCategoryByName) {
      throw new ConflictError("Category Name alredy exists");
    }

    return createCategory({ name, user_id: userId }, { transaction });
  });

  res.status(201).json({
    status: "success",
    message: "Category created successfully",
    data: category,
  });
};

export const getAllCategoryController = async (req, res) => {
  const userId = req.user.id;
  const categories = await getAllCategories(userId);

  res.status(200).json({
    status: "success",
    message: "Categories fetched successfully",
    data: categories,
  });
};

export const getSingleCategoryController = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const category = await getSingleCategory(id, userId);

  res.status(200).json({
    status: "success",
    message: "Category fetched successfully",
    data: category,
  });
};

export const updateCategoryController = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const data = req.body;

  if (!Object.keys(data).length) {
    throw new BadRequestError("Update data is required");
  }

  const category = await withTransaction(async (transaction) => {
    const existingCategoryByName = await getCategoryByName(
      { name: data.name, user_id: userId },
      { transaction },
    );
    if (existingCategoryByName) {
      throw new ConflictError("Category Name alredy exists");
    }

    return updateCategory(id, userId, data, { transaction });
  });

  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    data: category,
  });
};

export const deleteCategoryController = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  await withTransaction(async (transaction) => {
    await deleteCategory(id, userId, { transaction });
  });

  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
  });
};
