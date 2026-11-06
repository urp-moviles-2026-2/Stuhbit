import { z } from "zod";

export const TIPOS_MENSAJE = ["sugerencia", "error", "consulta"];

export const contactoSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(3, "Escribe tu nombre completo (mínimo 3 caracteres)")
      .max(60, "El nombre no puede exceder los 60 caracteres"),
    correo: z
      .string()
      .trim()
      .toLowerCase()
      .email("Ingresa un correo electrónico válido"),
    celular: z
      .string()
      .trim()
      .regex(/^9\d{8}$/, "El celular debe tener 9 dígitos y empezar con 9"),
    tipo: z.enum(TIPOS_MENSAJE, {
      errorMap: () => ({ message: "Elige el tipo de mensaje" }),
    }),
    calificacion: z
      .number({ invalid_type_error: "Selecciona una calificación" })
      .int("La calificación debe ser un entero")
      .min(1, "La calificación mínima es 1")
      .max(5, "La calificación máxima es 5"),
    mensaje: z
      .string()
      .trim()
      .min(10, "Cuéntanos un poco más (mínimo 10 caracteres)")
      .max(500, "El mensaje no puede superar los 500 caracteres"),
    aceptaTerminos: z.boolean(),
  })
  .refine((datos) => datos.aceptaTerminos === true, {
    message: "Debes aceptar el uso de tus datos para responderte",
    path: ["aceptaTerminos"],
  });

export const contactoVacio = {
  nombre: "",
  correo: "",
  celular: "",
  tipo: "sugerencia",
  calificacion: 5,
  mensaje: "",
  aceptaTerminos: false,
};
