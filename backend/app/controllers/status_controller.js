const {
  createStatus,
  getAllStatuses,
  getSingleStatus,
  updateStatus,
  deleteStatus,
  getStatusByName,
} = require("../services/status_service");
const { BadRequestError, ConflictError } = require("../utils/error");

module.exports = {
  createStatusController: async function (req, res, next) {
    try {
      const { categoryId } = req.params;
      const { statusName } = req.body;
      
      if (!statusName) {
        throw new BadRequestError("Status name is required");
      }

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
    } catch (error) {
      next(error);
    }
  },

  getAllStatusController: async function (req, res, next) {
    try {
      const { categoryId } = req.params;
      const statuses = await getAllStatuses(categoryId);

      res.status(200).json({
        status: "success",
        message: "Statuses fetched successfully",
        data: statuses,
      });
    } catch (error) {
      next(error);
    }
  },

  getSingleStatusController: async function (req, res, next) {
    try {
      const { categoryId, id } = req.params;
      const status = await getSingleStatus(id, categoryId);

      res.status(200).json({
        status: "success",
        message: "Status fetched successfully",
        data: status,
      });
    } catch (error) {
      next(error);
    }
  },

  updateStatusController: async function (req, res, next) {
    try {
      const { categoryId, id } = req.params;
      const data = req.body;

      if (!Object.keys(data).length) {
        throw new BadRequestError("Update data is required");
      }

      if (data.statusName) {
        const existingStatusByName = await getStatusByName({
          statusName: data.statusName,
          category_id: categoryId,
        });
        if (existingStatusByName && Number(existingStatusByName.id) !== Number(id)) {
          throw new ConflictError("Status name already exists");
        }
      }

      const status = await updateStatus(id, categoryId, data);

      res.status(200).json({
        status: "success",
        message: "Status updated successfully",
        data: status,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteStatusController: async function (req, res, next) {
    try {
      const { categoryId, id } = req.params;
      await deleteStatus(id, categoryId);

      res.status(200).json({
        status: "success",
        message: "Status deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
