import Joi from "joi";

export const createStatusSchema = Joi.object({
  statusName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "Status name must be a string",
      "string.empty": "Status name is required",
      "string.min": "Status name must be at least 2 characters",
      "string.max": "Status name too long",
      "any.required": "Status name is required",
    }),
});

export const updateStatusSchema = Joi.object({
  statusName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .messages({
      "string.base": "Status name must be a string",
      "string.min": "Status name must be at least 2 characters",
      "string.max": "Status name too long",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update",
  });
