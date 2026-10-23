import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, spacing, fontSize } from "../../theme";
import { Card } from "../molecules/Card.js";

export const Banner = ({
  title,
  description,
  actionLabel,
  onActionPress,
  icon = <Ionicons name="sparkles" size={20} color={palette.white} />,
  badgeText,
  style,
}) => {
  return (
    <Card variant="tinted" style={[styles.container, style]}>
      <View style={styles.topRow}>
        <View style={styles.iconCircle}>{icon}</View>

        <View style={styles.headerTextGroup}>
          <View style={styles.titleLine}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            {badgeText && (
              <View style={styles.dotBadge}>
                <Text style={styles.dotBadgeText}>{badgeText}</Text>
              </View>
            )}
          </View>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>

      {actionLabel && onActionPress && (
        <Pressable
          onPress={onActionPress}
          hitSlop={6}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionPressed,
          ]}
        >
          <Text style={styles.actionText}>{actionLabel}</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.primary} />
        </Pressable>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.primary[50],
    borderColor: palette.primary[100],
    padding: spacing.md ?? 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm ?? 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: radius.full || 9999,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextGroup: {
    flex: 1,
  },
  titleLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontSize: fontSize.xs ?? 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: palette.primary[700],
    textTransform: "uppercase",
  },
  dotBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full || 9999,
    backgroundColor: palette.primary[200],
  },
  dotBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: palette.primary[800],
  },
  description: {
    fontSize: fontSize.sm ?? 14,
    color: palette.neutral[800],
    marginTop: 4,
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: spacing.sm ?? 12,
    gap: 4,
  },
  actionText: {
    fontSize: fontSize.sm ?? 14,
    fontWeight: "700",
    color: colors.primary,
  },
  actionPressed: {
    opacity: 0.7,
  },
});
