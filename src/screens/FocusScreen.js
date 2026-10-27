// import React, { useState } from "react";
// import { View, Text, StyleSheet, Pressable } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { colors, palette, spacing, fontSize, radius } from "../theme";
// import { ScreenLayout } from "../components/templates/ScreenLayout";
// import { AppHeader } from "../components/templates/AppHeader";
// import { SegmentedControl } from "../components/molecules/SegmentedControl";
// import { Button } from "../components/atoms/Button";
// import { Switch } from "../components/atoms/Switch";
// import { ProgressBar } from "../components/atoms/ProgressBar";
// import { Badge } from "../components/atoms/Badge";

// export default function FocusScreen() {
//   const [durationIndex, setDurationIndex] = useState(2);
//   const [selectedSound, setSelectedSound] = useState("rain");
//   const [dndEnabled, setDndEnabled] = useState(true);

//   return (
//     <ScreenLayout
//       header={
//         <AppHeader
//           currentScreenTitle="Enfoque"
//           streakDays={5}
//           onAvatarPress={() => {}}
//         />
//       }
//     >
//       {/* Header contextual */}
//       <View style={styles.focusHeader}>
//         <Badge label="⚡ Ventana libre detectada" variant="primary" size="sm" />
//         <Badge label="⏱ Hasta 16:30" variant="neutral" size="sm" />
//       </View>

//       <Text style={styles.mainTitle}>
//         Sesión de Estudio en tu Ventana Libre (1h 30m)
//       </Text>
//       <Text style={styles.mainSubtitle}>
//         Aprovecha el intervalo óptimo para avanzar tu preparación sin
//         interrupciones.
//       </Text>

//       {/* Selector de bloques de duración */}
//       <Text style={styles.fieldLabel}>DURACIÓN SELECCIONADA</Text>
//       <SegmentedControl
//         options={["45 min (Rápido)", "60 min (Estándar)", "90 min (Óptimo)"]}
//         selectedIndex={durationIndex}
//         onChange={setDurationIndex}
//         style={{ marginBottom: 16 }}
//       />

//       {/* Card 1: Temporizador Circular Centrado en caja blanca */}
//       <View style={styles.timerCardBox}>
//         <Badge
//           label="• Concentración máxima activa"
//           variant="success"
//           size="sm"
//           style={styles.activePill}
//         />

//         <View style={styles.circleOuter}>
//           <View style={styles.circleInner}>
//             <Text style={styles.timerCountdown}>01:15:00</Text>
//             <View style={styles.transcurredRow}>
//               <Ionicons
//                 name="time-outline"
//                 size={14}
//                 color={colors.textSecondary}
//               />
//               <Text style={styles.transcurredText}>15m transcurridos</Text>
//             </View>
//           </View>
//         </View>

//         <Badge
//           label="• Cálculo II · Derivadas Parciales"
//           variant="primary"
//           size="sm"
//           style={{ marginTop: 14 }}
//         />
//         <Text style={styles.timerNote}>
//           Bloque de práctica guiada y problemas pares
//         </Text>
//       </View>

//       {/* Card 2: Ver Apuntes vinculados */}
//       <View style={styles.linkedNotesCardBox}>
//         <View style={styles.linkedLeft}>
//           <View style={styles.iconDocBox}>
//             <Ionicons
//               name="document-text-outline"
//               size={20}
//               color={colors.primary}
//             />
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.linkedTitle}>Ver Apuntes vinculados</Text>
//             <Text numberOfLines={1} style={styles.linkedSub}>
//               PDF 4 págs · Teorema de Schwarz & Regla...
//             </Text>
//           </View>
//         </View>
//         <Ionicons name="eye-outline" size={20} color={colors.textSecondary} />
//       </View>

//       {/* Fondo sonoro ambiental */}
//       <Text style={[styles.fieldLabel, { marginTop: 10 }]}>FONDO SONORO</Text>
//       <View style={styles.soundGroupRow}>
//         {[
//           { id: "silent", label: "Silencio", icon: "volume-mute-outline" },
//           { id: "rain", label: "Lluvia suave", icon: "rainy-outline" },
//           { id: "noise", label: "Ruido blanco", icon: "radio-outline" },
//         ].map((snd) => {
//           const isSelected = selectedSound === snd.id;
//           return (
//             <Pressable
//               key={snd.id}
//               onPress={() => setSelectedSound(snd.id)}
//               style={[styles.soundTile, isSelected && styles.soundTileActive]}
//             >
//               <Ionicons
//                 name={snd.icon}
//                 size={22}
//                 color={isSelected ? "#FFFFFF" : colors.text}
//               />
//               <Text
//                 style={[
//                   styles.soundTileLabel,
//                   isSelected && styles.soundTileLabelActive,
//                 ]}
//               >
//                 {snd.label}
//               </Text>
//             </Pressable>
//           );
//         })}
//       </View>

//       {/* Card 3: Modo no molestar (Row con Switch en caja blanca) */}
//       <View style={styles.switchRowBox}>
//         <View style={styles.switchTextCol}>
//           <Text style={styles.switchTitle}>Modo no molestar</Text>
//           <Text style={styles.switchSub}>
//             Bloquear notificaciones y alertas
//           </Text>
//         </View>
//         <Switch value={dndEnabled} onValueChange={setDndEnabled} />
//       </View>

//       {/* Botonera de control (Pausar y Completar) */}
//       <View style={styles.controlsRow}>
//         <Button
//           title="Pausar"
//           variant="outline"
//           size="md"
//           icon={
//             <Ionicons
//               name="pause-circle-outline"
//               size={20}
//               color={colors.primary}
//             />
//           }
//           onPress={() => {}}
//           style={{ flex: 1 }}
//         />
//         <Button
//           title="Completar"
//           variant="success"
//           size="md"
//           icon={
//             <Ionicons
//               name="checkmark-circle-outline"
//               size={20}
//               color="#FFFFFF"
//             />
//           }
//           onPress={() => {}}
//           style={{ flex: 1 }}
//         />
//       </View>

//       {/* Card 4: Meta de Estudio de hoy con recuadro blanco y barra */}
//       <View style={styles.metaCardBox}>
//         <View style={styles.metaCardTop}>
//           <Text style={styles.metaTitle}>Meta de estudio de hoy</Text>
//           <Badge label="+120 Pts" variant="success" size="sm" />
//         </View>
//         <View style={styles.metaProgressLabels}>
//           <Text style={styles.metaSub}>Progreso actual: 80%</Text>
//           <Text style={styles.metaSub}>Llegarás al 100%</Text>
//         </View>
//         <ProgressBar
//           progress={0.8}
//           color={palette.secondary[600]}
//           height={7}
//           style={{ marginVertical: 8 }}
//         />
//         <Text style={styles.metaTip}>
//           Al completar esta sesión alcanzarás el{" "}
//           <Text style={styles.boldText}>100% de tu meta de estudio de hoy</Text>{" "}
//           y extenderás tu racha a{" "}
//           <Text style={styles.boldText}>6 días consecutivos</Text>.
//         </Text>
//       </View>
//     </ScreenLayout>
//   );
// }

// const styles = StyleSheet.create({
//   focusHeader: {
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 8,
//   },
//   mainTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: colors.text,
//     lineHeight: 24,
//   },
//   mainSubtitle: {
//     fontSize: 13,
//     color: colors.textSecondary,
//     marginTop: 4,
//     marginBottom: 16,
//     lineHeight: 18,
//   },
//   fieldLabel: {
//     fontSize: 11,
//     fontWeight: "700",
//     letterSpacing: 0.6,
//     color: colors.textSecondary,
//     marginBottom: 6,
//   },
//   timerCardBox: {
//     backgroundColor: palette.white,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: palette.neutral[200],
//     alignItems: "center",
//     padding: 20,
//     marginBottom: 16,
//     shadowColor: palette.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//     elevation: 2,
//     width: "100%",
//   },
//   activePill: {
//     marginBottom: 14,
//   },
//   circleOuter: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     borderWidth: 10,
//     borderColor: palette.primary,
//     borderTopColor: colors.primary,
//     borderRightColor: colors.primary,
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//   },
//   circleInner: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   timerCountdown: {
//     fontSize: 32,
//     fontWeight: "800",
//     color: colors.text,
//     letterSpacing: -1,
//   },
//   transcurredRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     marginTop: 4,
//   },
//   transcurredText: {
//     fontSize: 12,
//     color: colors.textSecondary,
//   },
//   timerNote: {
//     fontSize: 12,
//     color: colors.textSecondary,
//     marginTop: 4,
//     textAlign: "center",
//   },
//   linkedNotesCardBox: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: palette.white,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: palette.neutral[200],
//     padding: 12,
//     marginBottom: 16,
//     shadowColor: palette.black,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.04,
//     shadowRadius: 3,
//     elevation: 1,
//   },
//   linkedLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     flex: 1,
//   },
//   iconDocBox: {
//     width: 36,
//     height: 36,
//     borderRadius: 8,
//     backgroundColor: palette.primary[50],
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   linkedTitle: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: colors.text,
//   },
//   linkedSub: {
//     fontSize: 11,
//     color: colors.textSecondary,
//     marginTop: 2,
//   },
//   soundGroupRow: {
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 16,
//   },
//   soundTile: {
//     flex: 1,
//     paddingVertical: 14,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: palette.neutral[200],
//     backgroundColor: palette.white,
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 6,
//   },
//   soundTileActive: {
//     backgroundColor: colors.primary,
//     borderColor: colors.primary,
//   },
//   soundTileLabel: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: colors.text,
//   },
//   soundTileLabelActive: {
//     color: palette.white,
//   },
//   switchRowBox: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: palette.white,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: palette.neutral[200],
//     padding: 14,
//     marginBottom: 16,
//   },
//   switchTextCol: {
//     flex: 1,
//   },
//   switchTitle: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: colors.text,
//   },
//   switchSub: {
//     fontSize: 11,
//     color: colors.textSecondary,
//     marginTop: 2,
//   },
//   controlsRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 16,
//   },
//   metaCardBox: {
//     backgroundColor: palette.white,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: palette.neutral[200],
//     padding: 16,
//     marginBottom: 32,
//     shadowColor: palette.black,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   metaCardTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   metaTitle: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: colors.text,
//   },
//   metaProgressLabels: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   metaSub: {
//     fontSize: 11,
//     color: colors.textSecondary,
//   },
//   metaTip: {
//     fontSize: 12,
//     color: colors.textSecondary,
//     lineHeight: 18,
//   },
//   boldText: {
//     fontWeight: "700",
//     color: colors.text,
//   },
// });

import React from "react";
import Placeholder from "./Placeholder";

export default function FocusScreen() {
  return (
    <Placeholder
      title="Modo Enfoque"
      description="Temporizador estilo Pomodoro con selector de intervalos y fondos sonoros."
      links={[{ label: "Ir a Cronograma", to: "CronogramaTab" }]}
    />
  );
}
