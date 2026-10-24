import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, spacing, fontSize } from "../../theme";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { IconButton } from "../atoms/IconButton";

export const StudyNoteCard = ({
  category = "Cálculo II",
  categoryVariant = "primary",
  fileInfo = "PDF · 4 págs",
  title,
  description,
  summaryBadge = "Resumen AI Generado",
  lastReviewText = "Último repaso: hace 2 días",
  subInfo = "12 tarjetas de memoria listas",
  accentColor = colors.primary,
  onStudyPress,
  onSharePress,
  onDownloadPress,
  onMenuPress,
  style,
}) => {
  return (
    <View style={[styles.card, { borderLeftColor: accentColor }, style]}>
      {/* Fila superior: Badges y menú */}
      <View style={styles.topHeader}>
        <View style={styles.badgeRow}>
          <Badge label={category} variant={categoryVariant} size="sm" />
          <Badge
            label={fileInfo}
            variant="neutral"
            size="sm"
            icon={
              <Ionicons
                name="document-text-outline"
                size={12}
                color={palette.neutral[600]}
              />
            }
          />
        </View>
        <IconButton
          icon={
            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={palette.neutral[600]}
            />
          }
          onPress={onMenuPress}
          size={32}
          variant="ghost"
        />
      </View>

      {/* Título y descripción */}
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      {description && (
        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>
      )}

      {/* Bloque interno de Resumen */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBadgeLine}>
          <Ionicons
            name="checkmark-circle-outline"
            size={15}
            color={palette.secondary[600]}
          />
          <Text style={styles.summaryBadgeText}>{summaryBadge}</Text>
        </View>
        <Text style={styles.lastReviewText}>{lastReviewText}</Text>
        <View style={styles.subInfoRow}>
          <Ionicons name="bulb-outline" size={14} color={colors.primary} />
          <Text style={styles.subInfoText}>{subInfo}</Text>
        </View>
      </View>

      {/* Botones inferiores */}
      <View style={styles.actionRow}>
        <Button
          title="Estudiar con este apunte"
          onPress={onStudyPress}
          variant="primary"
          size="sm"
          icon={
            <Ionicons name="play-circle-outline" size={18} color="#FFFFFF" />
          }
          style={styles.studyButton}
        />
        <IconButton
          icon={
            <Ionicons
              name="share-social-outline"
              size={18}
              color={colors.primary}
            />
          }
          onPress={onSharePress}
          variant="filled"
          size={38}
        />
        <IconButton
          icon={
            <Ionicons
              name="download-outline"
              size={18}
              color={colors.primary}
            />
          }
          onPress={onDownloadPress}
          variant="filled"
          size={38}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.white,
    borderRadius: radius.xl ?? 16,
    borderWidth: 1,
    borderColor: palette.primary[100],
    borderLeftWidth: 5,
    padding: spacing.md ?? 16,
    width: "100%",
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: spacing.md ?? 14,
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  title: {
    fontSize: fontSize.md ?? 16,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 22,
  },
  description: {
    fontSize: fontSize.xs ?? 13,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  summaryContainer: {
    backgroundColor: palette.neutral[50],
    borderRadius: radius.md ?? 10,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    padding: 10,
    marginTop: 10,
    gap: 4,
  },
  summaryBadgeLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  summaryBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.secondary[700],
  },
  lastReviewText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  subInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  subInfoText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    gap: 8,
  },
  studyButton: {
    flex: 1,
  },
});
