import { z } from "zod";

export const createStatusSchema = z.object({
  statusName: z
    .string({ required_error: "Status Name is required" })
    .min(2, "Status name must be at least 2 characters")
    .max(50, "Status name too long")
    .trim(),
});

export const updateStatusSchema = z
  .object({
    statusName: z
      .string({ required_error: "Status Name is required" })
      .min(2, "Status name must be at least 2 characters")
      .max(50, "Status name too long")
      .trim()
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided to update",
  });
