import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, spacing, fontSize } from "../../theme";
import { Badge } from "../atoms/Badge.js";
import { Button } from "../atoms/Button.js";

export const TimelineItem = ({
  timeRange = "08:00 - 10:00",
  title,
  location,
  status = "programada", // 'finalizado' | 'en_curso' | 'programada' | 'sugerida'
  badgeLabel,
  badgeVariant = "neutral",
  nodeIcon = "checkmark",
  actionLabel,
  onActionPress,
  secondaryActionLabel,
  onSecondaryActionPress,
  isLast = false,
  style,
}) => {
  // Configuración del icono y color del nodo izquierdo
  const nodeConfig = {
    finalizado: {
      bg: palette.secondary[500],
      color: palette.white,
      icon: "checkmark",
    },
    en_curso: {
      bg: colors.primary,
      color: palette.white,
      icon: "school",
    },
    sugerida: {
      bg: palette.tertiary[100],
      color: palette.tertiary[700],
      icon: "sparkles",
    },
    programada: {
      bg: palette.secondary[100],
      color: palette.secondary[700],
      icon: "alarm",
    },
  };

  const currentNode = nodeConfig[status] || nodeConfig.programada;

  return (
    <View style={[styles.container, style]}>
      {/* Columna izquierda: Nodo y línea continua */}
      <View style={styles.timelineTrack}>
        <View style={[styles.node, { backgroundColor: currentNode.bg }]}>
          <Ionicons
            name={nodeIcon || currentNode.icon}
            size={14}
            color={currentNode.color}
          />
        </View>
        {!isLast && <View style={styles.line} />}
      </View>

      {/* Columna derecha: Tarjeta de contenido */}
      <View style={styles.cardWrapper}>
        <View style={styles.cardHeader}>
          <Text style={styles.timeRange}>{timeRange}</Text>
          {badgeLabel && (
            <Badge label={badgeLabel} variant={badgeVariant} size="sm" />
          )}
        </View>

        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        {location && (
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={13}
              color={colors.textSecondary}
            />
            <Text numberOfLines={1} style={styles.locationText}>
              {location}
            </Text>
          </View>
        )}

        {/* Botones de acción opcionales (como Aceptar bloque / Posponer) */}
        {(actionLabel || secondaryActionLabel) && (
          <View style={styles.actionRow}>
            {actionLabel && onActionPress && (
              <Button
                title={actionLabel}
                onPress={onActionPress}
                variant="primary"
                size="sm"
                fullWidth={false}
                style={styles.primaryActionButton}
              />
            )}
            {secondaryActionLabel && onSecondaryActionPress && (
              <Button
                title={secondaryActionLabel}
                onPress={onSecondaryActionPress}
                variant="ghost"
                size="sm"
                fullWidth={false}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  timelineTrack: {
    width: 36,
    alignItems: "center",
  },
  node: {
    width: 26,
    height: 26,
    borderRadius: radius.full || 9999,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: palette.neutral[200],
    marginVertical: 4,
  },
  cardWrapper: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg ?? 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm ?? 12,
    marginBottom: spacing.md ?? 14,
    marginLeft: 6,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  timeRange: {
    fontSize: fontSize.xs ?? 11,
    fontWeight: "700",
    color: colors.textSecondary,
  },
  title: {
    fontSize: fontSize.sm ?? 14,
    fontWeight: "700",
    color: colors.text,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontSize: fontSize.xs ?? 12,
    color: colors.textSecondary,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm ?? 10,
    gap: 8,
  },
  primaryActionButton: {
    paddingHorizontal: 12,
  },
});
