import React, { useEffect } from "react";
import { createStaticNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";

// Redux & Store
import { Provider } from "react-redux";
import { store } from "./src/store/index.js";
import { hydrateBlocks } from "./src/store/scheduleSlice.js";
import { cargarBloques, suscribirPersistencia } from "./src/store/persistencia.js";

// Context de Sesión
import { SesionProvider, useSesion } from "./src/context/SesionContext.js";

// Pantallas principales de maquetas
import ScheduleScreen from "./src/screens/ScheduleScreen.js"; // Cronograma
import CalendarScreen from "./src/screens/CalendarScreen.js"; // Calendario
import NotesScreen from "./src/screens/NotesScreen.js"; // Apuntes
import FocusScreen from "./src/screens/FocusScreen.js"; // Enfoque
import SettingsScreen from "./src/screens/SettingsScreen.js"; // Ajustes
import BlockDetailScreen from "./src/screens/BlockDetailScreen.js"; // Detalle de Bloque
import UploadNoteModal from "./src/screens/UploadNoteModal.js"; // Modal de Subida de Apunte
import ScheduleBlockModal from "./src/screens/ScheduleBlockModal.js"; // Modal de Agendar Bloque
import ProfileMenuModal from "./src/screens/ProfileMenuModal.js"; // Modal de Perfil
import ProfileScreen from "./src/screens/ProfileScreen.js"; // Pantalla de Perfil
import LoginScreen from "./src/screens/LoginScreen.js"; // Pantalla de Login (Agregada para LAB-04)

import { colors } from "./src/theme/colors.js";
import { Avatar } from "./src/components/atoms/Avatar.js";

const primaryColor = colors.primary;

// Hooks auxiliares para la navegación condicional (Punto 5 del LAB-04)
const useEstaLogueado = () => useSesion().estaLogueado;
const useNoEstaLogueado = () => !useSesion().estaLogueado;

// Sub-stack de Cronograma
const CronogramaStack = createNativeStackNavigator({
  screens: {
    Cronograma: {
      screen: ScheduleScreen,
      options: ({ navigation }) => ({
        title: "Cronograma",
        headerRight: () => (
          <Avatar
            name="Sofía M."
            size={32}
            onPress={() => navigation.navigate("ProfileMenu")}
            style={{ marginRight: 16 }}
          />
        ),
      }),
    },
  },
});

// Navegación por Tabs principales
const MainTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: primaryColor || "#4F46E5",
    tabBarInactiveTintColor: "#94A3B8",
  },
  screens: {
    CronogramaTab: {
      screen: CronogramaStack,
      options: {
        title: "Cronograma",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="time-outline" color={color} size={size} />
        ),
      },
    },
    CalendarioTab: {
      screen: CalendarScreen,
      options: ({ navigation }) => ({
        title: "Calendario",
        headerShown: true,
        headerRight: () => (
          <Avatar
            name="Sofía M."
            size={32}
            onPress={() => navigation.navigate("ProfileMenu")}
            style={{ marginRight: 16 }}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar-outline" color={color} size={size} />
        ),
      }),
    },
    ApuntesTab: {
      screen: NotesScreen,
      options: ({ navigation }) => ({
        title: "Apuntes",
        headerShown: true,
        headerRight: () => (
          <Avatar
            name="Sofía M."
            size={32}
            onPress={() => navigation.navigate("ProfileMenu")}
            style={{ marginRight: 16 }}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="folder-outline" color={color} size={size} />
        ),
      }),
    },
    EnfoqueTab: {
      screen: FocusScreen,
      options: ({ navigation }) => ({
        title: "Enfoque",
        headerShown: true,
        headerRight: () => (
          <Avatar
            name="Sofía M."
            size={32}
            onPress={() => navigation.navigate("ProfileMenu")}
            style={{ marginRight: 16 }}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="timer-outline" color={color} size={size} />
        ),
      }),
    },
  },
});

// RootStack con navegación condicional de Login (Punto 5 del LAB-04)
const RootStack = createNativeStackNavigator({
  screens: {
    Main: {
      if: useEstaLogueado,
      screen: MainTabs,
      options: { headerShown: false },
    },
    Login: {
      if: useNoEstaLogueado,
      screen: LoginScreen,
      options: { headerShown: false },
    },
    SubirApunte: {
      if: useEstaLogueado,
      screen: UploadNoteModal,
      options: {
        presentation: "modal",
        title: "Subir Apunte",
      },
    },
    AgendarBloque: {
      if: useEstaLogueado,
      screen: ScheduleBlockModal,
      options: {
        presentation: "modal",
        title: "Agendar Bloque",
      },
    },
    DetalleBloque: {
      if: useEstaLogueado,
      screen: BlockDetailScreen,
      options: ({ route }) => ({
        title: `Detalle del Bloque #${route.params?.id ?? ""}`,
      }),
    },
    ProfileMenu: {
      if: useEstaLogueado,
      screen: ProfileMenuModal,
      options: {
        presentation: "modal",
        title: "Mi Cuenta",
      },
    },
    Settings: {
      if: useEstaLogueado,
      screen: SettingsScreen,
      options: {
        title: "Configuración y Ajustes",
      },
    },
    Perfil: {
      if: useEstaLogueado,
      screen: ProfileScreen,
      options: {
        headerShown: false,
        title: "Perfil",
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

// Activa el listener para persistir cambios automáticamente en AsyncStorage
suscribirPersistencia(store);

export default function App() {
  // Carga inicial de datos desde AsyncStorage al arrancar la aplicación
  useEffect(() => {
    cargarBloques().then((items) => {
      if (items) {
        store.dispatch(hydrateBlocks(items));
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SesionProvider>
          <StatusBar style="dark" />
          <Navigation />
        </SesionProvider>
      </Provider>
    </SafeAreaProvider>
  );
}