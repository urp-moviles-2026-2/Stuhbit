import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Placeholder from "./Placeholder";

export default function BlockDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params?.id ?? "Sin ID"; // Valor por defecto si no se proporciona un ID

  useEffect(() => {
    // Requisito LAB-03: headerRight con acción funcional
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            // Acción funcional: console.log y alerta visible para el video de entrega
            console.log(`[Header Action] Compartiendo datos del bloque #${id}`);
            Alert.alert(
              "Acción de Header",
              `Se ha compartido el reporte del bloque #${id}`,
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

  return (
    <Placeholder
      title={`Detalle del Bloque #${id}`}
      description="Datos completos del bloque cargados desde parámetros de navegación"
      links={[
        {
          label: `Ver bloque relacionado (#${typeof id === "number" ? id + 1 : 102})`,
          to: "DetalleBloque",
          params: { id: typeof id === "number" ? id + 1 : 102 },
        },
        {
          label: "Volver a Cronograma",
        },
      ]}
    />
  );
}
