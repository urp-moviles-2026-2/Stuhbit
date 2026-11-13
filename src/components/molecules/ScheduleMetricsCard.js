import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, spacing, fontSize } from "../../theme";

export const ScheduleMetricsCard = ({
  completedBlocks = 3,
  totalBlocks = 5,
  focusedTime = "3h 15m",
  focusedPercentage = "65%",
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Columna Izquierda: Progreso de bloques */}
      <View style={styles.metricColumn}>
        <View style={styles.iconBadge}>
          <Ionicons name="layers-outline" size={16} color={colors.primary} />
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.captionLabel}>Progreso del día</Text>
          <Text style={styles.valueText}>
            {completedBlocks} / {totalBlocks} bloques
          </Text>
        </View>
      </View>

      {/* Separador vertical sutil */}
      <View style={styles.divider} />

      {/* Columna Derecha: Tiempo enfocado */}
      <View style={styles.metricColumn}>
        <View style={[styles.iconBadge, styles.iconBadgeSuccess]}>
          <Ionicons
            name="timer-outline"
            size={16}
            color={palette.secondary[600]}
          />
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.captionLabel}>Tiempo enfocado</Text>
          <View style={styles.rowPercent}>
            <Text style={styles.valueText}>{focusedTime}</Text>
            <Text style={styles.percentageText}>{focusedPercentage}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.white,
    borderRadius: radius.lg ?? 12,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    paddingVertical: spacing.sm ?? 10,
    paddingHorizontal: spacing.md ?? 14,
  },
  metricColumn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs ?? 8,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: radius.md ?? 8,
    backgroundColor: palette.primary[50],
    alignItems: "center",
    justifyContent: "center",
  },
  iconBadgeSuccess: {
    backgroundColor: palette.secondary[50],
  },
  textGroup: {
    flex: 1,
  },
  captionLabel: {
    fontSize: fontSize.xxs ?? 11,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  valueText: {
    fontSize: fontSize.xs ?? 13,
    fontWeight: "700",
    color: colors.text,
    marginTop: 1,
  },
  rowPercent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  percentageText: {
    fontSize: fontSize.xxs ?? 10,
    fontWeight: "600",
    color: palette.secondary[600],
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: palette.neutral[200],
    marginHorizontal: spacing.xs ?? 6,
  },
});
