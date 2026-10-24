import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius } from "../../theme";

export const Checkbox = ({
  checked = false,
  onValueChange,
  disabled = false,
  size = 22,
  style,
}) => {
  const handlePress = () => {
    if (!disabled && onValueChange) {
      onValueChange(!checked);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      hitSlop={10}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      style={({ pressed }) => [
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: radius.xs ?? 6,
          backgroundColor: checked ? colors.primary : palette.surface,
          borderColor: checked ? colors.primary : palette.neutral[300],
        },
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {checked && (
        <Ionicons
          name="checkmark-sharp"
          size={size * 0.75}
          color={palette.white}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }],
  },
  disabled: {
    opacity: 0.4,
    backgroundColor: palette.neutral[100],
    borderColor: palette.neutral[200],
  },
});
