import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, palette, radius, spacing, fontSize } from "../../theme";

export const WeekDaySelector = ({
  days = [],
  selectedDay = "J",
  onSelectDay,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {days.map((item, index) => {
        const isSelected = item.day === selectedDay;

        return (
          <Pressable
            key={`${item.day}-${index}`}
            onPress={() => onSelectDay && onSelectDay(item.day)}
            style={({ pressed }) => [
              styles.dayCard,
              isSelected && styles.dayCardActive,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[styles.dayLetter, isSelected && styles.dayTextActive]}
            >
              {item.day}
            </Text>
            <Text
              style={[styles.dayNumber, isSelected && styles.dayTextActive]}
            >
              {item.date}
            </Text>

            <View
              style={[
                styles.indicatorDot,
                item.hasBlocks && {
                  backgroundColor: isSelected
                    ? palette.white
                    : palette.secondary[500],
                },
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: palette.white,
    borderRadius: radius.xl ?? 16,
    paddingVertical: spacing.sm ?? 8,
    paddingHorizontal: spacing.xs ?? 6,
    borderWidth: 1,
    borderColor: palette.neutral[200],
  },
  dayCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xs ?? 6,
    borderRadius: radius.md ?? 10,
    marginHorizontal: 2,
  },
  dayCardActive: {
    backgroundColor: colors.primary,
  },
  dayLetter: {
    fontSize: fontSize.xs ?? 11,
    fontWeight: "600",
    color: palette.neutral[500],
    marginBottom: 2,
  },
  dayNumber: {
    fontSize: fontSize.sm ?? 14,
    fontWeight: "700",
    color: colors.text,
  },
  dayTextActive: {
    color: palette.white,
  },
  indicatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "transparent",
    marginTop: 4,
  },
  pressed: {
    opacity: 0.8,
  },
});
