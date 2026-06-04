import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
  .string({ required_error: "Name is required" })  // 👈
    .min(2, { message: "Category name must be at least 2 characters" })
    .max(50, "Category name too long")
    .trim(),
});

export const updateCategorySchema = z
  .object({
    name: z
    .string({ required_error: "Name is required" })  // 👈
      .min(2, "Category name must be at least 2 characters")
      .max(50, "Category name too long")
      .trim()
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided to update",
  });
