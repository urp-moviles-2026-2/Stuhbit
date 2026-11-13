import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { FocusReceiptCard } from "../components/organisms/FocusReceiptCard";
import { selectBlockById } from "../store/scheduleSlice";
import { palette, spacing } from "../theme";

export default function FocusSuccessScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const blockId = route.params?.blockId;
  const block = useSelector(selectBlockById(blockId));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FocusReceiptCard
        subject={block?.title || "Cálculo Multivariable"}
        faculty="FACULTAD DE INGENIERÍA"
        date="Hoy, 18:45"
        duration="45m"
        streak="6 días"
        concentration="94%"
        goal={block?.notes || "Guía 4 (1 al 12)"}
        onReturnSchedule={() => navigation.navigate("CronogramaTab")}
        onShareReceipt={() => {}}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md ?? 16,
    backgroundColor: palette.white,
  },
});
