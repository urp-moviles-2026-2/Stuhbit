import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, spacing, fontSize } from "../../theme";
import { FormatBadge } from "../atoms/FormatBadge";

export const RecentNoteCard = ({
  type = "pdf",
  course = "Sistemas Móviles",
  title,
  meta = "8 páginas · 2.4 MB",
  duration = "20m",
  onPress,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
    >
      {/* Vista previa / Portada sintética */}
      <View style={styles.previewContainer}>
        <FormatBadge type={type} style={styles.badgeOverlay} />
        {duration && (
          <View style={styles.durationBadge}>
            <Ionicons name="time-outline" size={11} color={palette.white} />
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        )}
        <View style={styles.previewPlaceholder}>
          <Ionicons
            name="newspaper-outline"
            size={32}
            color={palette.neutral[300]}
          />
        </View>
      </View>

      {/* Contenido textual */}
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.courseText}>
          {course.toUpperCase()}
        </Text>
        <Text numberOfLines={1} style={styles.titleText}>
          {title}
        </Text>
        <View style={styles.footerRow}>
          <Text numberOfLines={1} style={styles.metaText}>
            {meta}
          </Text>
          <Ionicons
            name="bookmark-outline"
            size={15}
            color={colors.textSecondary}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: palette.white,
    borderRadius: radius.lg || 14,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  previewContainer: {
    height: 105,
    backgroundColor: palette.neutral[100],
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeOverlay: {
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 2,
  },
  durationBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm || 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    zIndex: 2,
  },
  durationText: {
    color: palette.white,
    fontSize: 10,
    fontWeight: "600",
  },
  previewPlaceholder: {
    opacity: 0.7,
  },
  infoContainer: {
    padding: spacing.sm || 10,
  },
  courseText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  titleText: {
    fontSize: fontSize.xs || 13,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaText: {
    fontSize: 11,
    color: colors.textSecondary,
    flex: 1,
  },
});
