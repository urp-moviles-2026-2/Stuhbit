import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { addBlock } from "../store/scheduleSlice.js";
import {
  blockSchema,
  blockVacio,
  TIPOS_BLOQUE,
  DIAS_SEMANA,
} from "../schemas/blockSchema.js";
import FormField from "../components/FormField.js";
import { colors, spacing, typography, radius, palette } from "../theme";
import { useSesion } from "../context/SesionContext.js";
import { loginSchema, loginVacio } from "../schemas/loginSchema.js";

export default function LoginScreen() {
  const { iniciarSesion } = useSesion();

  const passwordRef = useRef(null);

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: loginVacio,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (datos) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (iniciarSesion) {
        await iniciarSesion({
          correo: datos.correo,
          nombre: datos.correo.split("@")[0],
        });
      }
      reset();
    } catch (error) {
      Alert.alert("Error de autenticación", "No se pudo iniciar sesión");
    }
  };

  const onError = (errores) => {
    console.log("❌ Errores en Login:", errores);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.titulo}>Bienvenido a Stuhbit</Text>
          <Text style={styles.subtitulo}>
            Inicia sesión para gestionar tus horarios de estudio
          </Text>
        </View>

        <View style={styles.formulario}>
          <FormField
            control={control}
            name="correo"
            label="Correo electrónico"
            placeholder="usuario@urp.edu.pe"
            placeholderTextColor="rgba(148, 163, 184, 0.45)"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />

          <View style={styles.passwordWrapper}>
            <FormField
              ref={passwordRef}
              control={control}
              name="password"
              label="Contraseña"
              placeholder="••••••••"
              placeholderTextColor="rgba(148, 163, 184, 0.45)"
              secureTextEntry={!mostrarPassword}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="send"
              onSubmitEditing={handleSubmit(onSubmit, onError)}
            />
            <TouchableOpacity
              style={styles.toggleBtn}
              onPress={() => setMostrarPassword((prev) => !prev)}
            >
              <Text style={styles.toggleTexto}>
                {mostrarPassword ? "Ocultar" : "Ver"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.boton, isSubmitting && styles.botonDisabled]}
            onPress={handleSubmit(onSubmit, onError)}
            disabled={isSubmitting}
          >
            <Text style={styles.botonTexto}>
              {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
    alignItems: "center",
  },
  titulo: {
    ...typography.h2,
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 6,
  },
  subtitulo: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
  },
  formulario: {
    gap: spacing.sm,
  },
  passwordWrapper: {
    position: "relative",
  },
  toggleBtn: {
    position: "absolute",
    right: 12,
    top: 36,
    padding: 6,
    zIndex: 2,
  },
  toggleTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  boton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: radius.md || 8,
    alignItems: "center",
    marginTop: 8,
  },
  botonDisabled: {
    opacity: 0.6,
  },
  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});