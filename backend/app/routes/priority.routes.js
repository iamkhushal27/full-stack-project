import express from "express";
import { Auth } from "../middleware/auth.middleware.js";
import {
  createPriorityController,
  getAllPriorityController,
  getSinglePriorityController,
  updatePriorityController,
  deletePriorityController,
} from "../controllers/priority.controller.js";
import { validate } from "../middleware/schema.middleware.js";
import {
  updatePrioritySchema,
  createPrioritySchema,
} from "../schemas/priority.schema.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  Auth,
  validate(createPrioritySchema),
  createPriorityController
);
router.get("/", Auth, getAllPriorityController);
router.get("/:id", Auth, getSinglePriorityController);
router.patch(
  "/:id",
  Auth,
  validate(updatePrioritySchema),
  updatePriorityController
);
router.delete("/:id", Auth, deletePriorityController);

export default router;
