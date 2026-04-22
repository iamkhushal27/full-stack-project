const db = require("../models");
const { DatabaseError, NotFoundError } = require("../utils/error");

const Status = db.Status;

module.exports = {
  createStatus: async function ({ statusName, category_id }) {
    try {
      const status = await Status.create({
        status_name: statusName,
        category_id,
      });
      return status;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  },

  getAllStatuses: async function (category_id) {
    try {
      const statuses = await Status.findAll({
        where: { category_id },
        order: [["id", "DESC"]],
      });
      return statuses;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  },

  getStatusByName: async function ({ statusName, category_id }) {
    const status = await Status.findOne({
      where: { status_name: statusName, category_id },
    });
    return status;
  },

  getSingleStatus: async function (id, category_id) {
    try {
      const status = await Status.findOne({
        where: { id, category_id },
      });
      if (!status) {
        throw new NotFoundError("Status not found");
      }
      return status;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError(error.message);
    }
  },

  updateStatus: async function (id, category_id, data) {
    try {
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
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError(error.message);
    }
  },

  deleteStatus: async function (id, category_id) {
    try {
      const status = await Status.findOne({
        where: { id, category_id },
      });
      if (!status) {
        throw new NotFoundError("Status not found");
      }
      await status.destroy();
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError(error.message);
    }
  },
};
