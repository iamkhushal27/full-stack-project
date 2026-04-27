const { Auth } = require("../middleware/auth.middleware");
const express = require("express");
const { upload } = require("../middleware/fileuploading.middleware");
const {
    fileUpload
  } = require("../controllers/file_controller");


const router = express.Router();

router.post("/", Auth, upload.single("images"),fileUpload );

module.exports = router;
