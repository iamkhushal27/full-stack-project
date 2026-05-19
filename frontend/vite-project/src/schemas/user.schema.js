import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name too long",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/)
    .pattern(/[0-9]/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Must contain at least one uppercase letter and one number",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm password is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(1).required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).messages({
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name too long",
  }),
  email: Joi.string().email().trim().lowercase().messages({
    "string.email": "Invalid email format",
  }),
  profile_image: Joi.string().uri().messages({
    "string.uri": "Must be a valid image URL",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update",
  });
