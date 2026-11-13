// src/schemas/blockSchema.js
import { z } from "zod";

export const MATERIAS_PREDEFINIDAS = [
  { id: "calc", label: "Cálculo II", color: "#4F46E5" },
  { id: "alg", label: "Álgebra Lineal", color: "#A5B4FC" },
  { id: "fis", label: "Física I", color: "#F59E0B" },
  { id: "mov", label: "Sistemas Móviles", color: "#10B981" },
];

export const NIVELES_PRIORIDAD = ["Normal", "Media", "Alta"];

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const blockSchema = z
  .object({
    curso: z.string().trim().min(1, "Selecciona una materia o asignatura"),
    titulo: z
      .string()
      .trim()
      .min(3, "Ingresa el título o meta (mínimo 3 caracteres)")
      .max(60, "El título no puede superar los 60 caracteres"),
    horaInicio: z.string().trim().regex(timeRegex, "Formato inválido (HH:MM)"),
    horaFin: z.string().trim().regex(timeRegex, "Formato inválido (HH:MM)"),
    duracionPreset: z.string().optional(),
    tecnica: z.string().default("Pomodoro (3x25)"),
    prioridad: z.enum(NIVELES_PRIORIDAD).default("Alta"),
  })
  .refine(
    (datos) => {
      if (!timeRegex.test(datos.horaInicio) || !timeRegex.test(datos.horaFin)) {
        return true;
      }
      return datos.horaInicio < datos.horaFin;
    },
    {
      message: "La hora de fin debe ser posterior a la de inicio",
      path: ["horaFin"],
    },
  );

export const blockVacio = {
  curso: "Cálculo II",
  titulo: "",
  horaInicio: "11:30",
  horaFin: "13:00",
  duracionPreset: "1h 30m",
  tecnica: "Pomodoro (3x25)",
  prioridad: "Alta",
};
