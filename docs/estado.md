# Mapa de estado - Stuhbit

## Clasificación

| Dato                           | Tipo    | Dónde vive                | Quién lo lee                                              | Quién lo modifica                          |
| ------------------------------ | ------- | ------------------------- | --------------------------------------------------------- | ------------------------------------------ |
| Textos de inputs (Formularios) | Local   | `useState` en componentes | ScheduleBlockModal, LoginScreen                           | ScheduleBlockModal, LoginScreen            |
| Usuario logueado               | Context | `SesionContext`           | App.js, ProfileScreen                                     | LoginScreen, ProfileScreen (cerrar sesión) |
| Bloques de Horario             | Store   | slice `schedule`          | ScheduleScreen, BlockDetailScreen, ProfileScreen (conteo) | ScheduleBlockModal, BlockDetailScreen      |

## Forma del store

```json
{
  "schedule": {
    "items": [
      {
        "id": "string",
        "title": "string",
        "course": "string",
        "startTime": "string",
        "endTime": "string",
        "day": "string",
        "status": "string",
        "notes": "string",
        "createdAt": "string"
      }
    ]
  }
}
```
