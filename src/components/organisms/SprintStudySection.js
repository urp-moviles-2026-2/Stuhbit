import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, spacing, fontSize } from "../../theme";
import { Card } from "../molecules/Card.js";
import { Badge } from "../atoms/Badge.js";
import { Checkbox } from "../atoms/Checkbox.js";
import { Button } from "../atoms/Button.js";

export const SprintStudySection = ({
  items = [],
  onToggleItem,
  onStartFocus,
  totalDurationMinutes = 65,
  style,
}) => {
  const selectedCount = items.filter((i) => i.selected).length;

  return (
    <Card variant="outlined" style={[styles.container, style]}>
      {/* Cabecera del Sprint */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="stopwatch-outline"
              size={18}
              color={colors.primary}
            />
          </View>
          <Text style={styles.title}>Sprint de Estudio Hoy</Text>
        </View>
        <Badge
          label={`${selectedCount} seleccionados`}
          variant="primary"
          size="sm"
        />
      </View>

      <Text style={styles.subtitle}>
        Marca los materiales que quieres tener anclados en tu temporizador de
        concentración.
      </Text>

      {/* Lista de elementos interactivos */}
      <View style={styles.itemList}>
        {items.map((item) => (
          <View
            key={item.id}
            style={[styles.itemRow, item.selected && styles.itemRowActive]}
          >
            <Checkbox
              checked={item.selected}
              onValueChange={() => onToggleItem && onToggleItem(item.id)}
            />
            <View style={styles.itemTextContainer}>
              <Text numberOfLines={1} style={styles.itemTitle}>
                {item.title}
              </Text>
              <Text numberOfLines={1} style={styles.itemMeta}>
                {item.subject} · {item.recommendedTime} recomendados
              </Text>
            </View>
            <View style={styles.itemRightIndicator}>
              <Ionicons
                name={item.iconName || "moon-outline"}
                size={16}
                color={item.selected ? colors.primary : palette.neutral[400]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Botón de acción destacado */}
      <Button
        title={`Enviar a Modo Enfoque (${totalDurationMinutes} min total)`}
        onPress={onStartFocus}
        variant="success"
        size="md"
        icon={<Ionicons name="timer-outline" size={20} color={palette.white} />}
        style={styles.focusButton}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.md ?? 16,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    borderRadius: radius.xl ?? 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: radius.full || 9999,
    backgroundColor: palette.primary[50],
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: fontSize.md ?? 16,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.xs ?? 12,
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: spacing.md ?? 14,
    lineHeight: 18,
  },
  itemList: {
    gap: 8,
    marginBottom: spacing.md ?? 16,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm ?? 10,
    backgroundColor: palette.neutral[50],
    borderRadius: radius.md ?? 10,
    borderWidth: 1,
    borderColor: "transparent",
    gap: spacing.sm ?? 10,
  },
  itemRowActive: {
    backgroundColor: palette.primary[50],
    borderColor: palette.primary[100],
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: fontSize.sm ?? 13,
    fontWeight: "600",
    color: colors.text,
  },
  itemMeta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemRightIndicator: {
    paddingLeft: 4,
  },
  focusButton: {
    marginTop: 4,
  },
});
