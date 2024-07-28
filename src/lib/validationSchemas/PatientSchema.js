import * as z from "zod";

export const patientGeneralSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters long" }),
  gender: z.enum(["male", "female"]),
  species: z.string().min(1, { message: "Species is required" }),
  breed: z.string().optional(),
  color: z.string().optional(),
  age_years: z.number().optional(),
  age_months: z.number().optional(),
  age_weeks: z.number().optional(),
});

export const patientOwnerSchema = z.object({
  owner: z.number().min(1, { message: "Owner is required" }),
});

const uuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const patientCompletSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters long" }),
  gender: z.enum(["male", "female"]),
  species: z.string().min(1, { message: "Species is required" }),
  breed: z.string().optional(),
  color: z.string().optional(),
  age_years: z.number().optional(),
  age_months: z.number().optional(),
  age_weeks: z.number().optional(),
  photo: z.string().optional(),
  owner: z.string().regex(uuidRegex, { message: "Invalid UUID" }),
});
