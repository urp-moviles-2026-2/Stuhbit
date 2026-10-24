import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { colors, palette, radius, spacing } from "../../theme";

export const Card = ({
  children,
  onPress,
  variant = "elevated", // 'elevated' | 'outlined' | 'flat' | 'tinted'
  padding = "md", // 'none' | 'sm' | 'md' | 'lg'
  style,
  ...props
}) => {
  const isPressable = typeof onPress === "function";
  const Component = isPressable ? Pressable : View;

  const paddingValues = {
    none: 0,
    sm: spacing.sm ?? 8,
    md: spacing.md ?? 16,
    lg: spacing.lg ?? 24,
  };

  const variantStyles = {
    elevated: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      // Sombra sutil multiplataforma
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
    outlined: {
      backgroundColor: colors.surface,
      borderColor: colors.neutral[200],
      borderWidth: 1,
    },
    flat: {
      backgroundColor: colors.surface,
      borderColor: palette.neutral[200],
      borderWidth: 1,
    },
    tinted: {
      backgroundColor: palette.primary[50],
      borderColor: palette.primary[100],
      borderWidth: 1,
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.elevated;

  return (
    <Component
      onPress={onPress}
      style={({ pressed } = {}) => [
        styles.base,
        currentVariant,
        { padding: paddingValues[padding] },
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.xl ?? 16,
    width: "100%",
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
});
