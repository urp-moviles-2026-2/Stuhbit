import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, spacing, fontSize, radius } from "../theme";
import { ScreenLayout } from "../components/templates/ScreenLayout.js";
import { AppHeader } from "../components/templates/AppHeader.js";
import { Banner } from "../components/organisms/Banner.js";
import { Card } from "../components/molecules/Card.js";
import { ProgressBar } from "../components/atoms/ProgressBar.js";
import { TimelineItem } from "../components/organisms/TimelineItem.js";
import { Button } from "../components/atoms/Button.js";

export default function ScheduleScreen({ navigation }) {
  return (
    <ScreenLayout
      header={
        <AppHeader
          currentScreenTitle="Cronograma"
          streakDays={5}
          onAvatarPress={() => {}}
        />
      }
    >
      {/* Saludo inicial */}
      <View style={styles.greetingHeader}>
        <View>
          <Text style={styles.greetingTitle}>¡Hola, Sofía! 👋</Text>
          <Text style={styles.greetingSubtitle}>
            Hoy tienes <Text style={styles.boldText}>2 bloques libres</Text>{" "}
            ideales para estudiar y adelantar tareas.
          </Text>
        </View>
        <View style={styles.weekTag}>
          <Text style={styles.weekTagText}>• Semana 6</Text>
        </View>
      </View>

      {/* Hueco libre detectado */}
      <Banner
        title="Hueco Libre Detectado"
        description="11:30 AM - 1:00 PM (1h 30m libre) · Espacio óptimo entre Cálculo II y Física I."
        actionLabel="Iniciar sesión recomendada"
        onActionPress={() => navigation.navigate("Enfoque")}
        badgeText="En 45 min"
        style={styles.bannerSpacing}
      />

      {/* Métricas: Meta diaria y Racha activa */}
      <View style={styles.metricsRow}>
        <Card variant="elevated" style={styles.metricCard}>
          <View style={styles.metricCardTop}>
            <Text style={styles.metricLabel}>META DIARIA</Text>
            <Text style={styles.metricPercent}>85%</Text>
          </View>
          <View style={styles.metricValueRow}>
            <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color={palette.secondary[600]}
            />
            <View>
              <Text style={styles.metricMainValue}>1h 45m</Text>
              <Text style={styles.metricSubValue}>de 2h objetivo</Text>
            </View>
          </View>
          <ProgressBar
            progress={0.85}
            color={palette.secondary[600]}
            height={6}
            style={{ marginTop: 8 }}
          />
        </Card>

        <Card variant="elevated" style={styles.metricCard}>
          <View style={styles.metricCardTop}>
            <Text style={styles.metricLabel}>RACHA ACTIVA</Text>
            <Ionicons name="flame" size={16} color={palette.tertiary[600]} />
          </View>
          <Text style={styles.metricMainValue}>5 días seguidos</Text>
          <Text style={styles.metricSubValue}>¡Nuevo récord personal! 🔥</Text>
          <View style={styles.streakDotsRow}>
            {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
              <View
                key={d}
                style={[
                  styles.streakDot,
                  i < 5 ? styles.streakDotActive : styles.streakDotInactive,
                ]}
              >
                <Text
                  style={[
                    styles.streakDotText,
                    i < 5 && styles.streakDotTextActive,
                  ]}
                >
                  {d}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      </View>

      {/* Encabezado del Cronograma */}
      <View style={styles.scheduleTitleRow}>
        <Text style={styles.sectionTitle}>Cronograma de Hoy</Text>
        <Text style={styles.weekLink}>Ver semana</Text>
      </View>

      {/* Línea de tiempo */}
      <View style={styles.timelineList}>
        <TimelineItem
          timeRange="08:00 - 10:00"
          title="Cálculo Diferencial"
          location="Aula B-204"
          status="finalizado"
          badgeLabel="Finalizado"
          badgeVariant="success"
        />

        <TimelineItem
          timeRange="10:00 - 11:30"
          title="Algoritmos y Estructuras"
          location="Laboratorio 3 · Edificio Norte"
          status="en_curso"
          badgeLabel="En curso"
          badgeVariant="primary"
        />

        <TimelineItem
          timeRange="11:30 - 13:00 (1h 30m)"
          title="Recomendación: Repaso Cálculo Diferencial"
          location="Basado en tu examen del lunes. Tienes 4 ejercicios pendientes del tema 3."
          status="sugerida"
          badgeLabel="Ventana sugerida"
          badgeVariant="warning"
          actionLabel="Aceptar bloque"
          onActionPress={() => navigation.navigate("Enfoque")}
          secondaryActionLabel="Posponer"
          onSecondaryActionPress={() => {}}
        />

        <TimelineItem
          timeRange="14:00 - 16:00"
          title="Física Aplicada"
          location="Aula Magna"
          status="programada"
          badgeLabel="2h 00m"
          badgeVariant="neutral"
          nodeIcon="book-outline"
        />

        <TimelineItem
          timeRange="16:30 - 17:30"
          title="Revisar apuntes de Algoritmos"
          location="1h libre · Biblioteca Central"
          status="programada"
          badgeLabel="Programada"
          badgeVariant="success"
          isLast={true}
        />
      </View>

      {/* Acciones Rápidas */}
      <Text style={[styles.sectionTitle, { marginTop: spacing.md }]}>
        Acciones Rápidas
      </Text>
      <View style={styles.quickActionsRow}>
        <Card variant="outlined" style={styles.quickActionCard}>
          <Ionicons name="calendar-outline" size={20} color={colors.primary} />
          <Text style={styles.quickActionTitle}>Subir horario</Text>
          <Text style={styles.quickActionSub}>PDF o foto de matrícula</Text>
        </Card>
        <Card variant="outlined" style={styles.quickActionCard}>
          <Ionicons name="create-outline" size={20} color={colors.primary} />
          <Text style={styles.quickActionTitle}>Apunte rápido</Text>
          <Text style={styles.quickActionSub}>Nota o audio a texto</Text>
        </Card>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  greetingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm ?? 10,
  },
  greetingTitle: {
    fontSize: fontSize.xl ?? 20,
    fontWeight: "800",
    color: colors.text,
  },
  greetingSubtitle: {
    fontSize: fontSize.xs ?? 13,
    color: colors.textSecondary,
    marginTop: 4,
    maxWidth: 240,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: "700",
    color: colors.primary,
  },
  weekTag: {
    backgroundColor: palette.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full || 9999,
  },
  weekTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  bannerSpacing: {
    marginVertical: spacing.sm ?? 12,
  },
  metricsRow: {
    flexDirection: "row",
    gap: spacing.sm ?? 12,
    marginBottom: spacing.md ?? 16,
  },
  metricCard: {
    flex: 1,
    padding: spacing.sm ?? 12,
  },
  metricCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: colors.textSecondary,
  },
  metricPercent: {
    fontSize: 11,
    fontWeight: "700",
    color: palette.secondary[700],
  },
  metricValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metricMainValue: {
    fontSize: fontSize.sm ?? 14,
    fontWeight: "700",
    color: colors.text,
  },
  metricSubValue: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  streakDotsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  streakDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  streakDotActive: {
    backgroundColor: palette.secondary[600],
  },
  streakDotInactive: {
    backgroundColor: palette.neutral[100],
  },
  streakDotText: {
    fontSize: 9,
    fontWeight: "700",
    color: palette.neutral[500],
  },
  streakDotTextActive: {
    color: palette.white,
  },
  scheduleTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: spacing.sm ?? 10,
  },
  sectionTitle: {
    fontSize: fontSize.md ?? 16,
    fontWeight: "700",
    color: colors.text,
  },
  weekLink: {
    fontSize: fontSize.xs ?? 12,
    fontWeight: "600",
    color: colors.primary,
  },
  timelineList: {
    marginTop: 4,
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: spacing.sm ?? 10,
    marginTop: spacing.xs ?? 8,
    marginBottom: spacing.xl ?? 24,
  },
  quickActionCard: {
    flex: 1,
    padding: spacing.sm ?? 12,
    gap: 4,
  },
  quickActionTitle: {
    fontSize: fontSize.sm ?? 13,
    fontWeight: "700",
    color: colors.text,
    marginTop: 2,
  },
  quickActionSub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
