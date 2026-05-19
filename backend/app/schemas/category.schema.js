const { z } = require("zod");

const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters" })
    .max(50, "Category name too long")
    .trim(),
});

const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name too long")
    .trim()
    .optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided to update" }
);

module.exports = { createCategorySchema, updateCategorySchema };