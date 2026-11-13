import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { colors, palette, spacing, fontSize, radius } from "../theme";
import { ScreenLayout } from "../components/templates/ScreenLayout";
import { AppHeader } from "../components/templates/AppHeader";
import { Button } from "../components/atoms/Button";
import { Switch } from "../components/atoms/Switch";
import { FocusTimerWidget } from "../components/organisms/FocusTimerWidget";
import { FocusSessionModal } from "../components/organisms/FocusSessionModal";
import { FocusIdleView } from "../components/organisms/FocusIdleView";
import {
  selectAllBlocks,
  selectBlockById,
  updateBlock,
} from "../store/scheduleSlice";
import { useSesion } from "../context/SesionContext";

export default function FocusScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { usuario } = useSesion();

  // Bloque recibido por navegación (opcional)
  const blockId = route.params?.id;
  const currentBlock = useSelector(selectBlockById(blockId));
  const allBlocks = useSelector(selectAllBlocks);
  const nextPendingBlock = allBlocks.find((b) => b.status === "pendiente");

  // Estado: ¿Hay una sesión de estudio corriendo?
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionDetails, setSessionDetails] = useState({
    title: "Cálculo II · Derivadas Parciales",
    notes: "Guía de Ejercicios 4 (Ej. 1 al 12)",
    durationMinutes: 25,
  });

  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSound, setSelectedSound] = useState("rain");
  const [dndActive, setDndActive] = useState(true);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  // Si llega un blockId desde Cronograma/TimelineItem, arranca automáticamente esa sesión
  useEffect(() => {
    if (currentBlock) {
      setSessionDetails({
        title: `${currentBlock.course} · ${currentBlock.title}`,
        notes: currentBlock.notes || "Preparación y ejercicios",
        durationMinutes: 45,
      });
      setSeconds(45 * 60);
      setIsSessionActive(true);
      setIsRunning(true);
    }
  }, [blockId, currentBlock]);

  // Intervalo del cronómetro
  useEffect(() => {
    let interval = null;
    if (isSessionActive && isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, isRunning, seconds]);

  // Iniciar desde presets de la vista inactiva
  const handleStartPreset = (minutes, label) => {
    setSessionDetails({
      title: label,
      notes: "Sesión libre enfocada",
      durationMinutes: minutes,
    });
    setSeconds(minutes * 60);
    setIsSessionActive(true);
    setIsRunning(true);
  };

  // Iniciar desde la sugerencia del próximo bloque del cronograma
  const handleStartNextBlock = (block) => {
    navigation.setParams({ id: block.id });
  };

  // Detener y confirmar finalización
  const handleCompletePress = () => {
    setIsRunning(false);
    setConfirmModalVisible(true);
  };

  const handleConfirmCompletion = () => {
    setConfirmModalVisible(false);
    setIsSessionActive(false);
    setIsRunning(false);

    if (blockId) {
      dispatch(updateBlock({ id: blockId, status: "completado" }));
    }

    // Navega a la pantalla de logro en EnfoqueStack
    navigation.navigate("FocusSuccess", { blockId });
  };

  return (
    <ScreenLayout
      scrollable={true}
      header={
        <AppHeader
          appName="Stuhbit"
          currentScreenTitle="Enfoque"
          userName={usuario?.nombre || "Mateo"}
          streakDays={5}
          onAvatarPress={() => navigation.navigate("ProfileMenu")}
        />
      }
    >
      {!isSessionActive ? (
        /* VISTA POR DEFECTO: Espacio Zen en Reposo */
        <FocusIdleView
          nextBlock={nextPendingBlock}
          onStartPreset={handleStartPreset}
          onSelectNextBlock={handleStartNextBlock}
          onExplorePending={() => navigation.navigate("CronogramaTab")}
        />
      ) : (
        /* VISTA ACTIVA: Temporizador y Controles en Marcha */
        <View style={styles.activeContainer}>
          <FocusTimerWidget
            secondsLeft={seconds}
            blockTag={sessionDetails.title}
            blockStep="En curso · Bloque activo"
            objective={sessionDetails.notes}
          />

          {/* Atmósfera & Distracciones */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>ATMÓSFERA & DISTRACCIONES</Text>
            <View style={styles.activeIndicatorRow}>
              <Ionicons
                name="headset-outline"
                size={13}
                color={palette.secondary[600]}
              />
              <Text style={styles.activeLabel}>Activo</Text>
            </View>
          </View>

          <View style={styles.soundRow}>
            <Pressable
              onPress={() => setSelectedSound("rain")}
              style={[
                styles.soundTile,
                selectedSound === "rain" && styles.soundTileActive,
              ]}
            >
              <Ionicons
                name="water-outline"
                size={16}
                color={selectedSound === "rain" ? palette.white : colors.text}
              />
              <Text
                style={[
                  styles.soundTileText,
                  selectedSound === "rain" && styles.soundTileTextActive,
                ]}
              >
                Lluvia suave
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedSound("white_noise")}
              style={[
                styles.soundTile,
                selectedSound === "white_noise" && styles.soundTileActive,
              ]}
            >
              <Ionicons
                name="radio-outline"
                size={16}
                color={
                  selectedSound === "white_noise" ? palette.white : colors.text
                }
              />
              <Text
                style={[
                  styles.soundTileText,
                  selectedSound === "white_noise" && styles.soundTileTextActive,
                ]}
              >
                Ruido blanco
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedSound("mute")}
              style={[
                styles.muteTile,
                selectedSound === "mute" && styles.soundTileActive,
              ]}
            >
              <Ionicons
                name="volume-mute-outline"
                size={16}
                color={
                  selectedSound === "mute"
                    ? palette.white
                    : palette.neutral[600]
                }
              />
            </Pressable>
          </View>

          {/* Modo No Molestar */}
          <View style={styles.dndCard}>
            <View style={styles.dndIconCircle}>
              <Ionicons
                name="remove-circle-outline"
                size={18}
                color={palette.primary[700]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.dndTitle}>Modo No Molestar</Text>
              <Text style={styles.dndSub}>Notificaciones bloqueadas</Text>
            </View>
            <Switch value={dndActive} onValueChange={setDndActive} />
          </View>

          {/* Botones de Control */}
          <View style={styles.controlsRow}>
            <Button
              title={isRunning ? "Pausar" : "Reanudar"}
              onPress={() => setIsRunning(!isRunning)}
              variant="outline"
              size="lg"
              icon={
                <Ionicons
                  name={isRunning ? "pause-outline" : "play-outline"}
                  size={20}
                  color={colors.primary}
                />
              }
              style={{ flex: 1 }}
            />
            <Button
              title="Completar"
              onPress={handleCompletePress}
              variant="primary"
              size="lg"
              icon={
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={palette.white}
                />
              }
              style={{ flex: 1 }}
            />
          </View>
        </View>
      )}

      {/* Modal de confirmación al terminar */}
      <FocusSessionModal
        visible={confirmModalVisible}
        onClose={() => {
          setConfirmModalVisible(false);
          setIsRunning(true);
        }}
        onConfirm={handleConfirmCompletion}
        subject={sessionDetails.title}
        durationMinutes={sessionDetails.durationMinutes}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  activeContainer: {
    width: "100%",
    paddingBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.md || 16,
    marginBottom: spacing.xs || 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  activeIndicatorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  activeLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: palette.secondary[600],
  },
  soundRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  soundTile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.white,
    borderRadius: radius.md || 12,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    paddingVertical: 12,
    gap: 6,
  },
  soundTileActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  soundTileText: {
    fontSize: fontSize.xs || 12,
    fontWeight: "600",
    color: colors.text,
  },
  soundTileTextActive: {
    color: palette.white,
  },
  muteTile: {
    width: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.white,
    borderRadius: radius.md || 12,
    borderWidth: 1,
    borderColor: palette.neutral[200],
  },
  dndCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.white,
    borderRadius: radius.lg || 14,
    borderWidth: 1,
    borderColor: palette.neutral[200],
    padding: 14,
    gap: 12,
    marginBottom: 24,
  },
  dndIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.primary[50],
    alignItems: "center",
    justifyContent: "center",
  },
  dndTitle: {
    fontSize: fontSize.xs || 13,
    fontWeight: "700",
    color: colors.text,
  },
  dndSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  controlsRow: {
    flexDirection: "row",
    gap: 12,
  },
});
