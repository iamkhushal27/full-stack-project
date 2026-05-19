const express = require("express");
const { Auth } = require("../middleware/auth.middleware");
const {
  createPriorityController,
  getAllPriorityController,
  getSinglePriorityController,
  updatePriorityController,
  deletePriorityController,
} = require("../controllers/priority_controller");
const { validate } = require("../middleware/schema.middleware");
const {
  updatePrioritySchema,
  createPrioritySchema,
} = require("../schemas/priority.schema");

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

module.exports = router;
