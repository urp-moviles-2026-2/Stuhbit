import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, palette, radius, spacing, fontSize } from "../../theme";

export const Badge = ({
  label,
  variant = "neutral",
  icon,
  size = "md",
  style,
  textStyle,
}) => {
  if (!label) return null;

  // Mapa de variantes conectado a tus escalas de palette
  const variantStyles = {
    primary: {
      backgroundColor: palette.primary[50],
      textColor: palette.primary[700],
      borderColor: palette.primary[100],
    },
    secondary: {
      backgroundColor: palette.secondary[50],
      textColor: palette.secondary[700],
      borderColor: palette.secondary[100],
    },
    success: {
      backgroundColor: palette.secondary[50],
      textColor: palette.secondary[700],
      borderColor: palette.secondary[100],
    },
    warning: {
      backgroundColor: palette.tertiary[50],
      textColor: palette.tertiary[700],
      borderColor: palette.tertiary[100],
    },
    tertiary: {
      backgroundColor: palette.tertiary[50],
      textColor: palette.tertiary[700],
      borderColor: palette.tertiary[100],
    },
    danger: {
      backgroundColor: "#FEF2F2", // Contraste suave para peligro
      textColor: palette.danger,
      borderColor: "#FEE2E2",
    },
    neutral: {
      backgroundColor: palette.neutral[100],
      textColor: palette.neutral[700],
      borderColor: palette.neutral[200],
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.neutral;
  const isSmall = size === "sm";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentVariant.backgroundColor,
          borderColor: currentVariant.borderColor,
          borderWidth: 1,
          paddingHorizontal: isSmall ? (spacing.xs ?? 6) : (spacing.sm ?? 10),
          paddingVertical: isSmall ? 2 : (spacing.xs ?? 4),
          borderRadius: radius.full || 9999,
        },
        style,
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text
        numberOfLines={1}
        style={[
          styles.text,
          {
            color: currentVariant.textColor,
            fontSize: isSmall ? (fontSize.xs ?? 11) : (fontSize.sm ?? 12),
          },
          textStyle,
        ]}
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
    alignSelf: "flex-start",
  },
  iconContainer: {
    marginRight: 4,
  },
  text: {
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
