import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./app/middleware/error.middleware.js";
import routes from "./app/routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/api", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📁 Database: ${process.env.DB_NAME}`);
});
