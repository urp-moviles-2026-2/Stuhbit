import React from "react";
import Placeholder from "./Placeholder";

export default function ProfileMenuModal() {
  return (
    <Placeholder
      title="Cuenta y Opciones"
      description="Selecciona una opción para administrar tu perfil o las preferencias de la aplicación."
      links={[
        { label: "👤 Ver Detalles de Perfil", to: "Perfil" },
        { label: " Contacto y Feedback", to: "Contacto" },
        { label: "⚙️ Configuración y Ajustes", to: "Settings" },
        { label: "Cancelar / Volver" },
      ]}
    />
  );
}
