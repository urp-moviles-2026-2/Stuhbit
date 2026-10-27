import React from "react";
import Placeholder from "./Placeholder";

export default function UploadNoteModal() {
  return (
    <Placeholder
      title="Subir o Digitalizar Apunte"
      description="Modal para captura por cámara inteligente, carga de PDF o notas de voz con OCR."
      links={[{ label: "Listo / Volver a Apuntes" }]}
    />
  );
}
