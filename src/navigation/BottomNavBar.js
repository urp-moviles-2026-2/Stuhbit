import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, palette, fontSize } from "../theme";

export const BottomNavBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  const iconMap = {
    Cronograma: { active: "time", inactive: "time-outline" },
    Calendario: { active: "calendar", inactive: "calendar-outline" },
    Apuntes: { active: "folder", inactive: "folder-outline" },
    Enfoque: { active: "timer", inactive: "timer-outline" },
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 8),
          height: 60 + Math.max(insets.bottom, 8),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        const iconConfig = iconMap[route.name] || {
          active: "ellipse",
          inactive: "ellipse-outline",
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={label}
          >
            <Ionicons
              name={isFocused ? iconConfig.active : iconConfig.inactive}
              size={22}
              color={isFocused ? colors.primary : palette.neutral[400]}
            />
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isFocused ? colors.primary : palette.neutral[500],
                  fontWeight: isFocused ? "700" : "500",
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
    backgroundColor: palette.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6,
    gap: 3,
  },
  tabLabel: {
    fontSize: fontSize.xs ?? 11,
  },
});
