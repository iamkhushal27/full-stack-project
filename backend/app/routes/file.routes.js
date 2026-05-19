import { Auth } from "../middleware/auth.middleware.js";
import express from "express";
import { upload } from "../middleware/fileuploading.middleware.js";
import { fileUpload } from "../controllers/file.controller.js";

const router = express.Router();

router.post("/", Auth, upload.single("images"), fileUpload);

export default router;
