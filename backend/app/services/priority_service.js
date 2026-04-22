const db = require("../models");
const { DatabaseError, NotFoundError } = require("../utils/error");

const Priority = db.Priority;

module.exports = {
  createPriority: async function ({ priorityName, category_id }) {
    try {
      console.log(priorityName, "in service");
      const priority = await Priority.create({
        priority_name: priorityName,
        category_id,
      });
      return priority;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  },

  getAllPriorities: async function (category_id) {
    try {
      const priorities = await Priority.findAll({
        where: { category_id },
        order: [["id", "DESC"]],
      });
      return priorities;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  },

  getPriorityByName: async function ({ priorityName, category_id }) {
    const priority = await Priority.findOne({
      where: { priority_name: priorityName, category_id },
    });

    return priority;
  },

  getSinglePriority: async function (id, category_id) {
    try {
      const priority = await Priority.findOne({
        where: { id, category_id },
      });
      if (!priority) {
        throw new NotFoundError("Priority not found");
      }
      return priority;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError(error.message);
    }
  },

  updatePriority: async function (id, category_id, data) {
    try {
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
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError(error.message);
    }
  },

  deletePriority: async function (id, category_id) {
    try {
      const priority = await Priority.findOne({
        where: { id, category_id },
      });
      if (!priority) {
        throw new NotFoundError("Priority not found");
      }
      await priority.destroy();
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError(error.message);
    }
  },
};
