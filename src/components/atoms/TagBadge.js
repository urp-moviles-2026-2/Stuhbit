import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, palette, radius, spacing, fontSize } from "../../theme";

export const TagBadge = ({
  label,
  icon,
  variant = "neutral",
  style,
  textStyle,
}) => {
  if (!label) return null;

  const variantStyles = {
    neutral: {
      bg: palette.neutral[100],
      text: palette.neutral[600],
    },
    primary: {
      bg: palette.primary[50],
      text: palette.primary[700],
    },
    warning: {
      bg: palette.tertiary[50],
      text: palette.tertiary[700],
    },
  };

  const current = variantStyles[variant] || variantStyles.neutral;

  return (
    <View style={[styles.container, { backgroundColor: current.bg }, style]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        numberOfLines={1}
        style={[styles.label, { color: current.text }, textStyle]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm ?? 8,
    paddingVertical: 3,
    borderRadius: radius.sm ?? 6,
    alignSelf: "flex-start",
  },
  icon: {
    marginRight: 4,
  },
  label: {
    fontSize: fontSize.xxs ?? 11,
    fontWeight: "500",
  },
});
