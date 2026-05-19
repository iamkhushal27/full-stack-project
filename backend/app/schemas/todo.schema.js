const { z } = require("zod");

const createTodoSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title too long")
    .trim(),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .trim(),
  category: z
    .string()
    .refine((v) => Number.isInteger(Number(v)) && Number(v) > 0, {
      message: "Category must be a positive integer",
    }),
  priority: z
    .string()
    .refine((v) => Number.isInteger(Number(v)) && Number(v) > 0, {
      message: "Priority must be a positive integer",
    })
    .optional()
    .nullable(),
  status: z
    .string()
    .refine((v) => Number.isInteger(Number(v)) && Number(v) > 0, {
      message: "Status must be a positive integer",
    })
    .optional()
    .nullable(),
  uploadImage: z
    .string()
    .url("Must be a valid image URL"),
  date: z
    .string()
    .refine((v) => !isNaN(Date.parse(v)), {
      message: "Invalid date format",
    }),
});

const updateTodoSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title too long")
    .trim()
    .optional(),
  description: z
    .string()
    .min(5, "Description too short")
    .trim()
    .optional(),
  category_id: z
    .string()
    .refine((v) => Number.isInteger(Number(v)) && Number(v) > 0, {
      message: "Category must be a positive integer",
    })
    .optional(),
  priority_id: z
    .string()
    .refine((v) => Number.isInteger(Number(v)) && Number(v) > 0, {
      message: "Priority must be a positive integer",
    })
    .optional()
    .nullable(),
  status_id: z
    .string()
    .refine((v) => Number.isInteger(Number(v)) && Number(v) > 0, {
      message: "Status must be a positive integer",
    })
    .optional()
    .nullable(),
  uploadImage: z
    .string()
    .url("Must be a valid image URL")
    .optional(),
  date: z
    .string()
    .refine((v) => !isNaN(Date.parse(v)), {
      message: "Invalid date format",
    })
    .optional(),
  completed: z
    .boolean({ invalid_type_error: "Completed must be a boolean" })
    .optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided to update" }
);

module.exports = { createTodoSchema, updateTodoSchema };