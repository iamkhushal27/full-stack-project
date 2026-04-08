import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./app/middleware/error.middleware.js";
import userRouter from "./app/routes/user_routes.js";
import fileUplaodRouter from "./app/routes/file_routes.js";
import todoRouter from "./app/routes/todo_routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }))
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(errorHandler);
app.use("/api/users", userRouter);
app.use("/api/fileuploading", fileUplaodRouter);
app.use("/api/todo", todoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📁 Database: ${process.env.DB_NAME}`);
});
