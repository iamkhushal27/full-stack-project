import {
  createPriority,
  getAllPriorities,
  getSinglePriority,
  updatePriority,
  deletePriority,
  getPriorityByName,
} from "../services/priority.service.js";
import { BadRequestError, ConflictError } from "../utils/error.util.js";

export const createPriorityController = async (req, res) => {
  const { categoryId } = req.params;
  const { priorityName } = req.body;

  const existingPriorityByName = await getPriorityByName({
    priorityName,
    category_id: categoryId,
  });
  if (existingPriorityByName) {
    throw new ConflictError("Priority name already exists");
  }

  const priority = await createPriority({
    priorityName,
    category_id: categoryId,
  });

  res.status(201).json({
    status: "success",
    message: "Priority created successfully",
    data: priority,
  });
};

export const getAllPriorityController = async (req, res) => {
  const { categoryId } = req.params;
  const priorities = await getAllPriorities(categoryId);

  res.status(200).json({
    status: "success",
    message: "Priorities fetched successfully",
    data: priorities,
  });
};

export const getSinglePriorityController = async (req, res) => {
  const { categoryId, id } = req.params;
  const priority = await getSinglePriority(id, categoryId);

  res.status(200).json({
    status: "success",
    message: "Priority fetched successfully",
    data: priority,
  });
};

export const updatePriorityController = async (req, res) => {
  const { categoryId, id } = req.params;
  const data = req.body;

  if (data.priorityName) {
    const existingPriorityByName = await getPriorityByName({
      priorityName: data.priorityName,
      category_id: categoryId,
    });

    if (
      existingPriorityByName &&
      Number(existingPriorityByName.id) !== Number(id)
    ) {
      throw new ConflictError("Priority name already exists");
    }
  }

  await updatePriority(id, categoryId, data);
  res.status(200).json({
    status: "success",
    message: "Priority updated successfully",
  });
};

export const deletePriorityController = async (req, res) => {
  const { categoryId, id } = req.params;
  await deletePriority(id, categoryId);

  res.status(200).json({
    status: "success",
    message: "Priority deleted successfully",
  });
};
