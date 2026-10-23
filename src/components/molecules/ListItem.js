import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, palette, spacing, fontSize } from "../../theme";

export const ListItem = ({
  title,
  subtitle,
  leftSlot,
  rightSlot,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
}) => {
  const isPressable = typeof onPress === "function";
  const Component = isPressable ? Pressable : View;

  return (
    <Component
      onPress={onPress}
      style={({ pressed } = {}) => [
        styles.container,
        pressed && isPressable && styles.pressed,
        style,
      ]}
      accessibilityRole={isPressable ? "button" : undefined}
    >
      {leftSlot && <View style={styles.leftSlot}>{leftSlot}</View>}

      <View style={styles.content}>
        {title && (
          <Text numberOfLines={1} style={[styles.title, titleStyle]}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text numberOfLines={2} style={[styles.subtitle, subtitleStyle]}>
            {subtitle}
          </Text>
        )}
      </View>

      {rightSlot && <View style={styles.rightSlot}>{rightSlot}</View>}
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: spacing.sm ?? 10,
    gap: spacing.sm ?? 12,
  },
  leftSlot: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  rightSlot: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: fontSize.sm ?? 14,
    fontWeight: "600",
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.xs ?? 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  pressed: {
    opacity: 0.7,
  },
});
