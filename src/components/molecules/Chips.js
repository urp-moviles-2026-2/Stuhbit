import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { colors, palette, radius, spacing, fontSize } from "../../theme";

export const Chips = ({
  label,
  selected = false,
  onPress,
  icon,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: selected ? colors.primary : palette.surface,
          borderColor: selected ? colors.primary : palette.neutral[200],
        },
        pressed && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text
        numberOfLines={1}
        style={[
          styles.text,
          {
            color: selected ? palette.white : palette.neutral[700],
            fontSize: fontSize.sm ?? 13,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md ?? 14,
    paddingVertical: spacing.xs ?? 8,
    borderRadius: radius.full || 9999,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  iconContainer: {
    marginRight: 6,
  },
  text: {
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});
