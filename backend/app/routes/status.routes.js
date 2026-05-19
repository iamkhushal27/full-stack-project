import express from "express";
import { Auth } from "../middleware/auth.middleware.js";
import {
  createStatusController,
  getAllStatusController,
  getSingleStatusController,
  updateStatusController,
  deleteStatusController,
} from "../controllers/status.controller.js";
import { validate } from "../middleware/schema.middleware.js";
import {
  createStatusSchema,
  updateStatusSchema,
} from "../schemas/status.schema.js";

const router = express.Router({ mergeParams: true });

router.post("/", Auth, validate(createStatusSchema), createStatusController);
router.get("/", Auth, getAllStatusController);
router.get("/:id", Auth, getSingleStatusController);
router.patch(
  "/:id",
  Auth,
  validate(updateStatusSchema),
  updateStatusController
);
router.delete("/:id", Auth, deleteStatusController);

export default router;
