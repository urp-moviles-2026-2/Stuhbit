import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize, fontWeight, radius, spacing } from "../theme";

export default function Card({ label, headerRight, children, style }) {
  const hasHeader = label || headerRight;
  return (
    <View style={[styles.card, style]}>
      {hasHeader && (
        <View style={styles.header}>
          {label ? <Text style={styles.label}>{label}</Text> : <View />}
          {headerRight}
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
