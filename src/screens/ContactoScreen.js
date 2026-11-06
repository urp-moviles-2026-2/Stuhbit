// src/screens/ContactoScreen.js
import React, { useRef } from "react";
import {
  View,
  Text,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactoSchema,
  contactoVacio,
  TIPOS_MENSAJE,
} from "../schemas/contactoSchema.js";
import { useSesion } from "../context/SesionContext.js";
import FormField from "../components/FormField.js";
import { colors, spacing, typography, radius } from "../theme/index.js";

export default function ContactoScreen({ navigation }) {
  const { usuario } = useSesion();

  const correoRef = useRef(null);
  const celularRef = useRef(null);
  const mensajeRef = useRef(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(contactoSchema),
    defaultValues: {
      ...contactoVacio,
      nombre: usuario?.nombre || "",
      correo: usuario?.email || usuario?.correo || "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (datos) => {
    // Simulación de envío asíncrono
    await new Promise((resolve) => setTimeout(resolve, 800));
    Alert.alert(
      "¡Mensaje enviado!",
      `Gracias ${datos.nombre}. Nos pondremos en contacto contigo al correo ${datos.correo}.`,
      [
        {
          text: "Aceptar",
          onPress: () => {
            reset();
            navigation?.goBack();
          },
        },
      ],
    );
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
        <Text style={styles.titulo}>Contacto y Feedback</Text>
        <Text style={styles.subtitulo}>
          Envíanos tus dudas, reportes de fallas o sugerencias para Stuhbit.
        </Text>

        <FormField
          control={control}
          name="nombre"
          label="Nombre completo"
          placeholder="Ej. Francisco Requena"
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => correoRef.current?.focus()}
        />

        <FormField
          ref={correoRef}
          control={control}
          name="correo"
          label="Correo electrónico"
          placeholder="tu_correo@urp.edu.pe"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => celularRef.current?.focus()}
        />

        <FormField
          ref={celularRef}
          control={control}
          name="celular"
          label="Número celular"
          placeholder="987654321"
          keyboardType="number-pad"
          maxLength={9}
          returnKeyType="next"
          onSubmitEditing={() => mensajeRef.current?.focus()}
        />

        {/* Tipo de mensaje (Enum) */}
        <Controller
          control={control}
          name="tipo"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View style={styles.section}>
              <Text style={styles.label}>Tipo de mensaje</Text>
              <View style={styles.rowChips}>
                {TIPOS_MENSAJE.map((opcion) => {
                  const activo = value === opcion;
                  return (
                    <TouchableOpacity
                      key={opcion}
                      style={[styles.chip, activo && styles.chipActivo]}
                      onPress={() => onChange(opcion)}
                    >
                      <Text
                        style={[
                          styles.chipTexto,
                          activo && styles.chipTextoActivo,
                        ]}
                      >
                        {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {error ? <Text style={styles.error}>{error.message}</Text> : null}
            </View>
          )}
        />

        {/* Calificación (Number) */}
        <Controller
          control={control}
          name="calificacion"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View style={styles.section}>
              <Text style={styles.label}>¿Cómo calificas la app?</Text>
              <View style={styles.rowStars}>
                {[1, 2, 3, 4, 5].map((estrella) => (
                  <TouchableOpacity
                    key={estrella}
                    onPress={() => onChange(estrella)}
                    style={styles.starBoton}
                  >
                    <Text style={styles.starIcono}>
                      {estrella <= value ? "★" : "☆"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {error ? <Text style={styles.error}>{error.message}</Text> : null}
            </View>
          )}
        />

        <FormField
          ref={mensajeRef}
          control={control}
          name="mensaje"
          label="Mensaje o sugerencia"
          placeholder="Escribe aquí los detalles..."
          multiline
          numberOfLines={4}
          maxLength={500}
          returnKeyType="send"
          onSubmitEditing={handleSubmit(onSubmit)}
        />

        {/* Términos (Boolean + Refine) */}
        <Controller
          control={control}
          name="aceptaTerminos"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View style={styles.section}>
              <View style={styles.switchRow}>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ true: colors?.primary || "#4F46E5" }}
                />
                <Text style={styles.switchText}>
                  Acepto el tratamiento de datos para responder a mi solicitud
                </Text>
              </View>
              {error ? <Text style={styles.error}>{error.message}</Text> : null}
            </View>
          )}
        />

        <TouchableOpacity
          style={[styles.boton, isSubmitting && styles.botonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={styles.botonTexto}>
            {isSubmitting ? "Enviando..." : "Enviar Feedback"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.background || "#F8FAFC",
  },
  scrollContent: {
    padding: spacing?.md || 16,
    gap: spacing?.sm || 12,
  },
  titulo: {
    ...typography?.h2,
    fontSize: 22,
    fontWeight: "700",
    color: colors?.textPrimary || "#0F172A",
  },
  subtitulo: {
    ...typography?.caption,
    color: colors?.textSecondary || "#64748B",
    marginBottom: 8,
  },
  section: {
    gap: 4,
  },
  label: {
    ...typography?.caption,
    fontWeight: "600",
    color: colors?.textSecondary || "#475569",
    marginBottom: 2,
  },
  rowChips: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius?.full || 20,
    borderWidth: 1,
    borderColor: colors?.border || "#CBD5E1",
    backgroundColor: colors?.surface || "#FFFFFF",
  },
  chipActivo: {
    backgroundColor: colors?.primary || "#4F46E5",
    borderColor: colors?.primary || "#4F46E5",
  },
  chipTexto: {
    fontSize: 13,
    color: colors?.textSecondary || "#64748B",
  },
  chipTextoActivo: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  rowStars: {
    flexDirection: "row",
    gap: 4,
  },
  starBoton: {
    padding: 2,
  },
  starIcono: {
    fontSize: 28,
    color: "#F59E0B",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  switchText: {
    flex: 1,
    fontSize: 13,
    color: colors?.textSecondary || "#475569",
  },
  error: {
    color: colors?.danger || "#EF4444",
    fontSize: 12,
    marginTop: 2,
  },
  boton: {
    backgroundColor: colors?.primary || "#4F46E5",
    paddingVertical: 14,
    borderRadius: radius?.md || 8,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 24,
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
