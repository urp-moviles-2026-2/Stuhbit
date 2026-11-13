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
import {
  cargarBloques,
  suscribirPersistencia,
} from "./src/store/persistencia.js";

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
import FocusSuccessScreen from "./src/screens/FocusSuccessScreen.js";

import { colors } from "./src/theme/colors.js";
import { Avatar } from "./src/components/atoms/Avatar.js";

import ContactoScreen from "./src/screens/ContactoScreen.js";

const primaryColor = colors.primary;

// Hooks auxiliares para la navegación condicional (Punto 5 del LAB-04)
const useEstaLogueado = () => useSesion().estaLogueado;
const useNoEstaLogueado = () => !useSesion().estaLogueado;

// 1. Stack de Cronograma (Lista -> Detalle)
const CronogramaStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Cronograma: {
      screen: ScheduleScreen,
    },
    DetalleBloque: {
      screen: BlockDetailScreen,
      options: ({ route }) => ({
        headerShown: true, // Header nativo con botón "Atrás" automático
        title: `Detalle del Bloque #${route.params?.id ?? ""}`,
      }),
    },
  },
});

// 2. Stack de Apuntes (Lista -> Detalle de Apunte)
const ApuntesStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Apuntes: {
      screen: NotesScreen,
    },
    // Aquí puedes agregar pantallas secundarias de apuntes:
    // DetalleApunte: { screen: DetalleApunteScreen, options: { headerShown: true, title: "Visor de Apunte" } }
  },
});

// 3. Stack de Calendario
const CalendarioStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Calendario: {
      screen: CalendarScreen,
    },
  },
});

const FocusStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Enfoque: {
      screen: FocusScreen,
    },
    FocusSuccess: {
      screen: FocusSuccessScreen,
      options: { headerShown: true, title: "Comprobante de Enfoque" },
    },
  },
});

// 4. Tabs Principales
const MainTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: colors.primary,
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
      screen: CalendarioStack,
      options: {
        title: "Calendario",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar-outline" color={color} size={size} />
        ),
      },
    },
    ApuntesTab: {
      screen: ApuntesStack,
      options: {
        title: "Apuntes",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="folder-outline" color={color} size={size} />
        ),
      },
    },
    EnfoqueTab: {
      screen: FocusStack, // Puede ir directo si no tiene pantallas hijas
      options: {
        title: "Enfoque",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="timer-outline" color={color} size={size} />
        ),
      },
    },
  },
});

// 5. RootStack (Solo Autenticación, Modales flotantes y Pantallas independientes)
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
    // Modales flotantes
    SubirApunte: {
      if: useEstaLogueado,
      screen: UploadNoteModal,
      options: { presentation: "modal", title: "Subir Apunte" },
    },
    AgendarBloque: {
      if: useEstaLogueado,
      screen: ScheduleBlockModal,
      options: {
        presentation: "transparentModal",
        animation: "slide_from_bottom",
        headerShown: false,
        title: "Agendar Bloque",
      },
    },
    ProfileMenu: {
      if: useEstaLogueado,
      screen: ProfileMenuModal,
      options: { presentation: "modal", title: "Mi Cuenta" },
    },
    // Pantallas globales de configuración y feedback
    Settings: {
      if: useEstaLogueado,
      screen: SettingsScreen,
      options: { title: "Configuración y Ajustes" },
    },
    Perfil: {
      if: useEstaLogueado,
      screen: ProfileScreen,
      options: { headerShown: false, title: "Perfil" },
    },
    Contacto: {
      if: useEstaLogueado,
      screen: ContactoScreen,
      options: { title: "Contacto y Feedback" },
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
