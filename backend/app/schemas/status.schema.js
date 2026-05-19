const { z } = require("zod");

const createStatusSchema = z.object({
  statusName: z
    .string()
    .min(2, "Status name must be at least 2 characters")
    .max(50, "Status name too long")
    .trim(),
});

const updateStatusSchema = z.object({
  statusName: z
    .string()
    .min(2, "Status name must be at least 2 characters")
    .max(50, "Status name too long")
    .trim()
    .optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided to update" }
);

module.exports = { createStatusSchema, updateStatusSchema };