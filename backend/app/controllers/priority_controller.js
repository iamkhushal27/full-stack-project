const {
  createPriority,
  getAllPriorities,
  getSinglePriority,
  updatePriority,
  deletePriority,
  getPriorityByName,
} = require("../services/priority_service");
const { BadRequestError, ConflictError } = require("../utils/error");

module.exports = {
  createPriorityController: async function (req, res, next) {
    try {
      const { categoryId } = req.params;
      const { priorityName } = req.body;
      console.log(req.body);
      console.log(categoryId);

      if (!priorityName) {
        throw new BadRequestError("Priority name is required");
      }

      const existingPriorityByName = await getPriorityByName({
        priorityName,
        category_id: categoryId,
      });
      if (existingPriorityByName) {
        throw new ConflictError("Priority name already exists");
      }
      console.log(priorityName, "iwie");
      const priority = await createPriority({
        priorityName,
        category_id: categoryId,
      });

      res.status(201).json({
        status: "success",
        message: "Priority created successfully",
        data: priority,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllPriorityController: async function (req, res, next) {
    try {
      const { categoryId } = req.params;
      const priorities = await getAllPriorities(categoryId);

      res.status(200).json({
        status: "success",
        message: "Priorities fetched successfully",
        data: priorities,
      });
    } catch (error) {
      next(error);
    }
  },

  getSinglePriorityController: async function (req, res, next) {
    try {
      const { categoryId, id } = req.params;
      const priority = await getSinglePriority(id, categoryId);

      res.status(200).json({
        status: "success",
        message: "Priority fetched successfully",
        data: priority,
      });
    } catch (error) {
      next(error);
    }
  },

  updatePriorityController: async function (req, res, next) {
    try {
      const { categoryId, id } = req.params;
      const data = req.body;

      if (!Object.keys(data).length) {
        throw new BadRequestError("Update data is required");
      }

      if (data.priorityName) {
        const existingPriorityByName = await getPriorityByName({
          priorityName: data.priorityName,
          category_id: categoryId,
        });

        if (
          existingPriorityByName &&
          Number(existingPriorityByName.id) !== Number(id)
        ) {
          throw new ConflictError("Priority name already exists");
        }
      }

      const prioirty = await updatePriority(id, categoryId, data);
      console.log(prioirty);

      res.status(200).json({
        status: "success",
        message: "Priority updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  deletePriorityController: async function (req, res, next) {
    try {
      const { categoryId, id } = req.params;
      await deletePriority(id, categoryId);

      res.status(200).json({
        status: "success",
        message: "Priority deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
