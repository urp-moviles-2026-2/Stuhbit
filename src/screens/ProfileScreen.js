import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, spacing, typography } from "../theme";
import { ScreenLayout } from "../components/templates/ScreenLayout.js";
import { AppHeader } from "../components/templates/AppHeader.js";
import { Card } from "../components/molecules/Card.js";
import { Badge } from "../components/atoms/Badge.js";
import { Button } from "../components/atoms/Button.js";
import { ProgressBar } from "../components/atoms/ProgressBar.js";
import { useNavigation } from "@react-navigation/native";

// --- IMPORTACIONES LAB-04 (Redux y Sesión) ---
import { useSelector } from "react-redux";
import {
  selectPendingBlocksCount,
  selectCompletedBlocksCount,
} from "../store/scheduleSlice.js";
import { useSesion } from "../context/SesionContext.js";

const SUBJECTS = [
  { id: "calc", name: "Cálculo II", notes: 5, color: colors.primary },
  { id: "algo", name: "Algoritmos", notes: 4, color: palette.secondary[500] },
  {
    id: "fisi",
    name: "Física General",
    notes: 3,
    color: palette.tertiary[600],
  },
];

export default function ProfileScreen({}) {
  const navigation = useNavigation();

  // --- LÓGICA LAB-04 ---
  const pendientes = useSelector(selectPendingBlocksCount);
  const completados = useSelector(selectCompletedBlocksCount);
  const { usuario, cerrarSesion } = useSesion();

  // Reemplazamos los STATS fijos por los datos dinámicos derivados de Redux
  const STATS = [
    {
      id: "pending",
      label: "Pendientes",
      value: pendientes.toString(),
      icon: "time-outline",
      color: palette.tertiary[600],
    },
    {
      id: "completed",
      label: "Completados",
      value: completados.toString(),
      icon: "checkmark-circle-outline",
      color: palette.secondary[600],
    },
    {
      id: "total",
      label: "Total Bloques",
      value: (pendientes + completados).toString(),
      icon: "document-text-outline",
      color: colors.primary,
    },
  ];

  // Actualizamos el correo dinámicamente con el usuario del Login
  const ACCOUNT_INFO = [
    {
      id: "mail",
      icon: "mail-outline",
      label: "Correo",
      value: usuario?.correo || "sofia.mendoza@correo.edu.pe",
    },
    {
      id: "code",
      icon: "id-card-outline",
      label: "Código de estudiante",
      value: "20220000",
    },
    {
      id: "sync",
      icon: "sync-outline",
      label: "Último horario importado",
      value: "Hoy, 8:00 AM",
    },
  ];

  return (
    <ScreenLayout
      header={
        <AppHeader
          currentScreenTitle="Perfil"
          streakDays={5}
          onAvatarPress={() => {}}
        />
      }
    >
      {/* Tarjeta principal del estudiante */}
      <Card variant="elevated" style={styles.profileCard}>
        <View style={styles.avatar}>
          {/* Mostramos las iniciales basadas en el nombre del usuario o 'SM' por defecto */}
          <Text style={styles.avatarText}>
            {usuario?.nombre
              ? usuario.nombre.substring(0, 2).toUpperCase()
              : "SM"}
          </Text>
        </View>
        <Text style={styles.name}>{usuario?.nombre || "Sofía Mendoza"}</Text>
        <Text style={styles.career}>Ingeniería de Software · Ciclo 6</Text>
        <View style={styles.profileBadges}>
          <Badge label="Semestre 2025-1" variant="primary" size="sm" />
          <Badge label="Racha activa" variant="success" size="sm" />
        </View>
      </Card>

      {/* Estadísticas rápidas (Ahora usan selectores de Redux) */}
      <View style={styles.statsRow}>
        {STATS.map((stat) => (
          <Card key={stat.id} variant="elevated" style={styles.statCard}>
            <Ionicons name={stat.icon} size={20} color={stat.color} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Card>
        ))}
      </View>

      {/* Progreso del semestre */}
      <Card variant="elevated" style={styles.sectionCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardLabel}>PROGRESO DEL SEMESTRE</Text>
          <Text style={styles.percentText}>50%</Text>
        </View>
        <ProgressBar
          progress={0.5}
          color={colors.primary}
          height={8}
          style={{ marginVertical: spacing.sm }}
        />
        <Text style={styles.cardNote}>
          Semana 8 de 16. Quedan 8 semanas para cerrar el ciclo.
        </Text>
      </Card>

      {/* Materias del semestre */}
      <Card variant="outlined" style={styles.sectionCard}>
        <Text style={styles.cardLabel}>MATERIAS DEL SEMESTRE</Text>
        {SUBJECTS.map((subject, index) => (
          <View
            key={subject.id}
            style={[
              styles.subjectRow,
              index < SUBJECTS.length - 1 && styles.rowDivider,
            ]}
          >
            <View
              style={[styles.subjectDot, { backgroundColor: subject.color }]}
            />
            <Text style={styles.subjectName}>{subject.name}</Text>
            <Badge
              label={`${subject.notes} apuntes`}
              variant="neutral"
              size="sm"
            />
          </View>
        ))}
      </Card>

      {/* Datos de la cuenta */}
      <Card variant="outlined" style={styles.sectionCard}>
        <Text style={styles.cardLabel}>DATOS DE LA CUENTA</Text>
        {ACCOUNT_INFO.map((info, index) => (
          <View
            key={info.id}
            style={[
              styles.infoRow,
              index < ACCOUNT_INFO.length - 1 && styles.rowDivider,
            ]}
          >
            <Ionicons name={info.icon} size={18} color={colors.primary} />
            <View style={styles.infoTextCol}>
              <Text style={styles.infoLabel}>{info.label}</Text>
              <Text style={styles.infoValue}>{info.value}</Text>
            </View>
          </View>
        ))}
      </Card>

      {/* Acciones */}
      <View style={{ gap: spacing.sm, marginBottom: spacing.xl }}>
        <Button
          title="Menú de Ajustes"
          variant="primary"
          size="md"
          icon={
            <Ionicons name="settings-outline" size={18} color={palette.white} />
          }
          onPress={() => navigation.navigate("ProfileMenu")}
        />

        {/* Botón de Cerrar Sesión requerido por el LAB-04 */}
        <Button
          title="Cerrar sesión"
          variant="outlined"
          size="md"
          icon={
            <Ionicons name="log-out-outline" size={18} color={colors.primary} />
          }
          onPress={cerrarSesion}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 2,
    marginBottom: spacing.sm,
  },
  backText: {
    ...typography.label,
    color: colors.primary,
  },
  profileCard: {
    alignItems: "center",
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    ...typography.title,
    color: colors.textInverted,
  },
  name: {
    ...typography.title,
    color: colors.text,
    marginTop: spacing.sm,
  },
  career: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  profileBadges: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: spacing.sm,
    gap: 4,
  },
  statValue: {
    ...typography.subtitle,
    color: colors.text,
  },
  statLabel: {
    ...typography.micro,
    color: colors.textSecondary,
  },
  sectionCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLabel: {
    ...typography.cardLabel,
    color: colors.textSecondary,
  },
  percentText: {
    ...typography.cardLabel,
    color: palette.secondary[700],
  },
  cardNote: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  subjectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  subjectDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  subjectName: {
    ...typography.label,
    flex: 1,
    color: colors.text,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  infoTextCol: {
    flex: 1,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  infoValue: {
    ...typography.label,
    color: colors.text,
    marginTop: 2,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  settingsBtn: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
});
