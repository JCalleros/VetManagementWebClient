import * as z from "zod";

const uuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const appointmentSchema = z.object({
  patient: z.string().regex(uuidRegex, { message: "Invalid UUID" }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  service_type: z.string().max(100, {
    message: "Service type must be less than 100 characters long",
  }),
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED"]),
  notes: z.string().optional().nullable(),
});
