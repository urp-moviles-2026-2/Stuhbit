import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, spacing, fontSize } from "../theme";
import { ScreenLayout } from "../components/templates/ScreenLayout.js";
import { AppHeader } from "../components/templates/AppHeader.js";
import { Banner } from "../components/organisms/Banner.js";
import { SearchInput } from "../components/molecules/SearchInput.js";
import { Chips } from "../components/molecules/Chips.js";
import { Button } from "../components/atoms/Button.js";
import { StudyNoteCard } from "../components/organisms/StudyNoteCard.js";
import { SprintStudySection } from "../components/organisms/SprintStudySection.js";

const FILTER_TAGS = [
  { id: "todas", label: "Todas (14)" },
  { id: "calc", label: "Cálculo II (5)", color: colors.primary },
  { id: "algo", label: "Algoritmos (4)", color: palette.secondary[500] },
  { id: "fisi", label: "Física (3)", color: palette.tertiary[600] },
];

export default function NotesScreen({ navigation }) {
  const [selectedTag, setSelectedTag] = useState("todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [sprintItems, setSprintItems] = useState([
    {
      id: "1",
      title: "Derivadas Parciales y Regla de la Ca...",
      subject: "Cálculo II",
      recommendedTime: "25 min",
      selected: true,
    },
    {
      id: "2",
      title: "Leyes de Termodinámica y Entropía",
      subject: "Física",
      recommendedTime: "40 min",
      selected: true,
    },
    {
      id: "3",
      title: "Árboles Binarios y Grafos",
      subject: "Algoritmos",
      recommendedTime: "30 min",
      selected: false,
    },
  ]);

  const toggleSprintItem = (id) => {
    setSprintItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  return (
    <ScreenLayout
      header={
        <AppHeader
          currentScreenTitle="Apuntes"
          streakDays={5}
          onAvatarPress={() => {}}
        />
      }
    >
      {/* Banner Sincronización Inteligente */}
      <Banner
        title="Sincronización Inteligente"
        description="Tienes 3 apuntes clave para tu bloque libre de hoy a las 11:30 AM."
        actionLabel="Iniciar repaso rápido"
        onActionPress={() => navigation.navigate("Enfoque")}
        badgeText="ACTIVO"
      />

      {/* Buscador de apuntes */}
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={() => {}}
        style={styles.searchSpacing}
      />

      {/* Acciones de Digitalización */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Subir o Digitalizar</Text>
        <Text style={styles.sectionActionText}>OCR Automático</Text>
      </View>

      <Button
        title="Escanear con Cámara Inteligente"
        variant="primary"
        size="md"
        icon={<Ionicons name="scan-outline" size={20} color={palette.white} />}
        onPress={() => {}}
      />

      <View style={styles.uploadRow}>
        <Button
          title="Subir PDF"
          variant="secondary"
          size="sm"
          icon={
            <Ionicons
              name="document-text-outline"
              size={16}
              color={colors.primary}
            />
          }
          onPress={() => {}}
          style={styles.uploadHalfButton}
        />
        <Button
          title="Nota de Voz"
          variant="secondary"
          size="sm"
          icon={
            <Ionicons name="mic-outline" size={16} color={colors.primary} />
          }
          onPress={() => {}}
          style={styles.uploadHalfButton}
        />
      </View>

      {/* Filtros horizontales por materia */}
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>FILTRAR POR MATERIA</Text>
        <Text style={styles.filterCount}>14 documentos</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        {FILTER_TAGS.map((tag) => (
          <Chips
            key={tag.id}
            label={tag.label}
            selected={selectedTag === tag.id}
            onPress={() => setSelectedTag(tag.id)}
            icon={
              tag.color ? (
                <View
                  style={[styles.chipDot, { backgroundColor: tag.color }]}
                />
              ) : null
            }
          />
        ))}
      </ScrollView>

      {/* Tarjetas de apuntes principales */}
      <View style={styles.notesList}>
        <StudyNoteCard
          category="Cálculo II"
          categoryVariant="primary"
          fileInfo="PDF · 4 págs"
          title="Derivadas Parciales y Regla de la Cadena"
          description="Teoremas de Schwarz, matriz Jacobiana y ejercicios resueltos de optimización..."
          summaryBadge="Resumen AI Generado"
          lastReviewText="Último repaso: hace 2 días"
          subInfo="12 tarjetas de memoria listas"
          accentColor={colors.primary}
          onStudyPress={() => navigation.navigate("Enfoque")}
        />

        <StudyNoteCard
          category="Algoritmos"
          categoryVariant="success"
          fileInfo="Fotos de pizarra (3)"
          title="Árboles Binarios y Grafos"
          description="Recorridos DFS y BFS, balanceo AVL y complejidad temporal Big-O..."
          summaryBadge="Autoevaluación Lista (8 preguntas)"
          lastReviewText="Subido ayer · OCR completado"
          subInfo="Alta relevancia para parcial"
          accentColor={palette.secondary[600]}
          onStudyPress={() => navigation.navigate("Enfoque")}
        />

        <StudyNoteCard
          category="Física General"
          categoryVariant="warning"
          fileInfo="Examen este Viernes"
          title="Leyes de Termodinámica y Entropía"
          description="Ciclo de Carnot, primer y segundo principio, trabajo isotérmico y fórmulas de gases ideales."
          summaryBadge="Notas de Clase + Audio"
          lastReviewText="Prioridad alta · 7 conceptos críticos"
          subInfo="Falta repasar fórmulas de Carnot"
          accentColor={palette.tertiary[600]}
          onStudyPress={() => navigation.navigate("Enfoque")}
        />
      </View>

      {/* Sección Sprint de Estudio Hoy */}
      <SprintStudySection
        items={sprintItems}
        onToggleItem={toggleSprintItem}
        onStartFocus={() => navigation.navigate("Enfoque")}
        totalDurationMinutes={65}
        style={styles.sprintSpacing}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  searchSpacing: {
    marginVertical: spacing.md ?? 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs ?? 8,
  },
  sectionTitle: {
    fontSize: fontSize.md ?? 16,
    fontWeight: "700",
    color: colors.text,
  },
  sectionActionText: {
    fontSize: fontSize.xs ?? 12,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  uploadRow: {
    flexDirection: "row",
    gap: spacing.sm ?? 10,
    marginTop: spacing.xs ?? 8,
  },
  uploadHalfButton: {
    flex: 1,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.lg ?? 20,
    marginBottom: spacing.xs ?? 8,
  },
  filterTitle: {
    fontSize: fontSize.xs ?? 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: colors.textSecondary,
  },
  filterCount: {
    fontSize: fontSize.xs ?? 12,
    fontWeight: "600",
    color: colors.primary,
  },
  chipsContainer: {
    gap: 8,
    paddingVertical: 4,
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  notesList: {
    marginTop: spacing.md ?? 16,
    gap: spacing.md ?? 16,
  },
  sprintSpacing: {
    marginTop: spacing.lg ?? 24,
    marginBottom: spacing.xl ?? 32,
  },
});
