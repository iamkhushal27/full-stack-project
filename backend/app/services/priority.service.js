import db from "../models/index.js";
import { NotFoundError } from "../utils/error.util.js";

const Priority = db.Priority;

export async function createPriority({ priorityName, category_id }) {
  console.log(priorityName, "in service");
  const priority = await Priority.create({
    priority_name: priorityName,
    category_id,
  });
  return priority;
}

export async function getAllPriorities(category_id) {
  const priorities = await Priority.findAll({
    where: { category_id },
    order: [["id", "DESC"]],
  });
  return priorities;
}

export async function getPriorityByName({ priorityName, category_id }) {
  const priority = await Priority.findOne({
    where: { priority_name: priorityName, category_id },
  });

  return priority;
}

export async function getSinglePriority(id, category_id) {
  const priority = await Priority.findOne({
    where: { id, category_id },
  });
  if (!priority) {
    throw new NotFoundError("Priority not found");
  }
  return priority;
}

export async function updatePriority(id, category_id, data) {
  const priority = await Priority.findOne({
    where: { id, category_id },
  });

  if (!priority) {
    throw new NotFoundError("Priority not found");
  }
  const updateData = {
    priority_name: data.priorityName,
  };

  await priority.update(updateData);
}

export async function deletePriority(id, category_id) {
  const priority = await Priority.findOne({
    where: { id, category_id },
  });
  if (!priority) {
    throw new NotFoundError("Priority not found");
  }
  await priority.destroy();
}
