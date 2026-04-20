const express = require("express");
const { Auth } = require("../middleware/auth.middleware");
const {
  createPriorityController,
  getAllPriorityController,
  getSinglePriorityController,
  updatePriorityController,
  deletePriorityController,
} = require("../controllers/priority_controller");

const router = express.Router({ mergeParams: true });

router.post("/", Auth, createPriorityController);
router.get("/", Auth, getAllPriorityController);
router.get("/:id", Auth, getSinglePriorityController);
router.patch("/:id", Auth, updatePriorityController);
router.delete("/:id", Auth, deletePriorityController);

module.exports = router;
