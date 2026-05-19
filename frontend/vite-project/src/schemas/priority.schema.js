import Joi from "joi";

export const createPrioritySchema = Joi.object({
  priorityName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "Priority name must be a string",
      "string.empty": "Priority name is required",
      "string.min": "Priority name must be at least 2 characters",
      "string.max": "Priority name too long",
      "any.required": "Priority name is required",
    }),
});

export const updatePrioritySchema = Joi.object({
  priorityName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .messages({
      "string.base": "Priority name must be a string",
      "string.min": "Priority name must be at least 2 characters",
      "string.max": "Priority name too long",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update",
  });
