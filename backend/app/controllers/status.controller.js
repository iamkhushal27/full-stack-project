import {
  createStatus,
  getAllStatuses,
  getSingleStatus,
  updateStatus,
  deleteStatus,
  getStatusByName,
} from "../services/status.service.js";
import { ConflictError } from "../utils/error.util.js";
import { withTransaction } from "../utils/transaction.util.js";

export const createStatusController = async (req, res) => {
  const { categoryId } = req.params;
  const { statusName } = req.body;

  const status = await withTransaction(async (transaction) => {
    const existingStatusByName = await getStatusByName(
      { statusName, category_id: categoryId },
      { transaction },
    );
    if (existingStatusByName) {
      throw new ConflictError("Status name already exists");
    }

    return createStatus({ statusName, category_id: categoryId }, { transaction });
  });

  res.status(201).json({
    status: "success",
    message: "Status created successfully",
    data: status,
  });
};

export const getAllStatusController = async (req, res) => {
  const { categoryId } = req.params;
  const statuses = await getAllStatuses(categoryId);

  res.status(200).json({
    status: "success",
    message: "Statuses fetched successfully",
    data: statuses,
  });
};

export const getSingleStatusController = async (req, res) => {
  const { categoryId, id } = req.params;
  const status = await getSingleStatus(id, categoryId);

  res.status(200).json({
    status: "success",
    message: "Status fetched successfully",
    data: status,
  });
};

export const updateStatusController = async (req, res) => {
  const { categoryId, id } = req.params;
  const data = req.body;

  await withTransaction(async (transaction) => {
    if (data.statusName) {
      const existingStatusByName = await getStatusByName(
        { statusName: data.statusName, category_id: categoryId },
        { transaction },
      );
      if (
        existingStatusByName &&
        Number(existingStatusByName.id) !== Number(id)
      ) {
        throw new ConflictError("Status name already exists");
      }
    }

    await updateStatus(id, categoryId, data, { transaction });
  });

  res.status(200).json({
    status: "success",
    message: "Status updated successfully",
  });
};

export const deleteStatusController = async (req, res) => {
  const { categoryId, id } = req.params;

  await withTransaction(async (transaction) => {
    await deleteStatus(id, categoryId, { transaction });
  });

  res.status(200).json({
    status: "success",
    message: "Status deleted successfully",
  });
};
