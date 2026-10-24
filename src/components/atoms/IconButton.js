import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { colors, palette, radius } from "../../theme";

export const IconButton = ({
  icon,
  onPress,
  variant = "ghost", // 'ghost' | 'filled' | 'tinted' | 'outline'
  size = 40,
  disabled = false,
  accessibilityLabel = "Botón de acción",
  style,
}) => {
  // Variantes adaptadas a tu paleta de colores
  const variantStyles = {
    ghost: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      pressedBg: palette.neutral[100],
    },
    filled: {
      backgroundColor: palette.primary[50], // Fondo suave como compartir/descargar en Apuntes
      borderColor: "transparent",
      pressedBg: palette.primary[100],
    },
    tinted: {
      backgroundColor: palette.neutral[100],
      borderColor: "transparent",
      pressedBg: palette.neutral[200],
    },
    outline: {
      backgroundColor: "transparent",
      borderColor: palette.neutral[200],
      pressedBg: palette.neutral[50],
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.ghost;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={size < 44 ? Math.ceil((44 - size) / 2) : 6}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: radius.md ?? 10,
          backgroundColor: currentVariant.backgroundColor,
          borderColor: currentVariant.borderColor,
          borderWidth: currentVariant.borderColor !== "transparent" ? 1 : 0,
        },
        pressed &&
          !disabled && {
            backgroundColor: currentVariant.pressedBg,
            transform: [{ scale: 0.94 }],
          },
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.4,
  },
});
