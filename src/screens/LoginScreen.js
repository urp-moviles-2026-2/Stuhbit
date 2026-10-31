import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useSesion } from "../context/SesionContext.js";

export default function LoginScreen() {
  const [correo, setCorreo] = useState("");
  const { iniciarSesion } = useSesion();

  const handleIngresar = () => {
    if (!correo.trim()) return;
    iniciarSesion({ nombre: correo.split("@")[0], correo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stuhbit - Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="correo@urp.edu.pe"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
      />
      <Button title="Ingresar" onPress={handleIngresar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 12 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12 },
});