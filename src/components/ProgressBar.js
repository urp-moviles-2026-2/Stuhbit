import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, radius, spacing } from "../theme";

export default function ProgressBar({
  progress = 0, 
  color = colors.primary,
  trackColor = colors.divider,
  height = spacing.sm, 
  style,
}) {
  const normalizedProgress =
    progress > 1
      ? Math.min(progress, 100)
      : Math.min(Math.max(progress * 100, 0), 100);

  return (
    <View
      style={[
        styles.track,
        {
          height,
          backgroundColor: trackColor,
          borderRadius: radius.pill,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${normalizedProgress}%`,
            backgroundColor: color,
            borderRadius: radius.pill,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});