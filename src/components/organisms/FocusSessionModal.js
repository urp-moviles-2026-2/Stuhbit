import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, fontSize } from "../../theme";
import { Button } from "../atoms/Button";

export const FocusSessionModal = ({
  visible,
  onClose,
  onConfirm,
  subject = "Cálculo II · Derivadas Parciales",
  durationMinutes = 45,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          {/* Tirador superior */}
          <View style={styles.pullIndicator} />

          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color={palette.neutral[600]} />
          </Pressable>

          {/* Icono de Trofeo/Medalla */}
          <View style={styles.iconCircle}>
            <Ionicons name="ribbon-outline" size={26} color={colors.primary} />
            <View style={styles.sparkleBadge}>
              <Ionicons name="sparkles" size={10} color={palette.white} />
            </View>
          </View>

          <Text style={styles.title}>¿Finalizar y registrar sesión?</Text>
          <Text style={styles.subtitle}>
            Has completado{" "}
            <Text style={styles.boldText}>
              {durationMinutes} minutos efectivos
            </Text>{" "}
            de estudio en {subject}. Revisa el resumen antes de guardar en tu
            cronograma.
          </Text>

          {/* Tarjeta Resumen */}
          <View style={styles.summaryBox}>
            <View style={styles.summaryTop}>
              <View style={styles.tagPill}>
                <View style={styles.blueDot} />
                <Text style={styles.tagPillText}>{subject}</Text>
              </View>
              <View style={styles.xpBadge}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={13}
                  color={palette.secondary[700]}
                />
                <Text style={styles.xpText}>+50 XP</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCol}>
                <Text style={styles.statLabel}>Tiempo enfocado</Text>
                <Text style={styles.statValue}>
                  {durationMinutes} <Text style={{ fontSize: 13 }}>min</Text>
                </Text>
                <Text style={styles.subStatLabel}>⚡ 100% de meta</Text>
              </View>

              <View style={styles.statCol}>
                <Text style={styles.statLabel}>Progreso del bloque</Text>
                <Text style={styles.statValue}>Bloque 2 / 4</Text>
                <Text style={styles.subStatLabel}>50% plan diario</Text>
              </View>
            </View>

            <View style={styles.completedTaskRow}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={palette.secondary[500]}
              />
              <Text numberOfLines={1} style={styles.completedTaskText}>
                Guía de Ejercicios 4 (Ej. 1 al 12)
              </Text>
              <Text style={styles.completedLabel}>Completada</Text>
            </View>
          </View>

          {/* Botones */}
          <Button
            title="Guardar y ver Comprobante"
            onPress={onConfirm}
            variant="primary"
            size="lg"
            style={{ width: "100%", marginTop: 14 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: palette.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  pullIndicator: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.neutral[300],
    marginBottom: 12,
  },
  closeBtn: {
    position: "absolute",
    right: 18,
    top: 18,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.neutral[100],
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: palette.primary[50],
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 12,
    position: "relative",
  },
  sparkleBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: palette.secondary[500],
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: fontSize.lg || 18,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: fontSize.xs || 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginVertical: 8,
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  boldText: {
    fontWeight: "700",
    color: colors.primary,
  },
  summaryBox: {
    width: "100%",
    backgroundColor: "#F9FBFE",
    borderRadius: radius.lg || 14,
    borderWidth: 1,
    borderColor: palette.primary[100],
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    padding: 14,
    marginVertical: 8,
  },
  summaryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tagPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  blueDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  tagPillText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.secondary[50],
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  xpText: {
    fontSize: 11,
    fontWeight: "700",
    color: palette.secondary[700],
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statCol: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    marginTop: 2,
  },
  subStatLabel: {
    fontSize: 10,
    color: palette.secondary[700],
    fontWeight: "600",
    marginTop: 2,
  },
  completedTaskRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.white,
    padding: 8,
    borderRadius: radius.md || 8,
    gap: 6,
    borderWidth: 1,
    borderColor: palette.neutral[200],
  },
  completedTaskText: {
    fontSize: 11,
    color: colors.text,
    fontWeight: "600",
    flex: 1,
  },
  completedLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: palette.secondary[700],
  },
});
