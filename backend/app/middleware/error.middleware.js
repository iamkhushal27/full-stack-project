import { AppError } from "../utils/error.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errorCode: err.errorCode,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export default errorHandler;
