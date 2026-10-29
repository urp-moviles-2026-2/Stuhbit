# Mapa de navegación - Stuhbit

RootStack
├── Main (Bottom tabs)
│ ├── CronogramaTab (Native stack)
│ │ ├── Cronograma ← lista de bloques del dia actual
│ │ └── DetalleBloque ← Params: { id }
│ ├── CalendarioTab (Native Stack)
│ │ └── Calendario ← Vista semanal y mensual de cursos
│ └── ApuntesTab (Native Stack)
│ | └── Apuntes ← Lista de apuntes con filtros por materia

| └── EnfoqueTab (Native Stack)

| | └──Enfoque ← Temporizador Pomodoro activo

├── SubirApunteModal (modal) ← Acceso rapido para digitalizar con camara/PDF
├── AgendarBloqueModal (modal) ← Programacion rapida de nuevo bloque

├── ProfileMenuModal (modal) ← Menu de opciones relevantes a configuraciones

├── SettingScreen ← Acceso a las configuracion de sistemas
└── ProfileScreen ← Acceso las configuracion de perfil

| Ruta               | Navigator             | Se llega desde                        | Params            | Qué muestra                                              |
| ------------------ | --------------------- | ------------------------------------- | ----------------- | -------------------------------------------------------- |
| Cronograma         | CronogramaTab (stack) | Tab Bar / Inicio                      | -                 | Bloques                                                  |
| DetalleBloque      | CronogramaTab (stack) | Cronograma, Calendario                | { id }            | Detalles de un Bloque                                    |
| Calendario         | CalendarioTab (stack) | Tab Bar                               | -                 | Eventos Programados                                      |
| Apuntes            | ApuntesTab (stack)    | Tab Bar                               | -                 | Lista de apuntes por curso                               |
| Enfoque            | EnfoqueTab (stack)    | Tab Bar/ Cronograma/ DetalleBloque    | { id } (opcional) | reloj de concentracion                                   |
| SubirApuntesModa   | RootStack (moda)      | Apuntes, Cronograma                   | -                 | modal para escanear con camara o subir pdf               |
| AgendarBloqueModal | RootStack (modal)     | Calendario, Cronograma                | -                 | modal para configura fecha, horario y materia de estudio |
| ProfileMenuModal   | RootStack (modal)     | Cronograma/Calendario/Enfoque/Apuntes | -                 | modal para las configuraciones de usuario                |
| SettingScreen      | RootStack (Stack)     | ProfileMenuModal                      | -                 | opciuones de configuracion de aplicacion                 |
| ProfileScreen      | RootStack (Stack)     | ProfileMenuModal                      | -                 | opciones de configuracion de perfil                      |
