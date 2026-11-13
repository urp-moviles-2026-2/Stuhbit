import React, { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";

import { addBlock } from "../store/scheduleSlice.js";
import {
  blockSchema,
  blockVacio,
  MATERIAS_PREDEFINIDAS,
  NIVELES_PRIORIDAD,
} from "../schemas/blockSchema.js";
import { colors, palette, radius, fontSize } from "../theme";

const DURACIONES = ["45 min", "1h", "1h 30m", "2h"];

export default function ScheduleBlockModal() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const tituloRef = useRef(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(blockSchema),
    defaultValues: blockVacio,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const duracionActual = watch("duracionPreset");

  const onSubmit = (datos) => {
    dispatch(
      addBlock({
        titulo: datos.titulo,
        curso: datos.curso,
        tipo: datos.prioridad === "Alta" ? "examen" : "estudio",
        dia: "Jueves",
        horaInicio: datos.horaInicio,
        horaFin: datos.horaFin,
        notes: `${datos.tecnica} · Prioridad ${datos.prioridad}`,
      }),
    );
    reset();
    navigation.goBack();
  };

  const handleSelectDuracion = (dur) => {
    setValue("duracionPreset", dur);
    if (dur === "45 min") setValue("horaFin", "12:15");
    if (dur === "1h") setValue("horaFin", "12:30");
    if (dur === "1h 30m") setValue("horaFin", "13:00");
    if (dur === "2h") setValue("horaFin", "13:30");
  };

  return (
    <View style={styles.backdrop}>
      {/* Zona táctil para cerrar tocando el fondo oscuro */}
      <Pressable
        style={styles.dismissOverlay}
        onPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.sheetWrapper}
      >
        <View style={styles.sheetContent}>
          {/* Tirador superior */}
          <View style={styles.topHandleBar} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollInside}
          >
            {/* Cabecera del Bottom Sheet */}
            <View style={styles.headerRow}>
              <View style={styles.headerTexts}>
                <Text style={styles.modalTitle}>Añadir Bloque de Estudio</Text>
                <Text style={styles.modalSubtitle}>
                  Programa una sesión enfocada o sincroniza con tu horario
                </Text>
              </View>
              <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => [
                  styles.closeBtn,
                  pressed && { opacity: 0.7 },
                ]}
                hitSlop={10}
              >
                <Ionicons name="close" size={20} color={palette.neutral[700]} />
              </Pressable>
            </View>

            {/* Materia / Asignatura */}
            <View style={styles.section}>
              <View style={styles.sectionLabelRow}>
                <Text style={styles.fieldLabel}>Materia / Asignatura</Text>
                <Text style={styles.requiredText}>Requerido</Text>
              </View>
              <Controller
                control={control}
                name="curso"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <View>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.chipsScroll}
                    >
                      <View style={styles.chipsRow}>
                        {MATERIAS_PREDEFINIDAS.map((mat) => {
                          const isSelected = value === mat.label;
                          return (
                            <Pressable
                              key={mat.id}
                              onPress={() => onChange(mat.label)}
                              style={[
                                styles.subjectChip,
                                isSelected && styles.subjectChipSelected,
                              ]}
                            >
                              <View
                                style={[
                                  styles.chipColorDot,
                                  {
                                    backgroundColor: isSelected
                                      ? palette.white
                                      : mat.color,
                                  },
                                ]}
                              />
                              <Text
                                style={[
                                  styles.subjectChipText,
                                  isSelected && styles.subjectChipTextSelected,
                                ]}
                              >
                                {mat.label}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    </ScrollView>
                    {error && (
                      <Text style={styles.errorText}>{error.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Título o Meta */}
            <View style={styles.section}>
              <Text style={styles.fieldLabel}>Título o Meta del Bloque</Text>
              <Controller
                control={control}
                name="titulo"
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <View>
                    <View
                      style={[styles.inputBox, error && styles.inputBoxError]}
                    >
                      <Ionicons
                        name="create-outline"
                        size={18}
                        color={palette.neutral[500]}
                      />
                      <TextInput
                        ref={tituloRef}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Derivadas Parciales y Guía 4"
                        placeholderTextColor={palette.neutral[400]}
                        style={styles.textInput}
                        returnKeyType="done"
                      />
                    </View>
                    {error && (
                      <Text style={styles.errorText}>{error.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Horario & Duración */}
            <View style={styles.section}>
              <Text style={styles.fieldLabel}>Horario & Duración Estimada</Text>
              <View style={styles.timeInputsRow}>
                <Controller
                  control={control}
                  name="horaInicio"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <View style={styles.timeCard}>
                      <View style={styles.timeCardTexts}>
                        <Text style={styles.timeCardLabel}>Inicio</Text>
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          style={styles.timeCardValue}
                          keyboardType="numbers-and-punctuation"
                          maxLength={5}
                        />
                      </View>
                      <View style={styles.clockIconCircle}>
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color={colors.primary}
                        />
                      </View>
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="horaFin"
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <View
                      style={[styles.timeCard, error && styles.timeCardError]}
                    >
                      <View style={styles.timeCardTexts}>
                        <Text style={styles.timeCardLabel}>Fin previsto</Text>
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          style={styles.timeCardValue}
                          keyboardType="numbers-and-punctuation"
                          maxLength={5}
                        />
                      </View>
                      <View style={styles.clockIconCircle}>
                        <Ionicons
                          name="refresh-outline"
                          size={16}
                          color={colors.primary}
                        />
                      </View>
                    </View>
                  )}
                />
              </View>

              <View style={styles.durationRow}>
                {DURACIONES.map((dur) => {
                  const isSelected = duracionActual === dur;
                  return (
                    <Pressable
                      key={dur}
                      onPress={() => handleSelectDuracion(dur)}
                      style={[
                        styles.durationPill,
                        isSelected && styles.durationPillSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.durationPillText,
                          isSelected && styles.durationPillTextSelected,
                        ]}
                      >
                        {dur}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Modo de Enfoque */}
            <View style={styles.section}>
              <Text style={styles.fieldLabel}>Modo de Enfoque</Text>
              <View style={styles.focusModeCard}>
                <View style={styles.focusModeIconBox}>
                  <Ionicons
                    name="stopwatch-outline"
                    size={18}
                    color={palette.secondary[700]}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.focusModeSub}>Técnica</Text>
                  <Text style={styles.focusModeTitle}>Pomodoro (3x25)</Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={palette.neutral[400]}
                />
              </View>
            </View>

            {/* Prioridad */}
            <View style={styles.section}>
              <Text style={styles.fieldLabel}>Nivel de Prioridad</Text>
              <Controller
                control={control}
                name="prioridad"
                render={({ field: { value, onChange } }) => (
                  <View style={styles.priorityRow}>
                    {NIVELES_PRIORIDAD.map((p) => {
                      const isSelected = value === p;
                      const isAlta = p === "Alta";
                      return (
                        <Pressable
                          key={p}
                          onPress={() => onChange(p)}
                          style={[
                            styles.priorityPill,
                            isSelected &&
                              !isAlta &&
                              styles.priorityPillSelected,
                            isSelected && isAlta && styles.priorityPillAlta,
                          ]}
                        >
                          <View
                            style={[
                              styles.chipColorDot,
                              {
                                backgroundColor: isAlta
                                  ? palette.tertiary[700]
                                  : p === "Media"
                                    ? palette.tertiary[500]
                                    : palette.neutral[500],
                              },
                            ]}
                          />
                          <Text
                            style={[
                              styles.priorityPillText,
                              isSelected && isAlta && styles.priorityTextAlta,
                            ]}
                          >
                            {p}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              />
            </View>

            {/* Botones de acción */}
            <View style={styles.actionButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.primarySubmitBtn,
                  pressed && { opacity: 0.9 },
                  isSubmitting && { opacity: 0.6 },
                ]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color={palette.white}
                />
                <Text style={styles.primarySubmitBtnText}>
                  {isSubmitting ? "Creando..." : "Crear Bloque de Estudio"}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => [
                  styles.draftBtn,
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Text style={styles.draftBtnText}>Guardar como borrador</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)", // Fondo oscurecido para ver ScheduleScreen detrás
    justifyContent: "flex-end",
  },
  dismissOverlay: {
    flex: 1,
  },
  sheetWrapper: {
    maxHeight: "88%", // Ocupa hasta el 88% inferior de la pantalla
  },
  sheetContent: {
    backgroundColor: palette.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
  },
  topHandleBar: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.neutral[300],
    alignSelf: "center",
    marginBottom: 14,
  },
  scrollInside: {
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerTexts: {
    flex: 1,
    paddingRight: 10,
  },
  modalTitle: {
    fontSize: fontSize.md || 17,
    fontWeight: "800",
    color: colors.text,
  },
  modalSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginBottom: 14,
  },
  sectionLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  fieldLabel: {
    fontSize: fontSize.xs || 12,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
  },
  requiredText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  chipsScroll: {
    marginHorizontal: -4,
  },
  chipsRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 4,
  },
  subjectChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.full || 9999,
    gap: 6,
  },
  subjectChipSelected: {
    backgroundColor: colors.primary,
  },
  chipColorDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  subjectChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: palette.neutral[700],
  },
  subjectChipTextSelected: {
    color: palette.white,
    fontWeight: "700",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F7FC",
    borderRadius: radius.lg || 14,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  inputBoxError: {
    borderWidth: 1,
    borderColor: colors.danger,
  },
  textInput: {
    flex: 1,
    fontSize: fontSize.xs || 13,
    color: colors.text,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 11,
    color: colors.danger,
    marginTop: 4,
  },
  timeInputsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  timeCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F4F7FC",
    borderRadius: radius.lg || 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  timeCardError: {
    borderWidth: 1,
    borderColor: colors.danger,
  },
  timeCardTexts: {
    flex: 1,
  },
  timeCardLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  timeCardValue: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
    marginTop: 1,
    padding: 0,
  },
  clockIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
  },
  durationRow: {
    flexDirection: "row",
    gap: 8,
  },
  durationPill: {
    flex: 1,
    backgroundColor: "#F4F7FC",
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  durationPillSelected: {
    backgroundColor: colors.primary,
  },
  durationPillText: {
    fontSize: 11,
    fontWeight: "600",
    color: palette.neutral[700],
  },
  durationPillTextSelected: {
    color: palette.white,
    fontWeight: "700",
  },
  focusModeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F7FC",
    borderRadius: radius.lg || 14,
    padding: 10,
    gap: 10,
  },
  focusModeIconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: palette.secondary[50],
    alignItems: "center",
    justifyContent: "center",
  },
  focusModeSub: {
    fontSize: 9,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  focusModeTitle: {
    fontSize: fontSize.xs || 12,
    fontWeight: "700",
    color: colors.text,
    marginTop: 1,
  },
  priorityRow: {
    flexDirection: "row",
    gap: 8,
  },
  priorityPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F7FC",
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  priorityPillSelected: {
    backgroundColor: "#E2E8F0",
  },
  priorityPillAlta: {
    backgroundColor: "#FED7AA",
  },
  priorityPillText: {
    fontSize: 11,
    fontWeight: "600",
    color: palette.neutral[700],
  },
  priorityTextAlta: {
    color: palette.tertiary[900],
    fontWeight: "800",
  },
  actionButtons: {
    marginTop: 6,
    gap: 10,
    alignItems: "center",
  },
  primarySubmitBtn: {
    width: "100%",
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    borderRadius: radius.lg || 16,
    gap: 8,
  },
  primarySubmitBtnText: {
    color: palette.white,
    fontWeight: "700",
    fontSize: fontSize.sm || 14,
  },
  draftBtn: {
    paddingVertical: 2,
  },
  draftBtnText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textSecondary,
  },
});
