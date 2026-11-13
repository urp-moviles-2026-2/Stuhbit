/// src/screens/ContactoScreen.js
import React, { useRef } from "react";
import {
  View,
  Text,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import {
  contactoSchema,
  contactoVacio,
  TIPOS_MENSAJE,
} from "../schemas/contactoSchema.js";
import { useSesion } from "../context/SesionContext.js";
import FormField from "../components/FormField.js";
import { colors, spacing, typography, radius } from "../theme";

export default function ContactoScreen() {
  const navigation = useNavigation();
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
      correo: usuario?.correo || "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (datos) => {
    // Simulación de envío requerida por la rúbrica
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Feedback enviado de forma exitosa:", datos);

    Alert.alert(
      "¡Mensaje enviado!",
      `Gracias ${datos.nombre}. Nos pondremos en contacto al correo ${datos.correo}.`,
      [
        {
          text: "Aceptar",
          onPress: () => {
            reset();
            navigation.goBack();
          },
        },
      ],
    );
  };

  const onError = (errores) => {
    console.log("❌ Errores en Contacto:", errores);
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
          Envíanos tus reportes, consultas o sugerencias sobre la app.
        </Text>

        <FormField
          control={control}
          name="nombre"
          label="Nombre completo"
          placeholder="Ej. Francisco Requena"
          placeholderTextColor="rgba(148, 163, 184, 0.45)"
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
          placeholderTextColor="rgba(148, 163, 184, 0.45)"
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
          placeholderTextColor="rgba(148, 163, 184, 0.45)"
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
              {error ? (
                <Text style={styles.error} accessibilityRole="alert">
                  {error.message}
                </Text>
              ) : null}
            </View>
          )}
        />

        {/* Calificación (Number 1-5) */}
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
              {error ? (
                <Text style={styles.error} accessibilityRole="alert">
                  {error.message}
                </Text>
              ) : null}
            </View>
          )}
        />

        <FormField
          ref={mensajeRef}
          control={control}
          name="mensaje"
          label="Mensaje o detalle"
          placeholder="Escribe tu mensaje aquí..."
          placeholderTextColor="rgba(148, 163, 184, 0.45)"
          multiline
          numberOfLines={4}
          maxLength={500}
          returnKeyType="done"
          blurOnSubmit={true} // Crucial para cerrar el teclado correctamente en inputs multilinea
        />

        {/* Switch Términos */}
        <Controller
          control={control}
          name="aceptaTerminos"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View style={styles.section}>
              <View style={styles.switchRow}>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ true: colors.primary, false: colors.border }}
                  thumbColor={value ? colors.surface : "#f4f3f4"}
                />
                <Text style={styles.switchText}>
                  Acepto el uso de mis datos para recibir una respuesta
                </Text>
              </View>
              {error ? (
                <Text style={styles.error} accessibilityRole="alert">
                  {error.message}
                </Text>
              ) : null}
            </View>
          )}
        />

        <TouchableOpacity
          style={[styles.boton, isSubmitting && styles.botonDisabled]}
          onPress={handleSubmit(onSubmit, onError)}
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
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md, // Se amplió el gap para una mejor experiencia visual en móviles
  },
  titulo: {
    ...typography.h2,
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitulo: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  section: {
    gap: spacing.xs || 6,
  },
  label: {
    ...typography.caption,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  rowChips: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActivo: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipTexto: {
    fontSize: 13,
    color: colors.textSecondary,
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
    color: colors.textSecondary,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    fontSize: 12,
    marginTop: 2,
  },
  boton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: radius.md || 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
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
