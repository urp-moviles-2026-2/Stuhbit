import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, radius, spacing, fontSize, fontWeight } from "../theme";

export default function Chip({ label, active = false, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
    >
      <Text style={[styles.label, active ? styles.textActive : styles.textInactive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
    marginRight: spacing.xs,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipInactive: {
    backgroundColor: colors.divider,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semiBold,
  },
  textActive: {
    color: colors.textInverted,
  },
  textInactive: {
    color: colors.textSecondary,
  },
});