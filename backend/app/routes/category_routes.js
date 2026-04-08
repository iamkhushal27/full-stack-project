const express = require("express");
const { Auth } = require("../middleware/auth.middleware");
const {
  createCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/category_controller");

const router = express.Router();

router.post("/", Auth, createCategoryController);
router.get("/", Auth, getAllCategoryController);
router.get("/:id", Auth, getSingleCategoryController);
router.patch("/:id", Auth, updateCategoryController);
router.delete("/:id", Auth, deleteCategoryController);

module.exports = router;
