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
import BlockDetailScreen from "./src/screens/BlockDetailScreen.js"; // Detalle de Bloque
import UploadNoteModal from "./src/screens/UploadNoteModal.js"; // Modal de Subida de Apunte
import ScheduleBlockModal from "./src/screens/ScheduleBlockModal.js"; // Modal de Agendar Bloque

import { colors } from "./src/theme/colors.js";

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
      options: { title: "Cronograma" },
    },
  },
});

const MainTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false, // Evita headers dobles con los stacks internos
    tabBarActiveTintColor: primaryColor,
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
      options: {
        title: "Calendario",
        headerShown: true, // Se muestra header ya que no está envuelto en un stack propio
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar-outline" color={color} size={size} />
        ),
      },
    },
    ApuntesTab: {
      screen: NotesScreen,
      options: {
        title: "Apuntes",
        headerShown: true,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="folder-outline" color={color} size={size} />
        ),
      },
    },
    EnfoqueTab: {
      screen: FocusScreen,
      options: {
        title: "Enfoque",
        headerShown: true,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="timer-outline" color={color} size={size} />
        ),
      },
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
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
