import * as z from "zod";

const usernameRegex = /^[a-zA-Z0-9_@+.-]+$/;

export const registerUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name must be less than 120 characters long" }),
    email: z.string().trim().email({ message: "Enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    re_password: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Password do not match",
    path: ["re_password"],
  });
