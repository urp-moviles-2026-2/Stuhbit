import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, palette, radius, fontSize } from "../../theme";
import { Button } from "../atoms/Button";

export const FocusReceiptCard = ({
  subject = "Cálculo Multivariable",
  faculty = "FACULTAD DE INGENIERÍA",
  date = "Hoy, 18:45",
  duration = "1h 15m",
  streak = "6 días",
  concentration = "94%",
  goal = "Guía 4 (1 al 12)",
  receiptId = "ID: #EST-94021 · STUHBIT-IA",
  onReturnSchedule,
  onShareReceipt,
}) => {
  return (
    <View style={styles.container}>
      {/* Icono de Check con Sello Verde */}
      <View style={styles.sealCircle}>
        <Ionicons name="checkmark-done" size={28} color={palette.white} />
      </View>

      <View style={styles.pointsBadge}>
        <Ionicons name="flash" size={12} color={palette.secondary[800]} />
        <Text style={styles.pointsBadgeText}>
          +120 PTS GANADOS · RACHA ACTIVA
        </Text>
      </View>

      <Text style={styles.title}>¡Sesión Completada!</Text>
      <Text style={styles.subtitle}>
        Has terminado con éxito tu bloque de {subject}.
      </Text>

      {/* Recibo Ticket */}
      <View style={styles.ticket}>
        <View style={styles.ticketHeader}>
          <View style={styles.subjectBox}>
            <View style={styles.sigmaIcon}>
              <Text style={styles.sigmaText}>Σ</Text>
            </View>
            <View>
              <Text style={styles.facultyText}>{faculty}</Text>
              <Text style={styles.subjectTitle}>{subject}</Text>
            </View>
          </View>
          <View style={styles.dateCol}>
            <Text style={styles.dateLabel}>FECHA</Text>
            <Text style={styles.dateValue}>{date}</Text>
          </View>
        </View>

        {/* Grid de 4 Métricas */}
        <View style={styles.metricGrid}>
          <View style={styles.gridCell}>
            <Text style={styles.cellLabel}>TIEMPO ENFOCADO</Text>
            <Text style={styles.cellValue}>{duration}</Text>
            <Text style={styles.cellSub}>100% cumplido</Text>
          </View>
          <View style={styles.gridCell}>
            <Text style={styles.cellLabel}>RACHA VITAL</Text>
            <Text style={styles.cellValue}>{streak}</Text>
            <Text style={styles.cellSub}>¡Imparable! 🔥</Text>
          </View>
          <View style={styles.gridCell}>
            <Text style={styles.cellLabel}>CONCENTRACIÓN</Text>
            <Text style={styles.cellValue}>{concentration}</Text>
            <Text style={styles.cellSub}>ÓPTIMO</Text>
          </View>
          <View style={styles.gridCell}>
            <Text style={styles.cellLabel}>META DE SESIÓN</Text>
            <Text numberOfLines={1} style={styles.cellValue}>
              {goal}
            </Text>
            <Text style={styles.cellSub}>12 de 12 ejercicios</Text>
          </View>
        </View>

        {/* Nota Clave */}
        <View style={styles.noteBox}>
          <Ionicons name="newspaper-outline" size={14} color={colors.primary} />
          <Text style={styles.noteText}>
            Apunte clave: Dominada regla de la cadena para funciones compuestas.
          </Text>
        </View>

        {/* Línea perforada */}
        <View style={styles.dashLine} />

        {/* Sello de Seguridad y Código de barras sintético */}
        <View style={styles.stampRow}>
          <View>
            <Text style={styles.receiptId}>{receiptId}</Text>
            <Text style={styles.receiptSub}>
              Criptográficamente sellado en perfil académico
            </Text>
          </View>
          <Ionicons name="ribbon" size={24} color={palette.secondary[600]} />
        </View>

        {/* Simulación de código de barras */}
        <View style={styles.barcodeRow}>
          {Array.from({ length: 24 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.bar,
                { width: i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1 },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Botones de acción */}
      <Button
        title="Volver al Cronograma"
        onPress={onReturnSchedule}
        variant="primary"
        size="lg"
        icon={
          <Ionicons name="calendar-outline" size={18} color={palette.white} />
        }
        style={{ width: "100%", marginTop: 16 }}
      />
      <Button
        title="Compartir Comprobante"
        onPress={onShareReceipt}
        variant="outline"
        size="md"
        icon={
          <Ionicons name="share-outline" size={18} color={colors.primary} />
        }
        style={{ width: "100%", marginTop: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 24,
  },
  sealCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: palette.secondary[600],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: palette.secondary[100],
    marginBottom: 8,
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.secondary[100],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full || 9999,
    gap: 4,
    marginBottom: 8,
  },
  pointsBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: palette.secondary[800],
    letterSpacing: 0.4,
  },
  title: {
    fontSize: fontSize.xl || 22,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.xs || 12,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: 16,
  },
  ticket: {
    width: "100%",
    backgroundColor: palette.white,
    borderRadius: radius.xl || 16,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    padding: 16,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  subjectBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sigmaIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: palette.primary[50],
    alignItems: "center",
    justifyContent: "center",
  },
  sigmaText: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 14,
  },
  facultyText: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.5,
  },
  subjectTitle: {
    fontSize: fontSize.xs || 13,
    fontWeight: "800",
    color: colors.text,
  },
  dateCol: {
    alignItems: "flex-end",
  },
  dateLabel: {
    fontSize: 9,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  dateValue: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text,
  },
  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  gridCell: {
    width: "48%",
    backgroundColor: palette.neutral[50],
    padding: 10,
    borderRadius: radius.md || 10,
  },
  cellLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.textSecondary,
  },
  cellValue: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
    marginTop: 2,
  },
  cellSub: {
    fontSize: 10,
    color: palette.secondary[700],
    fontWeight: "600",
    marginTop: 2,
  },
  noteBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: palette.primary[50],
    padding: 10,
    borderRadius: radius.md || 10,
    marginBottom: 12,
  },
  noteText: {
    fontSize: 11,
    color: colors.primaryDark,
    flex: 1,
  },
  dashLine: {
    height: 1,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    borderStyle: "dashed",
    marginVertical: 10,
  },
  stampRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  receiptId: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.text,
  },
  receiptSub: {
    fontSize: 9,
    color: colors.textSecondary,
  },
  barcodeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    height: 24,
  },
  bar: {
    height: "100%",
    backgroundColor: palette.neutral[400],
  },
});
