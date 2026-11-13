// src/screens/ScheduleScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// Redux & Context
import {
  selectAllBlocks,
  updateBlock,
  selectCompletedBlocksCount,
} from "../store/scheduleSlice.js";
import { useSesion } from "../context/SesionContext.js";

// Design System & Templates
import { colors, palette, spacing, fontSize, radius } from "../theme";
import { ScreenLayout } from "../components/templates/ScreenLayout.js";
import { AppHeader } from "../components/templates/AppHeader.js";

// Moléculas & Organismos
import { WeekDaySelector } from "../components/molecules/WeekDaySelector.js";
import { ScheduleMetricsCard } from "../components/molecules/ScheduleMetricsCard.js";
import { TimelineItem } from "../components/organisms/TimelineItem.js";

const DAYS_DATA = [
  { day: "L", date: "09", hasBlocks: false },
  { day: "M", date: "10", hasBlocks: true },
  { day: "X", date: "11", hasBlocks: true },
  { day: "J", date: "12", hasBlocks: true },
  { day: "V", date: "13", hasBlocks: false },
  { day: "S", date: "14", hasBlocks: true },
  { day: "D", date: "15", hasBlocks: false },
];

export default function ScheduleScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { usuario } = useSesion();

  const blocks = useSelector(selectAllBlocks);
  const completedCount = useSelector(selectCompletedBlocksCount);
  const totalCount = blocks.length;

  const [selectedDay, setSelectedDay] = useState("J");

  const handleToggleBlock = (item) => {
    const nextStatus =
      item.status === "completado" ? "pendiente" : "completado";
    dispatch(updateBlock({ id: item.id, status: nextStatus }));
  };

  return (
    <View style={styles.rootWrapper}>
      <ScreenLayout
        scrollable={true}
        header={
          <AppHeader
            appName="Stuhbit"
            currentScreenTitle="Cronograma"
            userName={usuario?.nombre || "Mateo"}
            streakDays={5}
            onAvatarPress={() => navigation.navigate("ProfileMenu")}
          />
        }
      >
        {/* 1. Saludo Inicial contextual */}
        <View style={styles.greetingHeader}>
          <Text style={styles.dateSubtitle}>JUEVES, 12 DE NOV</Text>
          <Text style={styles.greetingTitle}>
            ¡Hola, {usuario?.nombre || "Mateo"}! 👋
          </Text>
        </View>

        {/* 2. Selector de Días de la Semana */}
        <WeekDaySelector
          days={DAYS_DATA}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          style={styles.sectionSpacing}
        />

        {/* 3. Tarjeta de Métricas Rápidas */}
        <ScheduleMetricsCard
          completedBlocks={completedCount}
          totalBlocks={totalCount}
          focusedTime="3h 15m"
          focusedPercentage={`${Math.round((completedCount / (totalCount || 1)) * 100)}%`}
          style={styles.sectionSpacing}
        />

        {/* 4. Encabezado de la Sección de Cronograma */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleGroup}>
            <Text style={styles.sectionTitle}>Línea de Estudio y Clases</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{totalCount} sesiones</Text>
            </View>
          </View>
          <Pressable style={styles.filterButton}>
            <Ionicons
              name="filter-outline"
              size={14}
              color={palette.neutral[600]}
            />
            <Text style={styles.filterButtonText}>Filtrar</Text>
          </Pressable>
        </View>

        {/* 5. Lista de Bloques en la Línea de Tiempo */}
        <View style={styles.timelineContainer}>
          {blocks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="calendar-outline"
                size={40}
                color={palette.neutral[400]}
              />
              <Text style={styles.emptyText}>
                No hay bloques programados para este día.
              </Text>
            </View>
          ) : (
            blocks.map((item, index) => (
              <TimelineItem
                key={item.id}
                timeRange={`${item.startTime} - ${item.endTime}`}
                title={item.title}
                course={item.course}
                location={item.notes || "Campus / Virtual"}
                status={item.status}
                priority={item.type === "examen" ? "Prioridad Alta" : undefined}
                isLast={index === blocks.length - 1}
                onPress={() =>
                  navigation.navigate("DetalleBloque", { id: item.id })
                }
                onToggleComplete={() => handleToggleBlock(item)}
                onOpenPomodoro={() =>
                  navigation.navigate("EnfoqueTab", { id: item.id })
                }
              />
            ))
          )}
        </View>
      </ScreenLayout>

      {/* 6. Botón Flotante (FAB) para Agregar Bloque */}
      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={() => navigation.navigate("AgendarBloque")}
        accessibilityRole="button"
        accessibilityLabel="Añadir Bloque de Estudio"
      >
        <Ionicons name="add" size={20} color={palette.white} />
        <Text style={styles.fabText}>Añadir Bloque</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rootWrapper: {
    flex: 1,
    position: "relative",
  },
  greetingHeader: {
    marginBottom: spacing.xs ?? 6,
  },
  dateSubtitle: {
    fontSize: fontSize.xxs ?? 11,
    fontWeight: "700",
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  greetingTitle: {
    fontSize: fontSize.xl ?? 22,
    fontWeight: "800",
    color: colors.text,
    marginTop: 2,
  },
  sectionSpacing: {
    marginVertical: spacing.xs ?? 6,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm ?? 12,
    marginBottom: spacing.xs ?? 8,
  },
  sectionTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: fontSize.sm ?? 14,
    fontWeight: "700",
    color: colors.text,
  },
  countBadge: {
    backgroundColor: palette.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full || 9999,
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  filterButtonText: {
    fontSize: fontSize.xs ?? 12,
    color: palette.neutral[600],
    fontWeight: "600",
  },
  timelineContainer: {
    marginTop: spacing.xs ?? 6,
    paddingBottom: 80, // Margen para que el FAB no tape el último item
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: {
    fontSize: fontSize.sm ?? 14,
    color: colors.textSecondary,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 16,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: radius.full || 9999,
    gap: 6,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 99,
  },
  fabPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  fabText: {
    color: palette.white,
    fontWeight: "700",
    fontSize: fontSize.sm ?? 14,
  },
});
