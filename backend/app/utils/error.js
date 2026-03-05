class AppError extends Error {
    constructor(message, statusCode, errorCode) {
      super(message);
  
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  /* ===============================
     4xx Errors
  ================================= */
  
  class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
      super(message, 400, "BAD_REQUEST");
    }
  }
  
  class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
      super(message, 401, "UNAUTHORIZED");
    }
  }
  
  class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
      super(message, 403, "FORBIDDEN");
    }
  }
  
  class NotFoundError extends AppError {
    constructor(message = "Resource Not Found") {
      super(message, 404, "NOT_FOUND");
    }
  }
  
  class ConflictError extends AppError {
    constructor(message = "Conflict") {
      super(message, 409, "CONFLICT");
    }
  }
  
  class ValidationError extends AppError {
    constructor(message = "Validation Failed") {
      super(message, 422, "VALIDATION_ERROR");
    }
  }
  
  /* ===============================
     Authentication Errors
  ================================= */
  
  class TokenExpiredError extends AppError {
    constructor(message = "Token Expired") {
      super(message, 401, "TOKEN_EXPIRED");
    }
  }
  
  class InvalidTokenError extends AppError {
    constructor(message = "Invalid Token") {
      super(message, 401, "INVALID_TOKEN");
    }
  }
  
  /* ===============================
     Database Errors
  ================================= */
  
  class DatabaseError extends AppError {
    constructor(message = "Database Error") {
      super(message, 500, "DATABASE_ERROR");
    }
  }
  
  class ForeignKeyConstraintError extends AppError {
    constructor(message = "Foreign Key Constraint Failed") {
      super(message, 400, "FOREIGN_KEY_CONSTRAINT");
    }
  }
  
  /* ===============================
     Business Logic Errors
  ================================= */
  
  class BusinessLogicError extends AppError {
    constructor(message = "Business Rule Violation") {
      super(message, 400, "BUSINESS_ERROR");
    }
  }
  
  /* ===============================
     5xx Errors
  ================================= */
  
  class InternalServerError extends AppError {
    constructor(message = "Internal Server Error") {
      super(message, 500, "INTERNAL_SERVER_ERROR");
    }
  }
  
  module.exports = {
    AppError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    ValidationError,
    TokenExpiredError,
    InvalidTokenError,
    DatabaseError,
    ForeignKeyConstraintError,
    BusinessLogicError,
    InternalServerError,
  };
  