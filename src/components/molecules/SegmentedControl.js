import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, palette, radius, spacing, fontSize } from "../../theme";

export const SegmentedControl = ({
  options = [],
  selectedIndex = 0,
  onChange,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;
        const label = typeof option === "string" ? option : option.label;

        return (
          <Pressable
            key={index}
            onPress={() => onChange && onChange(index)}
            style={({ pressed }) => [
              styles.segment,
              isSelected && styles.selectedSegment,
              pressed && !isSelected && styles.pressed,
            ]}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.segmentText,
                {
                  color: isSelected ? colors.primary : colors.textSecondary,
                  fontWeight: isSelected ? "700" : "500",
                },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.neutral[100],
    borderRadius: radius.lg ?? 12,
    padding: 4,
    width: "100%",
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.xs ?? 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: (radius.lg ?? 12) - 2,
  },
  selectedSegment: {
    backgroundColor: palette.white,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: fontSize.sm ?? 13,
  },
  pressed: {
    opacity: 0.7,
  },
});
