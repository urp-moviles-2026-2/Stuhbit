import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";
import AppHeader from "../components/AppHeader";
import BottomNavBar from "../components/BottomNavBar";
import Badge from "../components/Badge";
import ProgressBar from "../components/ProgressBar";
import SearchInput from "../components/SearchInput";
import Chips from "../components/Chips";
import { colors, spacing, fontSize } from "../theme";

function ButtonDemo() {
  return (
    <View style={styles.stack}>
      <Button
        label="Iniciar sesión recomendada"
        icon="▶"
        variant="primary"
        onPress={() => {}}
      />
      <Button label="Completar" icon="✔" variant="success" onPress={() => {}} />
      <Button
        label="Posponer"
        variant="outlined"
        size="sm"
        onPress={() => {}}
      />
    </View>
  );
}

function SearchInputDemo() {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchInput
      value={searchText}                        
      onChangeText={(nuevoTexto) => setSearchText(nuevoTexto)} 
      placeholder="Buscar apuntes de estudio"
    />
  );
}

function ChipsDemo() {
  const [activeChip, setActiveChip] = useState("Todos");

  const chipsData = ["Todos", "Pendientes", "Completados", "Favoritos"];

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {chipsData.map((chipLabel) => (
        <Chips
          key={chipLabel}
          label={chipLabel}
          active={activeChip === chipLabel}
          onPress={() => setActiveChip(chipLabel)}
        />
      ))}
    </View>
  );
} 


function BadgeDemo() {
  return (
    <View style={{ gap: spacing.sm }}>
      <View style={{ flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" }}>
        <Badge label="En curso" variant="primary" dot />
        <Badge label="Finalizado" variant="success" dot />
        <Badge label="Entrega Urgente" variant="danger" dot />
        <Badge label="Aviso de Examen" variant="warning" />
        <Badge label="1h 30m" variant="neutral" />
      </View>
    </View>
  );
}

function ProgressBarDemo() {
  return (
    <View style={{ gap: spacing.md }}>
      <ProgressBar progress={0.85} color={colors.primary} />
      <ProgressBar progress={0.6} color={colors.success} />
      <ProgressBar progress={35} color={colors.warning} />
    </View>
  );
}

function CardDemo() {
  return (
    <View style={styles.stack}>
      <Card label="RESUMEN">
        <Text style={{ fontSize: fontSize.sm, color: colors.text }}>
          Contenedor de tarjeta estándar.
        </Text>
      </Card>

      <Card
        label="META DIARIA"
        headerRight={
          <Text style={{ color: colors.primary, fontWeight: "700" }}>85%</Text>
        }
      >
        <Text
          style={{
            fontSize: fontSize.md,
            fontWeight: "700",
            color: colors.text,
          }}
        >
          1h 45m
        </Text>
        <Text style={{ fontSize: fontSize.xs, color: colors.textSecondary }}>
          de 2h objetivo
        </Text>
      </Card>
    </View>
  );
}

function AppHeaderDemo() {
  return (
    <View style={styles.stack}>
      {/* Modo saludo */}
      <View style={styles.headerContainer}>
        <AppHeader
          greeting="¡Hola, Sofía!"
          subtitle="Octubre 2025"
          hasNotification
          onNotificationPress={() => {}}
          onAvatarPress={() => {}}
        />
      </View>
 
      {/* Modo título con botón de volver */}
      <View style={styles.headerContainer}>
        <AppHeader
          title="Sprint de Estudio"
          showBack
          onBackPress={() => {}}
          rightIcon="ellipsis-horizontal"
          onRightPress={() => {}}
        />
      </View>
    </View>
  );
}

function BottomNavBarDemo() {
  const [activeRoute, setActiveRoute] = useState("inicio");

  return (
    <View style={styles.navContainer}>
      <BottomNavBar
        activeRoute={activeRoute}
        onNavigate={(routeKey) => setActiveRoute(routeKey)}
      />
    </View>
  );
}

export const CATALOG = [
  {
    name: "Button",
    category: "Acciones",
    description: "Botón con variantes (primary, success, outlined) e iconos",
    Demo: ButtonDemo,
  },
  {
    name: "Card",
    category: "Contenedores",
    description: "Tarjeta con encabezado superior opcional y soporte de hijos",
    Demo: CardDemo,
  },
  {
    name: "AppHeader",
    category: "Navegación",
    description: "Encabezado con modo saludo (avatar + notificaciones) y modo título (volver + acción)",
    Demo: AppHeaderDemo,
  },
  {
    name: "BottomNavBar",
    category: "Navegación",
    description: "Barra de navegación inferior con indicador activo y soporte para pestañas personalizadas",
    Demo: BottomNavBarDemo,
  },
  {
    name: "Badge",
    category: "Datos",
    description: "Etiquetas de estado y categorías con variantes de color",
    Demo: BadgeDemo,
  },
  {
    name: "ProgressBar",
    category: "Datos",
    description: "Barra lineal de progreso configurable por valor y color",
    Demo: ProgressBarDemo,
  },
  {
    name: "SearchInput",
    category: "Datos",
    description: "Campo de búsqueda con valor controlado y evento de cambio",
    Demo: SearchInputDemo,
  },
  {
    name: "Chips",
    category: "Datos",
    description: "Etiquetas interactivas con estado activo y soporte de eventos",
    Demo: ChipsDemo,
  },
];

const styles = StyleSheet.create({
  stack: {
    gap: spacing.sm ?? 12,
  },
  navContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
});
