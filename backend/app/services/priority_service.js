const db = require("../models");
const { NotFoundError } = require("../utils/error");

const Priority = db.Priority;

module.exports = {
  createPriority: async function ({ priorityName, category_id }) {
    console.log(priorityName, "in service");
    const priority = await Priority.create({
      priority_name: priorityName,
      category_id,
    });
    return priority;
  },

  getAllPriorities: async function (category_id) {
    const priorities = await Priority.findAll({
      where: { category_id },
      order: [["id", "DESC"]],
    });
    return priorities;
  },

  getPriorityByName: async function ({ priorityName, category_id }) {
    const priority = await Priority.findOne({
      where: { priority_name: priorityName, category_id },
    });

    return priority;
  },

  getSinglePriority: async function (id, category_id) {
    const priority = await Priority.findOne({
      where: { id, category_id },
    });
    if (!priority) {
      throw new NotFoundError("Priority not found");
    }
    return priority;
  },

  updatePriority: async function (id, category_id, data) {
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
  },

  deletePriority: async function (id, category_id) {
    const priority = await Priority.findOne({
      where: { id, category_id },
    });
    if (!priority) {
      throw new NotFoundError("Priority not found");
    }
    await priority.destroy();
  },
};
