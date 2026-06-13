import db from "../models/index.js";
import { NotFoundError } from "../utils/error.util.js";

const Priority = db.Priority;

export async function createPriority({ priorityName, category_id }, { transaction } = {}) {
  const priority = await Priority.create(
    {
      priority_name: priorityName,
      category_id,
    },
    { transaction },
  );
  return priority;
}

export async function getAllPriorities(category_id, { transaction } = {}) {
  const priorities = await Priority.findAll({
    where: { category_id },
    order: [["id", "DESC"]],
    transaction,
  });
  return priorities;
}

export async function getPriorityByName({ priorityName, category_id }, { transaction } = {}) {
  const priority = await Priority.findOne({
    where: { priority_name: priorityName, category_id },
    transaction,
  });

  return priority;
}

export async function getSinglePriority(id, category_id, { transaction } = {}) {
  const priority = await Priority.findOne({
    where: { id, category_id },
    transaction,
  });
  if (!priority) {
    throw new NotFoundError("Priority not found");
  }
  return priority;
}

export async function updatePriority(id, category_id, data, { transaction } = {}) {
  const priority = await Priority.findOne({
    where: { id, category_id },
    transaction,
  });

  if (!priority) {
    throw new NotFoundError("Priority not found");
  }
  const updateData = {
    priority_name: data.priorityName,
  };

  await priority.update(updateData, { transaction });
}

export async function deletePriority(id, category_id, { transaction } = {}) {
  const priority = await Priority.findOne({
    where: { id, category_id },
    transaction,
  });
  if (!priority) {
    throw new NotFoundError("Priority not found");
  }
  await priority.destroy({ transaction });
}
