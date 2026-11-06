import { z } from "zod";

export const TIPOS_BLOQUE = ["clase", "estudio", "repaso", "examen"];
export const DIAS_SEMANA = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const blockSchema = z
  .object({
    titulo: z
      .string()
      .trim()
      .min(1, "El título es obligatorio")
      .max(50, "El título no puede superar los 50 caracteres"),
    courso: z
      .string()
      .trim()
      .min(1, "El curso es obligatorio")
      .max(40, "El curso no puede superar los 40 caracteres"),
    tipo: z.enum(TIPOS_BLOQUE, {
      errorMap: () => ({ message: "Selecciona un tipo de bloque valido" }),
    }),
    dia: z.enum(DIAS_SEMANA, {
      errorMap: () => ({ message: "Selecciona un día de la semana valido" }),
    }),
    horaInicio: z
      .string()
      .trim()
      .regex(timeRegex, "Formato de hora inválido (HH:MM)"),
    horaFin: z
      .string()
      .trim()
      .regex(timeRegex, "Formato de hora inválido (HH:MM)"),
  })
  .refine(
    (datos) => {
      if (!timeRegex.test(datos.horaInicio) || !timeRegex.test(datos.horaFin)) {
        return false;
      }
      return datos.horaInicio < datos.horaFin;
    },
    {
      message: "La hora de inicio debe ser menor que la hora de fin",
      path: ["horaFin"],
    },
  );

export const blockVacio = {
  titulo: "",
  courso: "",
  tipo: "clase",
  dia: "Lunes",
  horaInicio: "08:00",
  horaFin: "09:00",
};
