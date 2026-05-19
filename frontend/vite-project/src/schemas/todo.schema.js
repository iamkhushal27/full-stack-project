import Joi from "joi";

const positiveIntString = (fieldName) =>
  Joi.string()
    .custom((value, helpers) => {
      const parsed = Number(value);
      if (!Number.isInteger(parsed) || parsed <= 0) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.invalid": `${fieldName} must be a positive integer`,
    });

export const createTodoSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title too long",
    "any.required": "Title is required",
  }),
  description: Joi.string().trim().min(5).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters",
    "any.required": "Description is required",
  }),
  category: positiveIntString("Category").required().messages({
    "any.required": "Category is required",
    "string.empty": "Category is required",
  }),
  priority: positiveIntString("Priority").allow(null).optional(),
  status: positiveIntString("Status").allow(null).optional(),
  uploadImage: Joi.any().required().messages({
    "any.required": "Image is required",
  }),
  completed: Joi.boolean().required().messages({
    "boolean.base": "Completed must be a boolean",
  }),
  date: Joi.string()
    .custom((value, helpers) => {
      if (Number.isNaN(Date.parse(value))) {
        return helpers.error("date.format");
      }
      return value;
    })
    .required()
    .messages({
      "date.format": "Invalid date format",
      "string.empty": "Date is required",
      "any.required": "Date is required",
    }),
});

export const updateTodoSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).messages({
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title too long",
  }),
  description: Joi.string().trim().min(5).messages({
    "string.min": "Description too short",
  }),
  category_id: positiveIntString("Category"),
  priority_id: positiveIntString("Priority").allow(null),
  status_id: positiveIntString("Status").allow(null),
  uploadImage: Joi.any().messages({
    "any.required": "Image is required",
  }),

  date: Joi.string()
    .custom((value, helpers) => {
      if (Number.isNaN(Date.parse(value))) {
        return helpers.error("date.format");
      }
      return value;
    })
    .messages({
      "date.format": "Invalid date format",
    }),
  completed: Joi.boolean().messages({
    "boolean.base": "Completed must be a boolean",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update",
  });
