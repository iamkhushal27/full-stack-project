import {
  createPriority,
  getAllPriorities,
  getSinglePriority,
  updatePriority,
  deletePriority,
  getPriorityByName,
} from "../services/priority.service.js";
import { ConflictError } from "../utils/error.util.js";
import { withTransaction } from "../utils/transaction.util.js";

export const createPriorityController = async (req, res) => {
  const { categoryId } = req.params;
  const { priorityName } = req.body;

  const priority = await withTransaction(async (transaction) => {
    const existingPriorityByName = await getPriorityByName(
      { priorityName, category_id: categoryId },
      { transaction },
    );
    if (existingPriorityByName) {
      throw new ConflictError("Priority name already exists");
    }

    return createPriority({ priorityName, category_id: categoryId }, { transaction });
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

  await withTransaction(async (transaction) => {
    if (data.priorityName) {
      const existingPriorityByName = await getPriorityByName(
        { priorityName: data.priorityName, category_id: categoryId },
        { transaction },
      );

      if (
        existingPriorityByName &&
        Number(existingPriorityByName.id) !== Number(id)
      ) {
        throw new ConflictError("Priority name already exists");
      }
    }

    await updatePriority(id, categoryId, data, { transaction });
  });

  res.status(200).json({
    status: "success",
    message: "Priority updated successfully",
  });
};

export const deletePriorityController = async (req, res) => {
  const { categoryId, id } = req.params;

  await withTransaction(async (transaction) => {
    await deletePriority(id, categoryId, { transaction });
  });

  res.status(200).json({
    status: "success",
    message: "Priority deleted successfully",
  });
};
