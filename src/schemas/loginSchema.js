import { z } from "zod";

export const loginSchema = z.object({
  correo: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "El correo electrónico es obligatorio")
    .email("Ingresa un formato de correo válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(50, "La contraseña no puede exceder los 50 caracteres"),
});

export const loginVacio = {
  correo: "",
  password: "",
};
