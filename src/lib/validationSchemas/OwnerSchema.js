import * as z from "zod";

export const ownerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name must be less than 100 characters long" }),
  phone_number: z.string().trim(),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .optional()
    .or(z.literal("").optional()),
});
