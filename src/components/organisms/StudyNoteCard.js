import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, spacing, fontSize } from "../../theme";
import { Card } from "../molecules/Card.js";
import { Badge } from "../atoms/Badge.js";
import { Button } from "../atoms/Button.js";
import { IconButton } from "../atoms/IconButton.js";

export const StudyNoteCard = ({
  category = "Cálculo II",
  categoryVariant = "primary",
  fileInfo = "PDF · 4 págs",
  title,
  description,
  thumbnailUri,
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
  const [containerWidth, setContainerWidth] = useState(0);
  const isCompact = containerWidth > 0 && containerWidth < 340;

  return (
    <View onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
      <Card variant="elevated" style={[styles.card, style]}>
        {/* Franja vertical de color de materia a la izquierda */}
        <View
          style={[styles.leftAccentBar, { backgroundColor: accentColor }]}
        />

        <View style={styles.contentWrapper}>
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

          {/* Título y extracto */}
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          {description && (
            <Text numberOfLines={2} style={styles.description}>
              {description}
            </Text>
          )}

          {/* Bloque interno de previsualización / resumen AI */}
          <View
            style={[
              styles.summaryContainer,
              isCompact && styles.summaryCompact,
            ]}
          >
            {thumbnailUri && (
              <Image
                source={
                  typeof thumbnailUri === "string"
                    ? { uri: thumbnailUri }
                    : thumbnailUri
                }
                style={styles.thumbnail}
                resizeMode="cover"
              />
            )}
            <View style={styles.summaryMeta}>
              <View style={styles.summaryBadgeLine}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={14}
                  color={palette.secondary[600]}
                />
                <Text style={styles.summaryBadgeText}>{summaryBadge}</Text>
              </View>
              <Text numberOfLines={1} style={styles.lastReviewText}>
                {lastReviewText}
              </Text>
              <View style={styles.subInfoRow}>
                <Ionicons
                  name="bulb-outline"
                  size={13}
                  color={colors.primary}
                />
                <Text numberOfLines={1} style={styles.subInfoText}>
                  {subInfo}
                </Text>
              </View>
            </View>
          </View>

          {/* Botonera inferior */}
          <View
            style={[styles.actionRow, isCompact && styles.actionRowCompact]}
          >
            <Button
              title="Estudiar con este apunte"
              onPress={onStudyPress}
              variant="primary"
              size="sm"
              icon={
                <Ionicons
                  name="play-circle-outline"
                  size={18}
                  color={palette.white}
                />
              }
              style={styles.studyButton}
            />
            <View style={styles.iconButtonGroup}>
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
                size={40}
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
                size={40}
              />
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 0,
    flexDirection: "row",
  },
  leftAccentBar: {
    width: 5,
    height: "100%",
  },
  contentWrapper: {
    flex: 1,
    padding: spacing.md ?? 16,
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs ?? 6,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    flexWrap: "wrap",
  },
  title: {
    fontSize: fontSize.md ?? 16,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 22,
  },
  description: {
    fontSize: fontSize.xs ?? 12,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  summaryContainer: {
    flexDirection: "row",
    backgroundColor: palette.neutral[50],
    borderRadius: radius.md ?? 10,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    padding: spacing.xs ?? 8,
    marginTop: spacing.sm ?? 12,
    gap: spacing.sm ?? 10,
    alignItems: "center",
  },
  summaryCompact: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: radius.sm ?? 6,
  },
  summaryMeta: {
    flex: 1,
    justifyContent: "center",
    gap: 2,
  },
  summaryBadgeLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
    marginTop: spacing.md ?? 14,
    gap: spacing.xs ?? 8,
  },
  actionRowCompact: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  studyButton: {
    flex: 1,
  },
  iconButtonGroup: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "flex-end",
  },
});
