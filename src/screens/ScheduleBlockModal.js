import React from "react";
import Placeholder from "./Placeholder";

export default function ScheduleBlockModal() {
  return (
    <Placeholder
      title="Agendar Bloque de Estudio"
      description="Modal para configurar fecha, horario y materia para un bloque personalizado."
      links={[{ label: "Confirmar y Volver al Cronograma" }]}
    />
  );
}
