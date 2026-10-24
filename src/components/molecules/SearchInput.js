import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, spacing, fontSize } from "../../theme";
import { IconButton } from "../atoms/IconButton";

export const SearchInput = ({
  value = "",
  onChangeText,
  placeholder = "Buscar en apuntes, materias o temas...",
  onFilterPress,
  style,
  inputStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const showClear = Boolean(value && value.length > 0);
  const hasFilter = typeof onFilterPress === "function";

  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={[
          styles.container,
          {
            borderColor: isFocused ? colors.primary : colors.border,
            backgroundColor: colors.surface,
          },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={isFocused ? colors.primary : colors.textPlaceholder}
          style={styles.searchIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textPlaceholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, inputStyle]}
          returnKeyType="search"
        />
        {showClear ? (
          <IconButton
            icon={
              <Ionicons
                name="close-circle"
                size={18}
                color={palette.neutral[400]}
              />
            }
            onPress={() => onChangeText && onChangeText("")}
            size={30}
            variant="ghost"
          />
        ) : null}
      </View>
      {hasFilter ? (
        <IconButton
          icon={
            <Ionicons name="options-outline" size={20} color={colors.text} />
          }
          onPress={onFilterPress}
          variant="outline"
          size={46}
          style={styles.filterButton}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: spacing.xs ?? 8,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: radius.lg ?? 12,
    paddingHorizontal: spacing.sm ?? 12,
    height: 46,
  },
  searchIcon: {
    marginRight: spacing.xs ?? 8,
  },
  input: {
    flex: 1,
    fontSize: fontSize.sm ?? 14,
    color: colors.text,
    height: "100%",
  },
  filterButton: {
    borderRadius: radius.lg ?? 12,
    backgroundColor: colors.surface,
  },
});
