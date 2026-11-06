# Inventario de formularios - Stuhbit

| Formulario          | Pantalla           | Campo                                                                | Regla                                       | Mensaje de error                                   | Destino                      |
| ------------------- | ------------------ | -------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------- | ---------------------------- |
| Crear Bloque        | ScheduleBlockModal | titulo                                                               | Texto, entre 3 y 50 caracteres              | "Ingresa el nombre del curso"                      | `scheduleSlice`              |
| Crear Bloque        | ScheduleBlockModal | curso                                                                | Texto, min 3, max 40 caracteres             | "Ingresa el nombre del curso"                      | `scheduleSlice`              |
| Crear Bloque        | ScheduleBlockModal | tipo                                                                 | uno de: clase, estudio, repaso, examen      | "Seleccione tipo de bloque"                        | `scheduleSlice`              |
| Crear Bloque        | ScheduleBlockModal | dia                                                                  | numero ( 1 a 7 / lunes a domingo)           | "Selecciona un dia valido"                         | `scheduleSlice`              |
| Crear Bloque        | ScheduleBlockModal | horainicio / horafin                                                 | Formato HH:mm                               | "La hora de fin debe ser posterior a la de inicio" | `scheduleSlice`              |
| Login               | LoginScreen        | correo                                                               | email valido, no vacio                      | "Ingresa un correo valido"                         | `SesionContext`              |
| Login               | LoginScreen        | clave                                                                | texto, miinimo 6, maximo 50 caracteres      | "La contraseña debe tener al menos 6 caracteres"   | `SesionContext` (API en S12) |
| Contacto y feedback | ContactoScreen     | nombre, correo, celular, tipo, calificacion, mensaje, aceptaTerminos | ver esquema                                 | ver esquema                                        | `Alert`                      |
| Contacto y feedback | ContactoScreen     | nombre                                                               | Texto, mínimo 3 caracteres                  | "Escribe tu nombre completo"                       | `Alert`                      |
| Contacto y feedback | ContactoScreen     | correo                                                               | Formato email institucional o estándar      | "Ingresa un correo válido"                         | `Alert`                      |
| Contacto y feedback | ContactoScreen     | celular                                                              | Regex `^9\d{8}$` (9 dígitos empezando en 9) | "El celular debe tener 9 dígitos y empezar con 9"  | `Alert`                      |
| Contacto y feedback | ContactoScreen     | tipo                                                                 | Uno de: `sugerencia`, `error`, `consulta`   | "Elige el tipo de mensaje"                         | `Alert`                      |
| Contacto y feedback | ContactoScreen     | calificacion                                                         | Número entero de 1 a 5                      | "Selecciona una calificación"                      | `Alert`                      |
| Contacto y feedback | ContactoScreen     | mensaje                                                              | Texto, entre 10 y 500 caracteres            | "El mensaje debe tener entre 10 y 500 caracteres"  | `Alert`                      |
| Contacto y feedback | ContactoScreen     | aceptaTerminos                                                       | Booleano `true`                             | "Debes aceptar los términos"                       | `Alert`                      |

## Formularios de este lab

1. Crear Bloque (requisito 5)
2. Login
3. Contacto y feedback (requisito 6)
