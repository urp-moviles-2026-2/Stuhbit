import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, spacing, fontSize } from "../../theme";
import { TagBadge } from "../atoms/TagBadge";

export const TimelineItem = ({
  timeRange = "09:00 - 10:30",
  title,
  course,
  location,
  status = "pendiente", // 'completado' | 'en_curso' | 'pendiente'
  priority,
  isLast = false,
  onPress,
  onToggleComplete,
  onOpenPomodoro,
}) => {
  const isCompleted = status === "completado";
  const isInProgress = status === "en_curso";

  return (
    <View style={styles.container}>
      {/* 1. Track y Nodo de la Línea de Tiempo */}
      <View style={styles.trackCol}>
        <View
          style={[
            styles.node,
            isCompleted && styles.nodeCompleted,
            isInProgress && styles.nodeInProgress,
          ]}
        >
          {isCompleted ? (
            <Ionicons
              name="checkmark"
              size={14}
              color={palette.secondary[600]}
            />
          ) : isInProgress ? (
            <Ionicons
              name="stopwatch-outline"
              size={14}
              color={colors.primary}
            />
          ) : (
            <View style={styles.nodeDot} />
          )}
        </View>
        {!isLast && <View style={styles.trackLine} />}
      </View>

      {/* 2. Tarjeta del Bloque */}
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          isInProgress && styles.cardInProgress,
          pressed && styles.cardPressed,
        ]}
      >
        {/* Cabecera de la tarjeta: Horario, Status y Botón Check rápido */}
        <View style={styles.headerRow}>
          <View style={styles.timeAndStatus}>
            <Ionicons
              name="time-outline"
              size={13}
              color={isInProgress ? colors.primary : colors.textSecondary}
            />
            <Text
              style={[
                styles.timeText,
                isInProgress && { color: colors.primary, fontWeight: "700" },
              ]}
            >
              {timeRange}
            </Text>

            <View
              style={[
                styles.statusBadge,
                isCompleted && styles.statusBadgeCompleted,
                isInProgress && styles.statusBadgeInProgress,
              ]}
            >
              <Text
                style={[
                  styles.statusBadgeText,
                  isCompleted && styles.statusTextCompleted,
                  isInProgress && styles.statusTextInProgress,
                ]}
              >
                {isCompleted
                  ? "Completado"
                  : isInProgress
                    ? "• En curso"
                    : "Pendiente"}
              </Text>
            </View>

            {priority && (
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>⚡ {priority}</Text>
              </View>
            )}
          </View>

          {/* Botón rápido para cambiar estado */}
          <Pressable
            onPress={onToggleComplete}
            hitSlop={8}
            style={[
              styles.checkCircle,
              isCompleted && styles.checkCircleCompleted,
            ]}
          >
            <Ionicons
              name="checkmark"
              size={14}
              color={isCompleted ? palette.white : palette.neutral[400]}
            />
          </Pressable>
        </View>

        {/* Título y Curso */}
        <Text
          numberOfLines={2}
          style={[styles.title, isCompleted && styles.titleCompleted]}
        >
          {title}
        </Text>

        {/* Fila de Tags / Etiquetas */}
        <View style={styles.tagsRow}>
          {course && <TagBadge label={`#${course}`} variant="primary" />}
          {location && (
            <TagBadge
              label={location}
              icon={
                <Ionicons
                  name="location-outline"
                  size={11}
                  color={palette.neutral[600]}
                />
              }
            />
          )}
        </View>

        {/* Pie contextual para el bloque activo: Botón Pomodoro */}
        {isInProgress && onOpenPomodoro && (
          <View style={styles.pomodoroFooter}>
            <View style={styles.soundIndicator}>
              <Ionicons
                name="volume-medium-outline"
                size={14}
                color={palette.neutral[500]}
              />
              <Text style={styles.soundText}>Lluvia suave activa</Text>
            </View>
            <Pressable
              onPress={onOpenPomodoro}
              style={({ pressed }) => [
                styles.pomodoroBtn,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={styles.pomodoroBtnText}>Abrir Pomodoro →</Text>
            </Pressable>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    marginBottom: spacing.xs ?? 6,
  },
  trackCol: {
    width: 32,
    alignItems: "center",
  },
  node: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: palette.neutral[300],
    backgroundColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginTop: 10,
  },
  nodeCompleted: {
    borderColor: palette.secondary[500],
    backgroundColor: palette.secondary[50],
  },
  nodeInProgress: {
    borderColor: colors.primary,
    backgroundColor: palette.primary[50],
  },
  nodeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.neutral[300],
  },
  trackLine: {
    flex: 1,
    width: 2,
    backgroundColor: palette.neutral[200],
    marginVertical: 4,
  },
  card: {
    flex: 1,
    backgroundColor: palette.white,
    borderRadius: radius.lg ?? 14,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    padding: spacing.md ?? 14,
    marginBottom: spacing.sm ?? 10,
  },
  cardInProgress: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    backgroundColor: "#FDFEFF",
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  timeAndStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  timeText: {
    fontSize: fontSize.xxs ?? 12,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full || 9999,
    backgroundColor: palette.neutral[100],
  },
  statusBadgeCompleted: {
    backgroundColor: palette.secondary[50],
  },
  statusBadgeInProgress: {
    backgroundColor: palette.primary[50],
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: palette.neutral[600],
  },
  statusTextCompleted: {
    color: palette.secondary[700],
  },
  statusTextInProgress: {
    color: colors.primary,
  },
  priorityBadge: {
    backgroundColor: palette.tertiary[50],
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: "700",
    color: palette.tertiary[700],
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: palette.neutral[300],
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircleCompleted: {
    backgroundColor: palette.secondary[500],
    borderColor: palette.secondary[500],
  },
  title: {
    fontSize: fontSize.sm ?? 14,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: colors.textSecondary,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    marginTop: 2,
  },
  pomodoroFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: palette.neutral[100],
  },
  soundIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  soundText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  pomodoroBtn: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  pomodoroBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
});
