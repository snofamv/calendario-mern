import { z } from "zod";

export const eventSchema = z
  .object({
    title: z.string().min(1, "El título es obligatorio"),
    notes: z.string().optional(),
    start: z.date({
      required_error: "La fecha de inicio es obligatoria",
      invalid_type_error: "La fecha de inicio debe ser válida",
    }),
    end: z.date({
      required_error: "La fecha de fin es obligatoria",
      invalid_type_error: "La fecha de fin debe ser válida",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.start >= data.end) {
      ctx.addIssue({
        path: ["end"], // Marcar el error en el campo "end"
        message: "La fecha de fin debe ser mayor que la fecha de inicio",
        code: "custom",
      });
    }
  });
