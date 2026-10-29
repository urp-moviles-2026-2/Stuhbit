import React from "react";
import {
  NavigationContainer,
  createStaticNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";

//bara inferio
import { BottomNavBar } from "./src/navigation/BottomNavBar.js";

//pantallas principales de maquetas
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

import { colors } from "./src/theme/colors.js";

import { Avatar } from "./src/components/atoms/Avatar.js";

const primaryColor = colors.primary; // color principal

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <StatusBar style="dark" />
//         <Tab.Navigator
//           initialRouteName="Cronograma"
//           tabBar={(props) => <BottomNavBar {...props} />}
//           screenOptions={{
//             headerShown: false, // El header lo maneja tu AppHeader dentro de cada vista o template
//           }}
//         >
//           <Tab.Screen
//             name="Cronograma"
//             component={ScheduleScreen}
//             options={{ title: "Cronograma" }}
//           />
//           <Tab.Screen
//             name="Calendario"
//             component={CalendarScreen}
//             options={{ title: "Calendario" }}
//           />
//           <Tab.Screen
//             name="Apuntes"
//             component={NotesScreen}
//             options={{ title: "Apuntes" }}
//           />
//           <Tab.Screen
//             name="Enfoque"
//             component={FocusScreen}
//             options={{ title: "Enfoque" }}
//           />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

const CronogramaStack = createNativeStackNavigator({
  screens: {
    Cronograma: {
      screen: ScheduleScreen,
      options: ({ navigation }) => ({
        title: "Cronograma",
        headerRight: () => (
          <Avatar
            name="Sofía M." // O la variable de usuario de tu app
            size={32}
            onPress={() => navigation.navigate("ProfileMenu")}
            style={{ marginRight: 16 }}
          />
        ),
      }),
    },
  },
});

const MainTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: "#4F46E5",
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

const RootStack = createNativeStackNavigator({
  screens: {
    Main: {
      screen: MainTabs,
      options: {
        headerShown: false,
      },
    },
    SubirApunte: {
      screen: UploadNoteModal,
      options: {
        presentation: "modal",
        title: "Subir Apunte",
      },
    },
    AgendarBloque: {
      screen: ScheduleBlockModal,
      options: {
        presentation: "modal",
        title: "Agendar Bloque",
      },
    },
    DetalleBloque: {
      screen: BlockDetailScreen,
      options: ({ route }) => ({
        title: `Detalle del Bloque #${route.params?.id ?? ""}`,
      }),
    },
    ProfileMenu: {
      screen: ProfileMenuModal,
      options: {
        presentation: "modal",
        title: "Mi Cuenta",
      },
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        title: "Configuración y Ajustes",
      },
    },
    Perfil: {
      screen: ProfileScreen,
      options: {
        headerShown: false,
        title: "Perfil",
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
