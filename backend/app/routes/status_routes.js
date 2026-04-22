const express = require("express");
const { Auth } = require("../middleware/auth.middleware");
const {
  createStatusController,
  getAllStatusController,
  getSingleStatusController,
  updateStatusController,
  deleteStatusController,
} = require("../controllers/status_controller");

const router = express.Router({ mergeParams: true });

router.post("/", Auth, createStatusController);
router.get("/", Auth, getAllStatusController);
router.get("/:id", Auth, getSingleStatusController);
router.patch("/:id", Auth, updateStatusController);
router.delete("/:id", Auth, deleteStatusController);

module.exports = router;
