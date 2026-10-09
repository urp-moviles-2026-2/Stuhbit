import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize, fontWeight, radius, spacing } from "../theme";

export default function Badge({
  label,
  variant = "neutral", // 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
  dot = false,
  icon,
  style,
  textStyle,
}) {
  const badgeColors = {
    primary: {
      bg: colors.primarySoft,
      text: colors.primary,
      dot: colors.primary,
    },
    success: {
      bg: colors.successSoft,
      text: colors.success,
      dot: colors.success,
    },
    warning: {
      bg: colors.warningSoft,
      text: colors.warning,
      dot: colors.warning,
    },
    danger: {
      bg: colors.dangerSoft,
      text: colors.danger,
      dot: colors.danger,
    },
    neutral: {
      bg: colors.divider,
      text: colors.textSecondary,
      dot: colors.textSecondary,
    },
  };

  const themeConfig = badgeColors[variant] || badgeColors.neutral;

  return (
    <View style={[styles.badge, { backgroundColor: themeConfig.bg }, style]}>
      {dot && (
        <View style={[styles.dot, { backgroundColor: themeConfig.dot }]} />
      )}
      {icon ? (
        typeof icon === "string" ? (
          <Text style={[styles.iconText, { color: themeConfig.text }]}>
            {icon}
          </Text>
        ) : (
          <View style={styles.iconWrap}>{icon}</View>
        )
      ) : null}
      <Text style={[styles.label, { color: themeConfig.text }, textStyle]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: radius.circle,
    marginRight: spacing.xs,
  },
  iconText: {
    fontSize: fontSize.xs,
    marginRight: spacing.xxs,
  },
  iconWrap: {
    marginRight: spacing.xxs,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semiBold,
  },
});