import {
  createStatus,
  getAllStatuses,
  getSingleStatus,
  updateStatus,
  deleteStatus,
  getStatusByName,
} from "../services/status.service.js";
import { BadRequestError, ConflictError } from "../utils/error.util.js";

export const createStatusController = async (req, res) => {
  const { categoryId } = req.params;
  const { statusName } = req.body;

 

  const existingStatusByName = await getStatusByName({
    statusName,
    category_id: categoryId,
  });
  if (existingStatusByName) {
    throw new ConflictError("Status name already exists");
  }

  const status = await createStatus({ statusName, category_id: categoryId });

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

  if (data.statusName) {
    const existingStatusByName = await getStatusByName({
      statusName: data.statusName,
      category_id: categoryId,
    });
    if (
      existingStatusByName &&
      Number(existingStatusByName.id) !== Number(id)
    ) {
      throw new ConflictError("Status name already exists");
    }
  }

  const status = await updateStatus(id, categoryId, data);

  res.status(200).json({
    status: "success",
    message: "Status updated successfully",
    data: status,
  });
};

export const deleteStatusController = async (req, res) => {
  const { categoryId, id } = req.params;
  await deleteStatus(id, categoryId);

  res.status(200).json({
    status: "success",
    message: "Status deleted successfully",
  });
};
