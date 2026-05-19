import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "Category name must be a string",
      "string.empty": "Category name is required",
      "string.min": "Category name must be at least 2 characters",
      "string.max": "Category name too long",
      "any.required": "Category name is required",
    }),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .messages({
      "string.base": "Category name must be a string",
      "string.min": "Category name must be at least 2 characters",
      "string.max": "Category name too long",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update",
  });
