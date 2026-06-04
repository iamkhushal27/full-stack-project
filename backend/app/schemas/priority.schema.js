import { z } from "zod";

export const createPrioritySchema = z.object({
  priorityName: z
    .string({ required_error: "Priority Name is required" })
    .min(2, "Priority name must be at least 2 characters")
    .max(50, "Priority name too long")
    .trim(),
});

export const updatePrioritySchema = z
  .object({
    priorityName: z
      .string({ required_error: "Priority Name is required" }) // 👈
      .min(2, "Priority name must be at least 2 characters")
      .max(50, "Priority name too long")
      .trim()
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided to update",
  });
