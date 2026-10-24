import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, spacing, fontSize, radius } from "../theme";
import { ScreenLayout } from "../components/templates/ScreenLayout";
import { AppHeader } from "../components/templates/AppHeader";
import { SegmentedControl } from "../components/molecules/SegmentedControl";
import { Card } from "../components/molecules/Card";
import { Button } from "../components/atoms/Button";
import { Switch } from "../components/atoms/Switch";
import { ProgressBar } from "../components/atoms/ProgressBar";
import { Badge } from "../components/atoms/Badge";

export default function FocusScreen() {
  const [durationIndex, setDurationIndex] = useState(2);
  const [selectedSound, setSelectedSound] = useState("rain");
  const [dndEnabled, setDndEnabled] = useState(true);

  return (
    <ScreenLayout
      header={
        <AppHeader
          currentScreenTitle="Enfoque"
          streakDays={5}
          onAvatarPress={() => {}}
        />
      }
    >
      <View style={styles.focusHeader}>
        <Badge label="⚡ Ventana libre detectada" variant="primary" size="sm" />
        <Badge label="⏱ Hasta 16:30" variant="neutral" size="sm" />
      </View>

      <Text style={styles.mainTitle}>
        Sesión de Estudio en tu Ventana Libre (1h 30m)
      </Text>
      <Text style={styles.mainSubtitle}>
        Aprovecha el intervalo óptimo para avanzar tu preparación sin
        interrupciones.
      </Text>

      <Text style={styles.fieldLabel}>DURACIÓN SELECCIONADA</Text>
      <SegmentedControl
        options={["45 min (Rápido)", "60 min (Estándar)", "90 min (Óptimo)"]}
        selectedIndex={durationIndex}
        onChange={setDurationIndex}
        style={{ marginBottom: spacing.md }}
      />

      <Card variant="elevated" style={styles.timerCard}>
        <Badge
          label="• Concentración máxima activa"
          variant="success"
          size="sm"
          style={styles.activePill}
        />

        <View style={styles.circleOuter}>
          <View style={styles.circleInner}>
            <Text style={styles.timerCountdown}>01:15:00</Text>
            <View style={styles.transcurredRow}>
              <Ionicons
                name="time-outline"
                size={14}
                color={colors.textSecondary}
              />
              <Text style={styles.transcurredText}>15m transcurridos</Text>
            </View>
          </View>
        </View>

        <Badge
          label="• Cálculo II · Derivadas Parciales"
          variant="primary"
          size="sm"
          style={{ marginTop: 12 }}
        />
        <Text style={styles.timerNote}>
          Bloque de práctica guiada y problemas pares
        </Text>
      </Card>

      <Card variant="outlined" style={styles.linkedNotesCard}>
        <View style={styles.linkedLeft}>
          <Ionicons
            name="document-text-outline"
            size={20}
            color={colors.primary}
          />
          <View>
            <Text style={styles.linkedTitle}>Ver Apuntes vinculados</Text>
            <Text style={styles.linkedSub}>
              PDF 4 págs · Teorema de Schwarz & Regla de la cadena
            </Text>
          </View>
        </View>
        <Ionicons name="eye-outline" size={20} color={colors.textSecondary} />
      </Card>

      <Text style={[styles.fieldLabel, { marginTop: spacing.md }]}>
        FONDO SONORO
      </Text>
      <View style={styles.soundGroupRow}>
        {[
          { id: "silent", label: "Silencio", icon: "volume-mute-outline" },
          { id: "rain", label: "Lluvia suave", icon: "rainy-outline" },
          { id: "noise", label: "Ruido blanco", icon: "radio-outline" },
        ].map((snd) => {
          const isSelected = selectedSound === snd.id;
          return (
            <Pressable
              key={snd.id}
              onPress={() => setSelectedSound(snd.id)}
              style={[styles.soundTile, isSelected && styles.soundTileActive]}
            >
              <Ionicons
                name={snd.icon}
                size={22}
                color={isSelected ? palette.white : colors.text}
              />
              <Text
                style={[
                  styles.soundTileLabel,
                  isSelected && styles.soundTileLabelActive,
                ]}
              >
                {snd.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Card variant="flat" style={styles.switchRow}>
        <View style={styles.switchTextCol}>
          <Text style={styles.switchTitle}>Modo no molestar</Text>
          <Text style={styles.switchSub}>
            Bloquear notificaciones y alertas
          </Text>
        </View>
        <Switch value={dndEnabled} onValueChange={setDndEnabled} />
      </Card>

      <View style={styles.controlsRow}>
        <Button
          title="Pausar"
          variant="outline"
          size="md"
          icon={
            <Ionicons
              name="pause-circle-outline"
              size={20}
              color={colors.primary}
            />
          }
          onPress={() => {}}
          style={{ flex: 1 }}
        />
        <Button
          title="Completar"
          variant="success"
          size="md"
          icon={
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={palette.white}
            />
          }
          onPress={() => {}}
          style={{ flex: 1 }}
        />
      </View>

      <Card variant="elevated" style={styles.metaCard}>
        <View style={styles.metaCardTop}>
          <Text style={styles.metaTitle}>Meta de estudio de hoy</Text>
          <Badge label="+120 Pts" variant="success" size="sm" />
        </View>
        <View style={styles.metaProgressLabels}>
          <Text style={styles.metaSub}>Progreso actual: 80%</Text>
          <Text style={styles.metaSub}>Llegarás al 100%</Text>
        </View>
        <ProgressBar
          progress={0.8}
          color={palette.secondary[600]}
          height={7}
          style={{ marginVertical: 8 }}
        />
        <Text style={styles.metaTip}>
          Al completar esta sesión alcanzarás el{" "}
          <Text style={styles.boldText}>100% de tu meta de estudio de hoy</Text>{" "}
          y extenderás tu racha a{" "}
          <Text style={styles.boldText}>6 días consecutivos</Text>.
        </Text>
      </Card>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  focusHeader: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: fontSize.lg ?? 18,
    fontWeight: "800",
    color: colors.text,
    lineHeight: 24,
  },
  mainSubtitle: {
    fontSize: fontSize.xs ?? 13,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.md ?? 16,
    lineHeight: 18,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  timerCard: {
    alignItems: "center",
    padding: spacing.lg ?? 20,
    marginBottom: spacing.md ?? 16,
  },
  activePill: {
    marginBottom: spacing.md ?? 16,
  },
  circleOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: palette.primary[100],
    borderTopColor: colors.primary,
    borderRightColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  circleInner: {
    alignItems: "center",
  },
  timerCountdown: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -1,
  },
  transcurredRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  transcurredText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  timerNote: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  linkedNotesCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.sm ?? 12,
    marginBottom: spacing.md ?? 16,
  },
  linkedLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  linkedTitle: {
    fontSize: fontSize.sm ?? 13,
    fontWeight: "700",
    color: colors.text,
  },
  linkedSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  soundGroupRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: spacing.md ?? 16,
  },
  soundTile: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radius.lg ?? 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  soundTileActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  soundTileLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
  },
  soundTileLabelActive: {
    color: palette.white,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md ?? 14,
    marginBottom: spacing.md ?? 16,
  },
  switchTextCol: {
    flex: 1,
  },
  switchTitle: {
    fontSize: fontSize.sm ?? 14,
    fontWeight: "700",
    color: colors.text,
  },
  switchSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  controlsRow: {
    flexDirection: "row",
    gap: spacing.sm ?? 10,
    marginBottom: spacing.md ?? 16,
  },
  metaCard: {
    padding: spacing.md ?? 16,
    marginBottom: spacing.xl ?? 28,
  },
  metaCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaTitle: {
    fontSize: fontSize.sm ?? 14,
    fontWeight: "700",
    color: colors.text,
  },
  metaProgressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  metaSub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  metaTip: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: "700",
    color: colors.text,
  },
});
