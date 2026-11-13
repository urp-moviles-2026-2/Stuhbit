import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, fontSize } from "../../theme";

export const FocusTimerWidget = ({
  secondsLeft = 4498, // 01:14:58
  blockTag = "Cálculo II · Derivadas Parciales",
  blockStep = "En curso · Bloque 2 de 4",
  objective = "Guía de Ejercicios 4 (Ej. 1 al 12)",
  modeName = "Enfoque profundo",
}) => {
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      {/* Selector / Tag de Materia y Controles superiores */}
      <View style={styles.topRow}>
        <View style={styles.subjectPill}>
          <View style={styles.blueDot} />
          <Text numberOfLines={1} style={styles.subjectText}>
            {blockTag}
          </Text>
        </View>
        <View style={styles.topActions}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="bar-chart-outline"
              size={16}
              color={palette.neutral[700]}
            />
          </View>
          <View style={styles.iconCircle}>
            <Ionicons
              name="options-outline"
              size={16}
              color={palette.neutral[700]}
            />
          </View>
        </View>
      </View>

      {/* Badge de Progreso del Bloque */}
      <View style={styles.stepBadge}>
        <View style={styles.greenDot} />
        <Text style={styles.stepBadgeText}>{blockStep}</Text>
      </View>

      {/* Círculo del Temporizador */}
      <View style={styles.dialOuter}>
        <View style={styles.dialProgressRing} />
        <View style={styles.dialInner}>
          <Text style={styles.countdownText}>{formatTime(secondsLeft)}</Text>
          <Text style={styles.timeLabel}>TIEMPO RESTANTE</Text>
          <View style={styles.modeRow}>
            <Ionicons
              name="sparkles-outline"
              size={12}
              color={colors.primary}
            />
            <Text style={styles.modeText}>{modeName}</Text>
          </View>
        </View>
      </View>

      {/* Tarjeta de Objetivo fijado */}
      {objective && (
        <View style={styles.objectiveCard}>
          <View style={styles.objectiveLeft}>
            <Ionicons name="flag-outline" size={18} color={colors.primary} />
            <View>
              <Text style={styles.objectiveLabel}>Objetivo fijado</Text>
              <Text numberOfLines={1} style={styles.objectiveTitle}>
                {objective}
              </Text>
            </View>
          </View>
          <Ionicons
            name="create-outline"
            size={16}
            color={colors.textSecondary}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  subjectPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.primary[50],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full || 9999,
    gap: 6,
    flex: 1,
    marginRight: 10,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  subjectText: {
    fontSize: fontSize.xs || 12,
    fontWeight: "700",
    color: colors.primary,
  },
  topActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    alignItems: "center",
    justifyContent: "center",
  },
  stepBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.secondary[50],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.full || 9999,
    gap: 6,
    marginBottom: 20,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.secondary[500],
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: palette.secondary[700],
  },
  dialOuter: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#F3F7FF",
    borderWidth: 8,
    borderColor: "#E2EDFD",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: 10,
  },
  dialProgressRing: {
    position: "absolute",
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 125,
    borderWidth: 8,
    borderColor: "transparent",
    borderTopColor: colors.primary,
    borderRightColor: colors.primary,
    transform: [{ rotate: "35deg" }],
  },
  dialInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  countdownText: {
    fontSize: 34,
    fontWeight: "900",
    color: colors.text,
    letterSpacing: -1,
  },
  timeLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textSecondary,
    letterSpacing: 0.8,
    marginTop: 4,
  },
  modeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  modeText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: "600",
  },
  objectiveCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: palette.white,
    borderRadius: radius.lg || 14,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: "100%",
    marginTop: 20,
  },
  objectiveLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  objectiveLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  objectiveTitle: {
    fontSize: fontSize.xs || 13,
    fontWeight: "700",
    color: colors.text,
    marginTop: 1,
  },
});
