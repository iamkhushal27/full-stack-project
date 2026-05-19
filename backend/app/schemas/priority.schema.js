const { z } = require("zod");

const createPrioritySchema = z.object({
  priorityName: z
    .string()
    .min(2, "Priority name must be at least 2 characters")
    .max(50, "Priority name too long")
    .trim(),
});

const updatePrioritySchema = z.object({
  priorityName: z
    .string()
    .min(2, "Priority name must be at least 2 characters")
    .max(50, "Priority name too long")
    .trim()
    .optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided to update" }
);

module.exports = { createPrioritySchema, updatePrioritySchema };