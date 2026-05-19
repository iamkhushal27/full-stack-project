const express = require("express");
const { Auth } = require("../middleware/auth.middleware");
const {
  createStatusController,
  getAllStatusController,
  getSingleStatusController,
  updateStatusController,
  deleteStatusController,
} = require("../controllers/status_controller");
const { validate } = require("../middleware/schema.middleware");
const {
  createStatusSchema,
  updateStatusSchema,
} = require("../schemas/status.schema");

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

module.exports = router;
