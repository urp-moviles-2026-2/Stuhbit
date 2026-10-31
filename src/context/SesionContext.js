import React, { createContext, useState, useContext, useMemo } from "react";

// 1. Crear el Contexto
const SesionContext = createContext(null);

// 2. Crear el Provider
export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // null significa que no hay sesión activa

  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  // 3. Uso de useMemo para optimizar el valor (Requerimiento 5 del LAB-04)
  const valorContexto = useMemo(
    () => ({
      usuario,
      estaLogueado: !!usuario, // Convertimos a booleano: true si hay usuario, false si es null
      iniciarSesion,
      cerrarSesion,
    }),
    [usuario]
  );

  return (
    <SesionContext.Provider value={valorContexto}>
      {children}
    </SesionContext.Provider>
  );
}

// 4. Hook propio useSesion (Requerimiento 5 del LAB-04)
export function useSesion() {
  const context = useContext(SesionContext);
  if (!context) {
    throw new Error("useSesion debe usarse dentro de un SesionProvider");
  }
  return context;
}