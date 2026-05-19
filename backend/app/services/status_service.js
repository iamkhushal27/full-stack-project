const db = require("../models");
const { NotFoundError } = require("../utils/error");

const Status = db.Status;

module.exports = {
  createStatus: async function ({ statusName, category_id }) {
    const status = await Status.create({
      status_name: statusName,
      category_id,
    });
    return status;
  },

  getAllStatuses: async function (category_id) {
    const statuses = await Status.findAll({
      where: { category_id },
      order: [["id", "DESC"]],
    });
    return statuses;
  },

  getStatusByName: async function ({ statusName, category_id }) {
    const status = await Status.findOne({
      where: { status_name: statusName, category_id },
    });
    return status;
  },

  getSingleStatus: async function (id, category_id) {
    const status = await Status.findOne({
      where: { id, category_id },
    });
    if (!status) {
      throw new NotFoundError("Status not found");
    }
    return status;
  },

  updateStatus: async function (id, category_id, data) {
    const status = await Status.findOne({
      where: { id, category_id },
    });
    if (!status) {
      throw new NotFoundError("Status not found");
    }
    const updateData = {
      status_name: data.statusName,
    };
    await status.update(updateData);
  },

  deleteStatus: async function (id, category_id) {
    const status = await Status.findOne({
      where: { id, category_id },
    });
    if (!status) {
      throw new NotFoundError("Status not found");
    }
    await status.destroy();
  },
};
