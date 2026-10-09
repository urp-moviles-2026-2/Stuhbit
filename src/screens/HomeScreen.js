import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { colors, palette, spacing, fontSize, fontWeight, radius } from "../theme";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import ProgressBar from "../components/ProgressBar";
import SearchInput from "../components/SearchInput";

export default function HomeScreen() {
  const [query, setQuery] = useState("");

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* 1. Buscador controlado */}
      <View style={styles.searchSection}>
        <SearchInput
          placeholder="Buscar curso, tarea o apunte..."
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* 2. Saludo y contexto */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.greeting}>¡Hola, Estudiante! 👋</Text>
          <Badge label="Semana 6" variant="primary" dot />
        </View>
        <Text style={styles.subtitle}>
          Tienes 2 bloques libres sugeridos para hoy.
        </Text>
      </View>

      {/* 3. Tarjeta destacada: Bloque de estudio inteligente */}
      <Card
        style={styles.highlightCard}
        label="RECOMENDACIÓN DEL DÍA"
        headerRight={<Badge label="Libre" variant="warning" />}
      >
        <Text style={styles.highlightTime}>11:30 AM - 1:00 PM</Text>
        <Text style={styles.highlightDesc}>
          Espacio óptimo antes de tu clase de laboratorio.
        </Text>
        <View style={styles.actionRow}>
          <Button
            label="Aceptar bloque"
            variant="primary"
            size="sm"
            style={{ flex: 1 }}
            onPress={() => alert("Bloque de estudio reservado")}
          />
          <Button
            label="Posponer"
            variant="outlined"
            size="sm"
            style={{ flex: 1 }}
            onPress={() => alert("Bloque pospuesto")}
          />
        </View>
      </Card>

      {/* 4. Métricas / Progreso */}
      <Card
        label="META DIARIA"
        headerRight={<Text style={styles.progressPercent}>75%</Text>}
      >
        <Text style={styles.progressText}>1h 30m de 2h planeadas</Text>
        <ProgressBar progress={0.75} color={colors.primary} style={{ marginTop: spacing.sm }} />
      </Card>

      {/* 5. Lista de Actividades de la jornada */}
      <Text style={styles.sectionTitle}>CRONOGRAMA DE HOY</Text>

      <Card style={styles.scheduleCard}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.timeLabel}>08:00 - 10:00</Text>
          <Badge label="Finalizado" variant="success" dot />
        </View>
        <Text style={styles.classTitle}>Cálculo Diferencial</Text>
        <Text style={styles.classSubtitle}>Aula B-204 • Teoría</Text>
      </Card>

      <Card style={[styles.scheduleCard, styles.activeCard]}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.timeLabel}>10:00 - 11:30</Text>
          <Badge label="En curso" variant="primary" dot />
        </View>
        <Text style={styles.classTitle}>Desarrollo de Aplicaciones Móviles</Text>
        <Text style={styles.classSubtitle}>Laboratorio 4 • Práctica</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.huge,
  },
  searchSection: {
    marginBottom: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  highlightCard: {
    backgroundColor: palette.primary[50],
    borderColor: palette.primary[200],
  },
  highlightTime: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primaryDark,
    marginTop: spacing.xs,
  },
  highlightDesc: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  actionRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  progressPercent: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: fontWeight.medium,
  },
  sectionTitle: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
    letterSpacing: 1,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  scheduleCard: {
    marginBottom: spacing.sm,
  },
  activeCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xxs,
  },
  timeLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  classTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  classSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
});