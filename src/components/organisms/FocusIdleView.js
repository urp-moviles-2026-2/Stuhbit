import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, fontSize, spacing } from "../../theme";
import { ProgressBar } from "../atoms/ProgressBar";

const PRESETS = [
  {
    id: "pomodoro",
    title: "Pomodoro",
    sub: "25m / 5m",
    minutes: 25,
    label: "Pomodoro Clásico",
  },
  {
    id: "deep",
    title: "Profundo",
    sub: "50m / 10m",
    minutes: 50,
    label: "Sesión Profunda",
  },
  {
    id: "free",
    title: "Libre",
    sub: "Cronómetro",
    minutes: 60,
    label: "Tiempo Libre",
  },
];

export const FocusIdleView = ({
  nextBlock,
  onStartPreset,
  onSelectNextBlock,
  onExplorePending,
}) => {
  const [selectedPreset, setSelectedPreset] = useState("pomodoro");
  const activePreset =
    PRESETS.find((p) => p.id === selectedPreset) || PRESETS[0];

  return (
    <View style={styles.container}>
      {/* 1. Header de estado superior */}
      <View style={styles.topStatusRow}>
        <View style={styles.statusPill}>
          <View style={styles.greenDot} />
          <Text style={styles.statusPillText}>ESPACIO ZEN LIBRE</Text>
        </View>
        <View style={styles.xpPill}>
          <Ionicons name="sparkles" size={13} color={colors.primary} />
          <Text style={styles.xpPillText}>+100 XP por sesión</Text>
        </View>
      </View>

      {/* 2. Ilustración / Dial en reposo */}
      <View style={styles.idleDialWrapper}>
        <View style={styles.readyBadge}>
          <Ionicons name="flash" size={10} color={palette.secondary[700]} />
          <Text style={styles.readyBadgeText}>Listo</Text>
        </View>

        <View style={styles.outerRing}>
          <View style={styles.middleRing}>
            <View style={styles.innerCircle}>
              <Ionicons
                name="hourglass-outline"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.timerZero}>00:00</Text>
            </View>
          </View>
        </View>

        <View style={styles.calmBadge}>
          <Ionicons
            name="time-outline"
            size={12}
            color={palette.tertiary[700]}
          />
          <Text style={styles.calmBadgeText}>Sin prisa</Text>
        </View>
      </View>

      {/* 3. Título principal */}
      <Text style={styles.mainTitle}>Tu espacio de enfoque está listo</Text>
      <Text style={styles.mainSubtitle}>
        Elige un bloque de tu cronograma o inicia un temporizador libre para
        proteger tu racha académica.
      </Text>

      {/* 4. Selector de técnica */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Modo de técnica</Text>
        <Pressable>
          <Text style={styles.linkText}>Personalizar</Text>
        </Pressable>
      </View>

      <View style={styles.presetCardsRow}>
        {PRESETS.map((preset) => {
          const isSelected = preset.id === selectedPreset;
          return (
            <Pressable
              key={preset.id}
              onPress={() => setSelectedPreset(preset.id)}
              style={[styles.presetCard, isSelected && styles.presetCardActive]}
            >
              <Text
                style={[
                  styles.presetTitle,
                  isSelected && styles.presetTitleActive,
                ]}
              >
                {preset.title}
              </Text>
              <Text
                style={[styles.presetSub, isSelected && styles.presetSubActive]}
              >
                {preset.sub}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* 5. Tarjeta de acción de arranque rápido */}
      <View style={styles.startActionCard}>
        <View style={styles.startCardHeader}>
          <View style={styles.playIconBox}>
            <Ionicons name="play" size={16} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.startCardTitle}>{activePreset.label}</Text>
            <Text style={styles.startCardSub}>
              Bloque de estudio: {activePreset.minutes} minutos
            </Text>
          </View>
          <View style={styles.preajusteBadge}>
            <Text style={styles.preajusteText}>Preajuste</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            pressed && { opacity: 0.85 },
          ]}
          onPress={() =>
            onStartPreset(activePreset.minutes, activePreset.label)
          }
        >
          <Ionicons name="play" size={18} color={palette.white} />
          <Text style={styles.startButtonText}>
            Comenzar Sesión ({activePreset.minutes} min)
          </Text>
        </Pressable>
      </View>

      {/* 6. Sugerencia: Desde tu cronograma */}
      {nextBlock && (
        <View style={styles.cronogramaBox}>
          <View style={styles.cronogramaHeader}>
            <Text style={styles.cronogramaSectionLabel}>
              DESDE TU CRONOGRAMA
            </Text>
            <View style={styles.nextBadge}>
              <Text style={styles.nextBadgeText}>
                Próximo {nextBlock.startTime}
              </Text>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.blockItemRow,
              pressed && { opacity: 0.85 },
            ]}
            onPress={() => onSelectNextBlock(nextBlock)}
          >
            <View style={styles.courseColorIndicator} />
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={styles.blockTitleText}>
                {nextBlock.course} · {nextBlock.title}
              </Text>
              <Text numberOfLines={1} style={styles.blockNotesText}>
                {nextBlock.notes || "Sesión regular programada"}
              </Text>
            </View>
            <View style={styles.arrowCircle}>
              <Ionicons name="arrow-forward" size={16} color={colors.primary} />
            </View>
          </Pressable>

          <Pressable onPress={onExplorePending} style={styles.exploreTasksRow}>
            <Ionicons name="list-outline" size={15} color={colors.primary} />
            <Text style={styles.exploreTasksText}>
              Explorar todas las tareas pendientes
            </Text>
          </Pressable>
        </View>
      )}

      {/* 7. Meta diaria & Stats Zen */}
      <View style={styles.metaCard}>
        <View style={styles.metaHeader}>
          <Text style={styles.metaLabel}>Meta diaria de enfoque</Text>
          <Text style={styles.metaValue}>0 / 120 min</Text>
        </View>
        <ProgressBar
          progress={0}
          color={colors.primary}
          height={6}
          style={{ marginVertical: 10 }}
        />

        <View style={styles.zenStatsRow}>
          <View style={styles.zenStatItem}>
            <View style={styles.rowInline}>
              <Ionicons
                name="flame-outline"
                size={14}
                color={palette.tertiary[600]}
              />
              <Text style={styles.zenStatBold}>5 días</Text>
            </View>
            <Text style={styles.zenStatSub}>Racha a salvo</Text>
          </View>

          <View style={styles.zenStatItem}>
            <View style={styles.rowInline}>
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color={palette.secondary[600]}
              />
              <Text style={styles.zenStatBold}>Nivel 4</Text>
            </View>
            <Text style={styles.zenStatSub}>Estudiante Zen</Text>
          </View>

          <View style={styles.zenStatItem}>
            <View style={styles.rowInline}>
              <Ionicons name="timer-outline" size={14} color={colors.primary} />
              <Text style={styles.zenStatBold}>2 h</Text>
            </View>
            <Text style={styles.zenStatSub}>Objetivo hoy</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 40,
  },
  topStatusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.secondary[50],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full || 9999,
    gap: 6,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.secondary[500],
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: "700",
    color: palette.secondary[700],
    letterSpacing: 0.5,
  },
  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.primary[50],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full || 9999,
    gap: 4,
  },
  xpPillText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
  },
  idleDialWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    position: "relative",
  },
  readyBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.secondary[100],
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full || 9999,
    gap: 4,
    position: "absolute",
    top: 0,
    right: 60,
    zIndex: 2,
  },
  readyBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: palette.secondary[800],
  },
  outerRing: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#F4F7FE",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  middleRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#EDF2FE",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  timerZero: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.neutral[500],
    marginTop: 2,
  },
  calmBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.tertiary[50],
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full || 9999,
    gap: 4,
    marginTop: -10,
  },
  calmBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: palette.tertiary[800],
  },
  mainTitle: {
    fontSize: fontSize.xl || 22,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
    marginTop: 14,
  },
  mainSubtitle: {
    fontSize: fontSize.xs || 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
    paddingHorizontal: 16,
    lineHeight: 18,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: fontSize.xs || 12,
    fontWeight: "700",
    color: colors.text,
  },
  linkText: {
    fontSize: fontSize.xs || 12,
    color: colors.primary,
    fontWeight: "600",
  },
  presetCardsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  presetCard: {
    flex: 1,
    backgroundColor: palette.white,
    borderRadius: radius.lg || 14,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    paddingVertical: 12,
    alignItems: "center",
  },
  presetCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  presetTitle: {
    fontSize: fontSize.xs || 13,
    fontWeight: "700",
    color: colors.text,
  },
  presetTitleActive: {
    color: palette.white,
  },
  presetSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  presetSubActive: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  startActionCard: {
    backgroundColor: palette.white,
    borderRadius: radius.lg || 14,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    padding: 14,
    marginBottom: 18,
  },
  startCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  playIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: palette.primary[50],
    alignItems: "center",
    justifyContent: "center",
  },
  startCardTitle: {
    fontSize: fontSize.xs || 13,
    fontWeight: "700",
    color: colors.text,
  },
  startCardSub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  preajusteBadge: {
    backgroundColor: palette.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  preajusteText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md || 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  startButtonText: {
    color: palette.white,
    fontWeight: "700",
    fontSize: fontSize.sm || 14,
  },
  cronogramaBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: radius.lg || 14,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    padding: 14,
    marginBottom: 18,
  },
  cronogramaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cronogramaSectionLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textSecondary,
    letterSpacing: 0.6,
  },
  nextBadge: {
    backgroundColor: palette.tertiary[50],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  nextBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: palette.tertiary[700],
  },
  blockItemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.white,
    padding: 12,
    borderRadius: radius.md || 10,
    gap: 10,
    borderWidth: 1,
    borderColor: palette.neutral[200],
  },
  courseColorIndicator: {
    width: 5,
    height: 32,
    borderRadius: 3,
    backgroundColor: palette.secondary[500],
  },
  blockTitleText: {
    fontSize: fontSize.xs || 13,
    fontWeight: "700",
    color: colors.text,
  },
  blockNotesText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: palette.primary[50],
    alignItems: "center",
    justifyContent: "center",
  },
  exploreTasksRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
  },
  exploreTasksText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  metaCard: {
    backgroundColor: palette.white,
    borderRadius: radius.lg || 14,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    padding: 14,
  },
  metaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaLabel: {
    fontSize: fontSize.xs || 12,
    fontWeight: "600",
    color: colors.text,
  },
  metaValue: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  zenStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  zenStatItem: {
    alignItems: "center",
  },
  rowInline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  zenStatBold: {
    fontSize: fontSize.xs || 12,
    fontWeight: "700",
    color: colors.text,
  },
  zenStatSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
});
