import express from "express";

import userRouter from "./user.route.js";
import categoryRouter from "./category.route.js";
import todoRouter from "./todo.route.js";
import fileUplaodRouter from "./file.route.js";


const router = express.Router();

router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/todos", todoRouter);
router.use("/fileuploading", fileUplaodRouter);

export default router;
