import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  getCategoryByName,
} from "../services/category.service.js";
import { BadRequestError, ConflictError } from "../utils/error.js";

export const createCategoryController = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name) {
    throw new BadRequestError("Category name is required");
  }

  const existingCategoryByName = await getCategoryByName({
    name,
    user_id: userId,
  });
  if (existingCategoryByName) {
    throw new ConflictError("Category Name alredy exists");
  }
  const category = await createCategory({ name, user_id: userId });

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
  console.log(id, data);

  if (!Object.keys(data).length) {
    throw new BadRequestError("Update data is required");
  }
  const existingCategoryByName = await getCategoryByName({
    name: data.name,
    user_id: userId,
  });
  if (existingCategoryByName) {
    throw new ConflictError("Category Name alredy exists");
  }
  const category = await updateCategory(id, userId, data);

  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    data: category,
  });
};

export const deleteCategoryController = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  await deleteCategory(id, userId);

  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
  });
};
