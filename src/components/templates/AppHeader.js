import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, spacing, fontSize } from "../../theme";
import { Avatar } from "../atoms/Avatar.js";

export const AppHeader = ({
  appName = "Estudy",
  currentScreenTitle = "Apuntes",
  streakDays = 5,
  avatarSource,
  userName = "Sofía Morales",
  onAvatarPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Sección Izquierda: Logo e indicador de pantalla */}
      <View style={styles.leftSection}>
        <View style={styles.logoIcon}>
          <Ionicons name="book" size={18} color={palette.white} />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.appName}>{appName}</Text>
          <Text style={styles.currentScreen}>{currentScreenTitle}</Text>
        </View>
      </View>

      {/* Sección Derecha: Racha activa y Avatar */}
      <View style={styles.rightSection}>
        {streakDays > 0 && (
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={16} color={palette.tertiary[600]} />
            <Text style={styles.streakText}>{streakDays} días</Text>
          </View>
        )}

        <Avatar
          source={avatarSource}
          name={userName}
          size={36}
          onPress={onAvatarPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md ?? 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs ?? 10,
  },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.md ?? 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrapper: {
    justifyContent: "center",
  },
  appName: {
    fontSize: fontSize.md ?? 16,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: -0.3,
  },
  currentScreen: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textSecondary,
    marginTop: -2,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs ?? 10,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.tertiary[50],
    borderColor: palette.tertiary[200],
    borderWidth: 1,
    borderRadius: radius.full || 9999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  streakText: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.tertiary[800],
  },
});
