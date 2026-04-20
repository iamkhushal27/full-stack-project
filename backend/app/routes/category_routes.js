const express = require("express");
const { Auth } = require("../middleware/auth.middleware");
const {
  createCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/category_controller");
const statusRouter = require("./status_routes");
const priorityRouter = require("./priority_routes");

const router = express.Router({ mergeParams: true });

router.post("/", Auth, createCategoryController);
router.get("/", Auth, getAllCategoryController);
router.get("/:id", Auth, getSingleCategoryController);
router.patch("/:id", Auth, updateCategoryController);
router.delete("/:id", Auth, deleteCategoryController);
router.use("/:categoryId/status", statusRouter);
router.use("/:categoryId/priority", priorityRouter);

module.exports = router;
