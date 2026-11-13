import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, spacing, fontSize } from "../../theme";
import { FormatBadge } from "../atoms/FormatBadge";
import { TagBadge } from "../atoms/TagBadge";

export const NoteListItem = ({
  type = "pdf",
  course = "Sistemas Móviles",
  title,
  lastModified = "Modificado hoy 11:45",
  syncStatus = "Sincronizado en la nube",
  tags = [],
  onPress,
  onMenuPress,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        style,
      ]}
    >
      {/* Fila superior: Tipo, Materia y Menú de tres puntos */}
      <View style={styles.topRow}>
        <View style={styles.badgeCourseGroup}>
          <FormatBadge type={type} />
          <Text numberOfLines={1} style={styles.courseText}>
            {course}
          </Text>
        </View>
        <Pressable onPress={onMenuPress} hitSlop={10} style={styles.menuBtn}>
          <Ionicons
            name="ellipsis-vertical"
            size={16}
            color={palette.neutral[500]}
          />
        </Pressable>
      </View>

      {/* Título de la nota */}
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>

      {/* Metadata y sincronización */}
      <Text numberOfLines={1} style={styles.meta}>
        {lastModified} · {syncStatus}
      </Text>

      {/* Tags de clasificación */}
      {tags.length > 0 && (
        <View style={styles.tagsRow}>
          {tags.map((tag, index) => (
            <TagBadge key={`${tag}-${index}`} label={tag} variant="primary" />
          ))}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    borderRadius: radius.lg || 14,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    padding: spacing.md || 14,
    marginBottom: spacing.sm || 10,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badgeCourseGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  courseText: {
    fontSize: fontSize.xs || 12,
    fontWeight: "600",
    color: colors.textSecondary,
    flex: 1,
  },
  menuBtn: {
    padding: 2,
  },
  title: {
    fontSize: fontSize.sm || 15,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  meta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
});
