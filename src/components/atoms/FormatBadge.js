import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { palette, radius, fontSize } from "../../theme";

export const FormatBadge = ({ type = "pdf", style }) => {
  const badgeConfig = {
    pdf: {
      label: "PDF",
      icon: "document-text-outline",
      bg: palette.primary[50],
      color: palette.primary[700],
    },
    ocr: {
      label: "OCR Pizarra",
      icon: "camera-outline",
      bg: palette.secondary[50],
      color: palette.secondary[700],
    },
    markdown: {
      label: "Markdown",
      icon: "code-slash-outline",
      bg: palette.tertiary[50],
      color: palette.tertiary[700],
    },
    ia: {
      label: "Resumen IA",
      icon: "sparkles",
      bg: "#F5F3FF",
      color: "#7C3AED",
    },
  };

  const config = badgeConfig[type.toLowerCase()] || badgeConfig.pdf;

  return (
    <View style={[styles.container, { backgroundColor: config.bg }, style]}>
      <Ionicons
        name={config.icon}
        size={11}
        color={config.color}
        style={styles.icon}
      />
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm || 6,
    alignSelf: "flex-start",
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: fontSize.xxs || 11,
    fontWeight: "700",
  },
});
