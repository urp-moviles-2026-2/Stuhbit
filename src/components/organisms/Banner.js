import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, spacing, fontSize } from "../../theme";

export const Banner = ({
  title,
  description,
  actionLabel,
  onActionPress,
  icon = <Ionicons name="sparkles" size={18} color="#FFFFFF" />,
  badgeText,
  style,
}) => {
  return (
    <View style={[styles.cardContainer, style]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: palette.white,
    borderColor: palette.primary[100],
    borderWidth: 1,
    borderRadius: radius.xl ?? 16,
    padding: spacing.md ?? 16,
    width: "100%",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextGroup: {
    flex: 1,
    gap: 4,
  },
  titleLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  title: {
    fontSize: fontSize.xs ?? 12,
    fontWeight: "800",
    letterSpacing: 0.6,
    color: palette.primary[900],
    textTransform: "uppercase",
  },
  dotBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: palette.primary[100],
  },
  dotBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: palette.primary[900],
  },
  description: {
    fontSize: fontSize.sm ?? 13,
    color: palette.neutral[800],
    lineHeight: 18,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 12,
    gap: 6,
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
