# Mapa de navegación - Stuhbit

RootStack
├── Main (Tabs)
│   ├── InicioTab (Stack)
│   │   ├── Inicio          ← lista de reportes
│   │   └── Detalle         ← params: { id }
│   ├── BuscarTab
│   │   └── Buscar
│   └── PerfilTab
│       └── Perfil
├── Login (modal)
└── CrearReporte (modal)

| Ruta | Navigator | Se llega desde | Params | Qué muestra |
|------|-----------|----------------|--------|-------------|
| Inicio | InicioTab (stack) | tab Inicio | - | Lista de reportes recientes |
| Detalle | InicioTab (stack) | Inicio, Buscar | { id } | Datos de un reporte |
| ...


Screens:

| CalendarScreen.js
| FocusScreen.js
| NotesScreen.js
| ScheduleScren.js

- DetallesUsuario (modal)