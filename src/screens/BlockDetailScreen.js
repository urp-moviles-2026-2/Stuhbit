import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, Pressable, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { selectBlockById, updateBlock, deleteBlock } from "../store/scheduleSlice.js";

export default function BlockDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params?.id ?? "Sin ID";

  // Buscar el bloque real en Redux
  const block = useSelector(selectBlockById(id));
  const dispatch = useDispatch();

  // Mantenemos tu Requisito del LAB-03 intacto
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            console.log([Header Action] Compartiendo datos del bloque #${id});
            Alert.alert(
              "Acción de Header",
              Se ha compartido el reporte del bloque #${id},
            );
          }}
          hitSlop={12}
          style={{ marginRight: 8 }}
        >
          <Ionicons name="share-outline" size={24} color="#0F172A" />
        </Pressable>
      ),
    });
  }, [navigation, id]);

  // Si el bloque fue eliminado, mostramos un mensaje en lugar de crashear
  if (!block) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Este bloque ya no existe o fue eliminado.</Text>
      </View>
    );
  }

  // Renderizamos los datos reales de Redux en lugar del Placeholder
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{block.title}</Text>
      <Text style={styles.text}>Curso: {block.course}</Text>
      <Text style={styles.text}>Horario: {block.startTime} - {block.endTime} ({block.day})</Text>
      <Text style={styles.text}>Estado: <Text style={{ fontWeight: 'bold' }}>{block.status}</Text></Text>

      {block.notes ? <Text style={styles.notes}>Notas: {block.notes}</Text> : null}

      <View style={styles.actions}>
        <Button 
          title="Marcar como Completado" 
          color="#10B981" // Color verde
          onPress={() => dispatch(updateBlock({ id, status: "completado" }))} 
        />
        <View style={{ height: 16 }} />
        <Button
          title="Eliminar Bloque"
          color="#EF4444" // Color rojo
          onPress={() => {
            dispatch(deleteBlock(id));
            navigation.goBack(); // Regresa al cronograma tras eliminar
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#0F172A" },
  text: { fontSize: 16, marginBottom: 8, color: "#333" },
  notes: { marginTop: 12, padding: 12, backgroundColor: "#F1F5F9", fontStyle: "italic", color: "#475569", borderRadius: 8 },
  actions: { marginTop: 32 },
  emptyText: { fontSize: 16, color: "#64748B", textAlign: "center", marginTop: 40 }
});