// src/components/FormField.js
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors, spacing, typography, radius } from "../theme";

const FormField = forwardRef(function FormField(
  {
    control,
    name,
    label,
    style,
    multiline = false,
    numberOfLines = 1,
    ...inputProps
  },
  ref,
) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.contenedor}>
          {label ? <Text style={styles.label}>{label}</Text> : null}
          <TextInput
            ref={ref}
            value={value !== undefined && value !== null ? String(value) : ""}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline={multiline}
            numberOfLines={numberOfLines}
            placeholderTextColor={colors.textTertiary}
            style={[
              styles.input,
              multiline && styles.inputMultiline,
              Boolean(error) && styles.inputError,
              style,
            ]}
            accessibilityLabel={label || name}
            {...inputProps}
          />
          {error?.message ? (
            <Text style={styles.mensajeError} accessibilityRole="alert">
              {error.message}
            </Text>
          ) : null}
        </View>
      )}
    />
  );
});

const styles = StyleSheet.create({
  contenedor: {
    gap: spacing.xs || 4,
    marginBottom: spacing.xs || 4,
  },
  label: {
    ...typography.caption,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    fontSize: 15,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: colors.danger,
  },
  mensajeError: {
    ...typography.caption,
    color: colors.danger,
    marginTop: 2,
  },
});

export default FormField;
