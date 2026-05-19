import express from "express";
import { Auth } from "../middleware/auth.middleware.js";
import {
  createCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.controller.js";
import statusRouter from "./status.routes.js";
import priorityRouter from "./priority.routes.js";
import { validate } from "../middleware/schema.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  Auth,
  validate(createCategorySchema),
  createCategoryController
);
router.get("/", Auth, getAllCategoryController);
router.get("/:id", Auth, getSingleCategoryController);
router.patch(
  "/:id",
  Auth,
  validate(updateCategorySchema),
  updateCategoryController
);
router.delete("/:id", Auth, deleteCategoryController);

router.use("/:categoryId/status", statusRouter);
router.use("/:categoryId/priority", priorityRouter);

export default router;
