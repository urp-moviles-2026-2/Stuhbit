import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { addBlock } from "../store/scheduleSlice.js";
import {
  blockSchema,
  blockVacio,
  TIPOS_BLOQUE,
  DIAS_SEMANA,
} from "../schemas/blockSchema.js";
import FormField from "../components/FormField.js";
import { colors, spacing, typography, radius } from "../theme.js";

export default function ScheduleBlockModal({ navigation }) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(blockSchema),
    defaultValues: blockVacio,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = (datos) => {
    dispatch(scheduleSlice(datos)); // datos ya viene validado y con trim()
    reset();
    navigation.goBack();
  };

  const handleSave = () => {
    // Validación básica: no guardar si el título está vacío
    if (!title.trim()) return;

    // Despachar la acción al store
    dispatch(
      addBlock({
        title: title.trim(),
        course: course.trim(),
      }),
    );

    // Cumple con el requisito exacto del LAB-04: volver con goBack()
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título del bloque</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Estudiar React Native"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Curso o Materia (Opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. IF-1103"
        value={course}
        onChangeText={setCourse}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Confirmar y Volver"
          onPress={handleSave}
          disabled={!title.trim()}
          color="#4F46E5"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#1e293b" },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: { marginTop: 10 },
});
