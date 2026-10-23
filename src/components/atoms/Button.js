import React from "react";
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { colors, palette, radius, spacing, fontSize } from "../../theme";

export const Button = ({
  title,
  onPress,
  variant = "primary", // 'primary' | 'secondary' | 'success' | 'outline' | 'ghost'
  size = "md", // 'sm' | 'md' | 'lg'
  icon,
  iconPosition = "left", // 'left' | 'right'
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
  textStyle,
}) => {
  // Mapa de variantes utilizando tu paleta y tokens
  const variantStyles = {
    primary: {
      backgroundColor: colors.primary, // palette.primary[500]
      textColor: palette.white,
      borderColor: "transparent",
      loaderColor: palette.white,
      pressedBg: palette.primary[600],
    },
    secondary: {
      backgroundColor: palette.primary[50],
      textColor: palette.primary[700],
      borderColor: "transparent",
      loaderColor: palette.primary[700],
      pressedBg: palette.primary[100],
    },
    success: {
      backgroundColor: palette.secondary[700], // Verde oscuro del botón Enfoque
      textColor: palette.white,
      borderColor: "transparent",
      loaderColor: palette.white,
      pressedBg: palette.secondary[800],
    },
    outline: {
      backgroundColor: "transparent",
      textColor: colors.primary,
      borderColor: palette.primary[200],
      loaderColor: colors.primary,
      pressedBg: palette.primary[50],
    },
    ghost: {
      backgroundColor: "transparent",
      textColor: palette.neutral[700],
      borderColor: "transparent",
      loaderColor: palette.neutral[700],
      pressedBg: palette.neutral[100],
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.primary;

  // Tamaños y paddings proporcionales
  const sizeStyles = {
    sm: {
      paddingVertical: spacing.xs ?? 6,
      paddingHorizontal: spacing.sm ?? 12,
      fontSize: fontSize.xs ?? 12,
      iconGap: 6,
      height: 36,
    },
    md: {
      paddingVertical: spacing.sm ?? 10,
      paddingHorizontal: spacing.md ?? 16,
      fontSize: fontSize.sm ?? 14,
      iconGap: 8,
      height: 48,
    },
    lg: {
      paddingVertical: spacing.md ?? 14,
      paddingHorizontal: spacing.lg ?? 20,
      fontSize: fontSize.md ?? 16,
      iconGap: 10,
      height: 54,
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;
  const isActionDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isActionDisabled}
      style={({ pressed }) => [
        styles.baseButton,
        {
          backgroundColor: currentVariant.backgroundColor,
          borderColor: currentVariant.borderColor,
          borderWidth: currentVariant.borderColor !== "transparent" ? 1 : 0,
          borderRadius: radius.lg || 12,
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
          minHeight: currentSize.height,
          alignSelf: fullWidth ? "stretch" : "flex-start",
        },
        pressed &&
          !isActionDisabled && {
            backgroundColor: currentVariant.pressedBg,
            transform: [{ scale: 0.98 }],
          },
        disabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isActionDisabled }}
    >
      {loading ? (
        <ActivityIndicator color={currentVariant.loaderColor} size="small" />
      ) : (
        <View style={[styles.contentRow, { gap: currentSize.iconGap }]}>
          {icon && iconPosition === "left" && (
            <View style={styles.iconContainer}>{icon}</View>
          )}

          {title && (
            <Text
              numberOfLines={1}
              style={[
                styles.baseText,
                {
                  color: currentVariant.textColor,
                  fontSize: currentSize.fontSize,
                },
                textStyle,
              ]}
            >
              {title}
            </Text>
          )}

          {icon && iconPosition === "right" && (
            <View style={styles.iconContainer}>{icon}</View>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  baseText: {
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  disabled: {
    opacity: 0.5,
  },
});
