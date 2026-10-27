// import React, { useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { colors, palette, spacing, fontSize, radius } from "../theme";
// import { ScreenLayout } from "../components/templates/ScreenLayout";
// import { AppHeader } from "../components/templates/AppHeader";
// import { SegmentedControl } from "../components/molecules/SegmentedControl";
// import { Banner } from "../components/organisms/Banner";
// import { Button } from "../components/atoms/Button";
// import { Badge } from "../components/atoms/Badge";

// const WEEK_DAYS = [
//   { day: "L", date: "14", dots: ["#10B981"] },
//   { day: "M", date: "15", dots: ["#4F46E5", "#F59E0B"] },
//   {
//     day: "X",
//     date: "16",
//     dots: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
//     active: true,
//   },
//   { day: "J", date: "17", dots: ["#10B981"] },
//   { day: "V", date: "18", dots: ["#EF4444"] },
//   { day: "S", date: "19", dots: ["#10B981"] },
//   { day: "D", date: "20", dots: [] },
// ];

// export default function CalendarScreen({ navigation }) {
//   const [calendarView, setCalendarView] = useState(0);

//   return (
//     <ScreenLayout
//       header={
//         <AppHeader
//           currentScreenTitle="Calendario"
//           streakDays={5}
//           onAvatarPress={() => {}}
//         />
//       }
//     >
//       {/* Selector superior de semestre y botón importar */}
//       <View style={styles.topSelectorRow}>
//         <View>
//           <Text style={styles.semesterLabel}>SEMESTRE 2025-1</Text>
//           <View style={styles.monthDropdown}>
//             <Text style={styles.monthTitle}>Octubre 2025</Text>
//             <Ionicons name="chevron-down" size={18} color={colors.primary} />
//           </View>
//         </View>

//         <Button
//           title="Importar"
//           variant="primary"
//           size="sm"
//           icon={
//             <Ionicons name="cloud-upload-outline" size={16} color="#FFFFFF" />
//           }
//           onPress={() => {}}
//           fullWidth={false}
//           style={styles.importBtn}
//         />
//       </View>

//       {/* Segmented Control */}
//       <SegmentedControl
//         options={["Semana", "Mes", "Oficial"]}
//         selectedIndex={calendarView}
//         onChange={setCalendarView}
//         style={styles.segmentedSpacing}
//       />

//       {/* Card 1: Tira semanal de días */}
//       <View style={styles.whiteCard}>
//         <View style={styles.weekStripHeader}>
//           <Text style={styles.weekStripText}>Semana 8 • 14 al 20 Octubre</Text>
//           <Text style={styles.todayHighlight}>Hoy: Mié 16</Text>
//         </View>
//         <View style={styles.daysRow}>
//           {WEEK_DAYS.map((item, idx) => (
//             <View
//               key={idx}
//               style={[styles.dayCell, item.active && styles.dayCellActive]}
//             >
//               <Text
//                 style={[styles.dayLetter, item.active && styles.dayTextActive]}
//               >
//                 {item.day}
//               </Text>
//               <Text
//                 style={[styles.dayDate, item.active && styles.dayTextActive]}
//               >
//                 {item.date}
//               </Text>
//               <View style={styles.dotsContainer}>
//                 {item.dots.map((dotColor, dIdx) => (
//                   <View
//                     key={dIdx}
//                     style={[styles.dot, { backgroundColor: dotColor }]}
//                   />
//                 ))}
//               </View>
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* Card 2: Balance Semanal de horas */}
//       <View style={[styles.whiteCard, { marginVertical: 12 }]}>
//         <View style={styles.balanceHeader}>
//           <Text style={styles.balanceTitle}>BALANCE SEMANAL</Text>
//           <Text style={styles.balanceStatus}>📈 Óptimo</Text>
//         </View>

//         <View style={styles.multiProgressBar}>
//           <View
//             style={[
//               styles.progressSection,
//               { flex: 18, backgroundColor: colors.primary },
//             ]}
//           />
//           <View
//             style={[
//               styles.progressSection,
//               { flex: 8, backgroundColor: palette.secondary[500] },
//             ]}
//           />
//           <View
//             style={[
//               styles.progressSection,
//               { flex: 6, backgroundColor: palette.tertiary[700] },
//             ]}
//           />
//         </View>

//         <View style={styles.balanceLegendsRow}>
//           <View style={styles.legendItem}>
//             <View
//               style={[styles.legendDot, { backgroundColor: colors.primary }]}
//             />
//             <Text style={styles.legendText}>
//               Clases <Text style={styles.boldText}>18 hrs</Text>
//             </Text>
//           </View>
//           <View style={styles.legendItem}>
//             <View
//               style={[
//                 styles.legendDot,
//                 { backgroundColor: palette.secondary[500] },
//               ]}
//             />
//             <Text style={styles.legendText}>
//               Libres <Text style={styles.boldText}>8 hrs</Text>
//             </Text>
//           </View>
//           <View style={styles.legendItem}>
//             <View
//               style={[
//                 styles.legendDot,
//                 { backgroundColor: palette.tertiary[700] },
//               ]}
//             />
//             <Text style={styles.legendText}>
//               Planificadas <Text style={styles.boldText}>6 hrs</Text>
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* Banner Patrón Inteligente */}
//       <Banner
//         title="Patrón Inteligente"
//         description="Los martes y jueves entre 2:00 PM y 4:00 PM tienes tu mayor ventana de productividad y retención."
//         badgeText="IA Estudy"
//         style={{ marginBottom: 16 }}
//       />

//       {/* Encabezado del día Miércoles 16 */}
//       <View style={styles.dayAgendaHeader}>
//         <Text style={styles.agendaTitle}>Miércoles, 16 de Octubre</Text>
//         <Badge label="5 eventos" variant="primary" size="sm" />
//       </View>

//       <View style={styles.cardBox}>
//         <View style={styles.eventTop}>
//           <Badge label="Clase Regular" variant="primary" size="sm" />
//           <Text style={styles.durationText}>⏱ 2h</Text>
//         </View>
//         <Text style={styles.eventTitle}>Cálculo Multivariable</Text>
//         <Text style={styles.eventSubtitle}>
//           👤 Dr. Ricardo Mendez · 🏛 Edificio B · Aula 304
//         </Text>
//       </View>

//       {/* 7. CARD: Ventana Libre Detectada */}
//       <View style={[styles.cardBox, styles.detectedCard]}>
//         <View style={styles.eventTop}>
//           <Badge label="Ventana Libre Detectada" variant="success" size="sm" />
//           <Text style={styles.durationText}>1h 30m</Text>
//         </View>
//         <Text style={styles.eventTitle}>Repaso para Parcial de Cálculo</Text>
//         <Text style={styles.eventSubtitle}>
//           Aprovecha este hueco libre antes de tu siguiente materia para resolver
//           4 ejercicios clave.
//         </Text>
//         <Button
//           title="Iniciar Pomodoro"
//           variant="success"
//           size="sm"
//           icon={<Ionicons name="play" size={14} color="#FFFFFF" />}
//           onPress={() => navigation.navigate("Enfoque")}
//           fullWidth={false}
//           style={styles.pomodoroBtn}
//         />
//       </View>

//       <Button
//         title="Agendar Bloque de Estudio Personalizado"
//         variant="primary"
//         size="md"
//         icon={<Ionicons name="alarm-outline" size={18} color="#FFFFFF" />}
//         onPress={() => {}}
//         style={{ marginVertical: 20 }}
//       />
//     </ScreenLayout>
//   );
// }

// const styles = StyleSheet.create({
//   topSelectorRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   semesterLabel: {
//     fontSize: 10,
//     fontWeight: "700",
//     color: colors.textSecondary,
//   },
//   monthDropdown: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   monthTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: colors.text,
//   },
//   importBtn: {
//     paddingHorizontal: 14,
//   },
//   segmentedSpacing: {
//     marginVertical: 12,
//   },
//   whiteCard: {
//     backgroundColor: palette.white,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: palette.neutral[200],
//     padding: 14,
//     marginBottom: 10,
//     shadowColor: palette.black,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//     width: "100%",
//   },
//   cardBox: {
//     backgroundColor: palette.white,
//     borderRadius: 16,
//     borderWidth: 1.5,
//     borderColor: palette.primary[100],
//     borderStyle: "solid",
//     padding: 16,
//     marginBottom: 14,
//     width: "100%",
//     shadowColor: palette.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   detectedCard: {
//     backgroundColor: palette.success,
//     borderColor: colors.success,
//     borderWidth: 1.5,
//     borderStyle: "solid",
//   },
//   weekStripHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   weekStripText: {
//     fontSize: 11,
//     color: colors.textSecondary,
//   },
//   todayHighlight: {
//     fontSize: 11,
//     fontWeight: "700",
//     color: colors.primary,
//   },
//   daysRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   dayCell: {
//     width: 42,
//     paddingVertical: 8,
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   dayCellActive: {
//     backgroundColor: colors.primary,
//   },
//   dayLetter: {
//     fontSize: 11,
//     color: colors.textSecondary,
//     fontWeight: "600",
//   },
//   dayDate: {
//     fontSize: 14,
//     fontWeight: "800",
//     color: colors.text,
//     marginTop: 2,
//   },
//   dayTextActive: {
//     color: colors.white,
//   },
//   dotsContainer: {
//     flexDirection: "row",
//     gap: 2,
//     marginTop: 4,
//     height: 4,
//   },
//   dot: {
//     width: 4,
//     height: 4,
//     borderRadius: 2,
//   },
//   balanceHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   balanceTitle: {
//     fontSize: 11,
//     fontWeight: "700",
//     color: colors.textSecondary,
//   },
//   balanceStatus: {
//     fontSize: 11,
//     fontWeight: "700",
//     color: palette.secondary[700],
//   },
//   multiProgressBar: {
//     flexDirection: "row",
//     height: 8,
//     borderRadius: 4,
//     overflow: "hidden",
//     backgroundColor: colors.neutral[200],
//   },
//   progressSection: {
//     height: "100%",
//   },
//   balanceLegendsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   legendItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   legendDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//   },
//   legendText: {
//     fontSize: 11,
//     color: colors.textSecondary,
//   },
//   boldText: {
//     fontWeight: "700",
//     color: colors.text,
//   },
//   dayAgendaHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 12,
//   },
//   agendaTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: colors.text,
//   },
//   eventTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   durationText: {
//     fontSize: 11,
//     color: colors.textSecondary,
//     fontWeight: "600",
//   },
//   eventTitle: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: colors.text,
//   },
//   eventSubtitle: {
//     fontSize: 12,
//     color: colors.textSecondary,
//     marginTop: 4,
//     lineHeight: 16,
//   },
//   pomodoroBtn: {
//     alignSelf: "flex-start",
//     marginTop: 10,
//   },
// });

//codigo de prueba para el paso 4 del lab3
import React from "react";
import Placeholder from "./Placeholder";

export default function CalendarScreen() {
  return (
    <Placeholder
      title="Calendario Semanal"
      description="Vista semanal y mensual con balance de horas y actividades académicas."
      links={[
        { label: "Programar Nuevo Bloque (Modal)", to: "AgendarBloque" },
        {
          label: "Ver Bloque #101 en Detalle",
          to: "DetalleBloque",
          params: { id: 101 },
        },
      ]}
    />
  );
}
