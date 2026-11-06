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

export default function ScheduleBlockModal() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const courseRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const onError = (errores) => {
    console.log("❌ Errores de validación de Zod:", errores);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(blockSchema),
    defaultValues: blockVacio,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = (datos) => {
    dispatch(addBlock(datos)); // datos ya viene validado y con trim()
    reset();
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? padding : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <FormField
          control={control}
          name="titulo"
          label="Titulo del bloque"
          placeholder="Ej. Repaso de algoritmo"
          returnKeyType="next"
          onSubmitEditing={() => courseRef.current?.focus()}
        />

        <FormField
          ref={courseRef}
          control={control}
          name="curso"
          label="Curso o Asignatura"
          placeholder="Ej. Sistemas Moviles"
          returnKeyType="next"
          onSubmitEditing={() => startRef.current?.focus()}
        />

        <Controller
          control={control}
          name="dia"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View style={styles.section}>
              <Text style={styles.label}>Día</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.chipRow}>
                  {DIAS_SEMANA.map((dia) => (
                    <TouchableOpacity
                      key={dia}
                      style={[styles.chip, value === dia && styles.chipActivo]}
                      onPress={() => onChange(dia)}
                    >
                      <Text
                        style={[
                          styles.chipTexto,
                          value === dia && styles.chipTextoActivo,
                        ]}
                      >
                        {dia}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
              {error && <Text style={styles.error}>{error.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="tipo"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View style={styles.section}>
              <Text style={styles.label}>Tipo de Bloque</Text>
              <View style={styles.chipRow}>
                {TIPOS_BLOQUE.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.chip, value === t && styles.chipActivo]}
                    onPress={() => onChange(t)}
                  >
                    <Text
                      style={[
                        styles.chipTexto,
                        value === t && styles.chipTextoActivo,
                      ]}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {error ? <Text style={styles.error}>{error.message}</Text> : null}
            </View>
          )}
        />

        <View style={styles.horasRow}>
          <View style={styles.horaCol}>
            <FormField
              ref={startRef}
              control={control}
              name="horaInicio"
              label="Hora Inicio"
              placeholder="08:00"
              keyboardType="numbers-and-punctuation"
              maxLength={5}
              returnKeyType="next"
              onSubmitEditing={() => endRef.current?.focus()}
            />
          </View>
          <View style={styles.horaCol}>
            <FormField
              ref={endRef}
              control={control}
              name="horaFin"
              label="Hora Fin"
              placeholder="10:00"
              keyboardType="numbers-and-punctuation"
              maxLength={5}
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.boton, isSubmitting && styles.botonDisabled]}
          onPress={handleSubmit(onSubmit, onError)}
          disabled={isSubmitting}
        >
          <Text style={styles.botonTexto}>
            {isSubmitting ? "Guardando..." : "Guardar Bloque"}
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
    gap: spacing.sm,
  },
  section: {
    gap: 6,
  },
  label: {
    ...typography.caption,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  chipRow: {
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
    color: palette.white,
    fontWeight: "600",
  },
  horasRow: {
    flexDirection: "row",
    gap: 12,
  },
  horaCol: {
    flex: 1,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
  },
  boton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  botonDisabled: {
    opacity: 0.6,
  },
  botonTexto: {
    color: palette.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
