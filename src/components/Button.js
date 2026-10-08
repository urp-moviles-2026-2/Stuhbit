import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { colors, fontSize, fontWeight, radius, spacing } from "../theme";

export default function Button({
  icon,
  label,
  onPress,
  variant = "primary", // 'primary' | 'success' | 'secondary' | 'outlined'
  size = "md", // 'sm' | 'md'
  style,
  textStyle,
}) {
  const isOutlined = variant === "outlined";
  const isSecondary = variant === "secondary";
  const isSuccess = variant === "success";

  // Determinar color de texto e icono
  const contentColor =
    isOutlined || isSecondary ? colors.text : colors.textInverted;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.base,
        styles[variant],
        size === "sm" && styles.sizeSm,
        style,
      ]}
      onPress={onPress}
    >
      {icon ? (
        typeof icon === "string" ? (
          <Text style={[styles.iconText, { color: contentColor }]}>{icon}</Text>
        ) : (
          <View style={styles.iconWrap}>{icon}</View>
        )
      ) : null}
      <Text style={[styles.label, { color: contentColor }, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    borderRadius: radius.pill ?? 999, // Curvatura tipo cápsula del diseño
    paddingVertical: spacing.md ?? 12,
    paddingHorizontal: spacing.lg ?? 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeSm: {
    paddingVertical: spacing.xs ?? 8,
    paddingHorizontal: spacing.md ?? 14,
    borderRadius: radius.md ?? 8,
  },
  // Variantes de color
  primary: {
    backgroundColor: colors.primary, // Morado #4F46E5
  },
  success: {
    backgroundColor: colors.success, // Verde #10B981
  },
  secondary: {
    backgroundColor: colors.divider ?? "#F1F5F9", // Gris claro
  },
  outlined: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginRight: spacing.xs ?? 6,
  },
  iconWrap: {
    marginRight: spacing.xs ?? 6,
  },
  label: {
    fontSize: fontSize.sm ?? 14,
    fontWeight: fontWeight.bold ?? "700",
  },
});
