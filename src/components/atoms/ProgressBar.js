import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, palette, radius } from "../../theme";

export const ProgressBar = ({
  progress = 0, // Acepta valores normalizados de 0 a 1 (ej. 0.85) o porcentajes de 0 a 100 (ej. 85)
  color = colors.primary,
  trackColor = palette.neutral[200],
  height = 8,
  style,
}) => {
  // Normaliza el valor para que siempre quede entre 0 y 100%
  const normalizedProgress = progress > 1 ? progress : progress * 100;
  const clampedProgress = Math.min(100, Math.max(0, normalizedProgress));

  return (
    <View
      style={[
        styles.track,
        {
          height,
          backgroundColor: trackColor,
          borderRadius: radius.full || 9999,
        },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: 100,
        now: Math.round(clampedProgress),
      }}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress}%`,
            backgroundColor: color,
            borderRadius: radius.full || 9999,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "hidden",
    justifyContent: "center",
  },
  fill: {
    height: "100%",
  },
});
