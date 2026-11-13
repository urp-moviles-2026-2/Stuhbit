import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { colors, palette, spacing, fontSize, radius } from "../theme";
import { ScreenLayout } from "../components/templates/ScreenLayout";
import { AppHeader } from "../components/templates/AppHeader";
import { SearchInput } from "../components/molecules/SearchInput";
import { Chips } from "../components/molecules/Chips";
import { RecentNoteCard } from "../components/molecules/RecentNoteCard";
import { NoteListItem } from "../components/organisms/NoteListItem";
import { useSesion } from "../context/SesionContext";

const FILTER_SUBJECTS = [
  { id: "all", label: "Todos" },
  { id: "moviles", label: "Sistemas Móviles", color: colors.primary },
  { id: "db", label: "Base de Datos", color: palette.secondary[500] },
  { id: "redes", label: "Redes", color: palette.tertiary[600] },
];

const RECENT_NOTES = [
  {
    id: "r1",
    type: "pdf",
    course: "Sistemas Móviles",
    title: "Arquitectura BCE & Stat...",
    meta: "8 páginas · 2.4 MB",
    duration: "20m",
  },
  {
    id: "r2",
    type: "ocr",
    course: "Base de Datos",
    title: "Normalización (1FN...",
    meta: "Texto extraído 95%",
    duration: "15m",
  },
  {
    id: "r3",
    type: "markdown",
    course: "Redes",
    title: "Direccionamiento IPv6",
    meta: "Markdown · 3 temas",
    duration: "30m",
  },
];

const ALL_NOTES = [
  {
    id: "n1",
    type: "pdf",
    course: "Sistemas Móviles",
    subjectId: "moviles",
    title: "Arquitectura BCE y State Machines",
    lastModified: "Modificado hoy 11:45",
    syncStatus: "Sincronizado en la nube",
    tags: ["#ExamenParcial", "#UML", "#Patrones"],
  },
  {
    id: "n2",
    type: "ocr",
    course: "Base de Datos",
    subjectId: "db",
    title: "Normalización Formas Normales (1FN - BCNF)",
    lastModified: "Modificado hace 2 días",
    syncStatus: "4 imágenes transcritas",
    tags: ["#Teoria", "#SQL", "#Claves"],
  },
  {
    id: "n3",
    type: "markdown",
    course: "Redes de Computadoras",
    subjectId: "redes",
    title: "Protocolos de Enlace y Direccionamiento IPv6",
    lastModified: "Modificado 10 Nov",
    syncStatus: "Laboratorio presencial",
    tags: ["#Laboratorio", "#CiscoPacketTracer"],
  },
  {
    id: "n4",
    type: "ia",
    course: "Sistemas Operativos",
    subjectId: "all",
    title: "Guía de Síntesis: Concurrencia y Sockets",
    lastModified: "Modificado 8 Nov",
    syncStatus: "18 Tarjetas nemotécnicas",
    tags: ["#FlashcardsListas", "#Resumen"],
  },
];

export default function NotesScreen() {
  const navigation = useNavigation();
  const { usuario } = useSesion();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const filteredNotes = ALL_NOTES.filter((note) => {
    const matchesSubject =
      selectedSubject === "all" || note.subjectId === selectedSubject;
    const matchesQuery =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesQuery;
  });

  return (
    <View style={styles.rootWrapper}>
      <ScreenLayout
        scrollable={true}
        header={
          <AppHeader
            appName="Stuhbit"
            currentScreenTitle="Apuntes"
            userName={usuario?.nombre || "Mateo"}
            streakDays={5}
            onAvatarPress={() => navigation.navigate("ProfileMenu")}
          />
        }
      >
        {/* Cabecera contextual */}
        <View style={styles.titleSection}>
          <View>
            <Text style={styles.title}>Mis Apuntes</Text>
            <View style={styles.syncRow}>
              <View style={styles.syncDot} />
              <Text style={styles.syncText}>12 documentos sincronizados</Text>
            </View>
          </View>

          <View style={styles.headerIconsRow}>
            <Pressable style={styles.iconCircleBtn}>
              <Ionicons
                name="options-outline"
                size={18}
                color={palette.neutral[700]}
              />
            </Pressable>
            <Pressable
              style={styles.iconCircleBtn}
              onPress={() => navigation.navigate("SubirApunte")}
            >
              <Ionicons
                name="scan-outline"
                size={18}
                color={palette.neutral[700]}
              />
            </Pressable>
          </View>
        </View>

        {/* Buscador */}
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar por tema, curso o etiqueta..."
          style={styles.searchSpacing}
        />

        {/* Filtros horizontales por materia */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {FILTER_SUBJECTS.map((sub) => (
            <Chips
              key={sub.id}
              label={sub.label}
              selected={selectedSubject === sub.id}
              onPress={() => setSelectedSubject(sub.id)}
              icon={
                sub.color ? (
                  <View
                    style={[styles.chipDot, { backgroundColor: sub.color }]}
                  />
                ) : null
              }
            />
          ))}
        </ScrollView>

        {/* Sección: Recientes */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recientes</Text>
          <Pressable>
            <Text style={styles.sectionLink}>Ver todos (6)</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentCardsScroll}
        >
          {RECENT_NOTES.map((note) => (
            <RecentNoteCard
              key={note.id}
              type={note.type}
              course={note.course}
              title={note.title}
              meta={note.meta}
              duration={note.duration}
              onPress={() => {}}
            />
          ))}
        </ScrollView>

        {/* Sección: Todos los Apuntes */}
        <View style={[styles.sectionHeaderRow, { marginTop: spacing.lg }]}>
          <Text style={styles.sectionTitle}>Todos los Apuntes</Text>
          <View style={styles.orderDropdown}>
            <Text style={styles.orderLabel}>Orden:</Text>
            <Text style={styles.orderValue}>Recientes</Text>
            <Ionicons name="chevron-down" size={14} color={colors.primary} />
          </View>
        </View>

        <View style={styles.notesListContainer}>
          {filteredNotes.length === 0 ? (
            <Text style={styles.emptyText}>
              No se encontraron apuntes con ese filtro.
            </Text>
          ) : (
            filteredNotes.map((note) => (
              <NoteListItem
                key={note.id}
                type={note.type}
                course={note.course}
                title={note.title}
                lastModified={note.lastModified}
                syncStatus={note.syncStatus}
                tags={note.tags}
                onPress={() => {}}
                onMenuPress={() => {}}
              />
            ))
          )}
        </View>
      </ScreenLayout>

      {/* Botón Flotante (FAB) para Nuevo Apunte */}
      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={() => navigation.navigate("SubirApunte")}
        accessibilityRole="button"
        accessibilityLabel="Nuevo Apunte"
      >
        <Ionicons name="add" size={20} color={palette.white} />
        <Text style={styles.fabText}>Nuevo Apunte</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rootWrapper: {
    flex: 1,
    position: "relative",
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xs || 4,
    marginBottom: spacing.xs || 8,
  },
  title: {
    fontSize: fontSize.xl || 22,
    fontWeight: "800",
    color: colors.text,
  },
  syncRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.secondary[500],
  },
  syncText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  headerIconsRow: {
    flexDirection: "row",
    gap: 8,
  },
  iconCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    alignItems: "center",
    justifyContent: "center",
  },
  searchSpacing: {
    marginVertical: spacing.xs || 8,
  },
  chipsContainer: {
    gap: 8,
    paddingVertical: spacing.xs || 4,
    marginBottom: spacing.sm || 10,
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xs || 8,
    marginBottom: spacing.sm || 10,
  },
  sectionTitle: {
    fontSize: fontSize.sm || 15,
    fontWeight: "700",
    color: colors.text,
  },
  sectionLink: {
    fontSize: fontSize.xs || 12,
    color: colors.primary,
    fontWeight: "600",
  },
  orderDropdown: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  orderLabel: {
    fontSize: fontSize.xs || 12,
    color: colors.textSecondary,
  },
  orderValue: {
    fontSize: fontSize.xs || 12,
    color: colors.primary,
    fontWeight: "700",
  },
  recentCardsScroll: {
    gap: 12,
    paddingBottom: 4,
  },
  notesListContainer: {
    marginTop: spacing.xs || 4,
    paddingBottom: 80,
  },
  emptyText: {
    fontSize: fontSize.sm || 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 20,
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
    fontSize: fontSize.sm || 14,
  },
});
