const { AppError } = require("../utils/error");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // If it is our custom error
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errorCode: err.errorCode,
    });
  }

  // Unknown error
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

module.exports = errorHandler;
