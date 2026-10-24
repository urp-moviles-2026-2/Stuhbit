import React from "react";
import { Switch as RNSwitch, Platform, StyleSheet } from "react-native";
import { colors, palette } from "../../theme";

export const Switch = ({
  value = false,
  onValueChange,
  disabled = false,
  activeColor = colors.primary, // palette.primary[500] (#4F46E5)
  inactiveColor = palette.neutral[300],
  thumbColorActive = palette.white,
  thumbColorInactive = palette.white,
  style,
}) => {
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: inactiveColor,
        true: activeColor,
      }}
      thumbColor={
        Platform.OS === "android"
          ? value
            ? thumbColorActive
            : thumbColorInactive
          : undefined
      }
      ios_backgroundColor={inactiveColor}
      style={[styles.base, style]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    // Escala sutil en Android para mantener proporciones ópticas con iOS
    transform:
      Platform.OS === "android" ? [{ scaleX: 0.95 }, { scaleY: 0.95 }] : [],
  },
});
