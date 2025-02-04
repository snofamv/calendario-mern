import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  notes: z.string().optional(),
  start: z.date({
    required_error: "La fecha de inicio es obligatoria",
    invalid_type_error: "La fecha de inicio debe ser válida",
  }),
  end: z
    .date({
      required_error: "La fecha de fin es obligatoria",
      invalid_type_error: "La fecha de fin debe ser válida",
    })
    .refine((end, ctx) => {
      const start = ctx.parent?.start;
      return start && end > start;
    }, "La fecha de fin debe ser mayor que la fecha de inicio"),
});