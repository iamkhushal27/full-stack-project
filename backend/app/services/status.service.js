import db from "../models/index.js";
import { NotFoundError } from "../utils/error.util.js";

const Status = db.Status;

export async function createStatus({ statusName, category_id }, { transaction } = {}) {
  const status = await Status.create(
    {
      status_name: statusName,
      category_id,
    },
    { transaction },
  );
  return status;
}

export async function getAllStatuses(category_id, { transaction } = {}) {
  const statuses = await Status.findAll({
    where: { category_id },
    order: [["id", "DESC"]],
    transaction,
  });
  return statuses;
}

export async function getStatusByName({ statusName, category_id }, { transaction } = {}) {
  const status = await Status.findOne({
    where: { status_name: statusName, category_id },
    transaction,
  });
  return status;
}

export async function getSingleStatus(id, category_id, { transaction } = {}) {
  const status = await Status.findOne({
    where: { id, category_id },
    transaction,
  });
  if (!status) {
    throw new NotFoundError("Status not found");
  }
  return status;
}

export async function updateStatus(id, category_id, data, { transaction } = {}) {
  const status = await Status.findOne({
    where: { id, category_id },
    transaction,
  });
  if (!status) {
    throw new NotFoundError("Status not found");
  }
  const updateData = {
    status_name: data.statusName,
  };
  await status.update(updateData, { transaction });
}

export async function deleteStatus(id, category_id, { transaction } = {}) {
  const status = await Status.findOne({
    where: { id, category_id },
    transaction,
  });
  if (!status) {
    throw new NotFoundError("Status not found");
  }
  await status.destroy({ transaction });
}
