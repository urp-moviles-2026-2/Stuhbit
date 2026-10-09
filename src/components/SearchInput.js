import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { colors, radius, spacing } from "../theme";

export default function SearchInput({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}                     
        onChangeText={onChangeText}       
        placeholder={placeholder}
        placeholderTextColor={colors.textPlaceholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
  },
  input: {
    height: 40,
    color: colors.text,
  },
});