import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// Importa tu barra inferior personalizada
import { BottomNavBar } from "./src/navigation/BottomNavBar.js";

// Importa las 4 pantallas principales
import ScheduleScreen from "./src/screens/ScheduleScreen.js"; // Cronograma
import CalendarScreen from "./src/screens/CalendarScreen.js"; // Calendario
import NotesScreen from "./src/screens/NotesScreen.js"; // Apuntes
import FocusScreen from "./src/screens/FocusScreen.js"; // Enfoque

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          initialRouteName="Cronograma"
          tabBar={(props) => <BottomNavBar {...props} />}
          screenOptions={{
            headerShown: false, // El header lo maneja tu AppHeader dentro de cada vista o template
          }}
        >
          <Tab.Screen
            name="Cronograma"
            component={ScheduleScreen}
            options={{ title: "Cronograma" }}
          />
          <Tab.Screen
            name="Calendario"
            component={CalendarScreen}
            options={{ title: "Calendario" }}
          />
          <Tab.Screen
            name="Apuntes"
            component={NotesScreen}
            options={{ title: "Apuntes" }}
          />
          <Tab.Screen
            name="Enfoque"
            component={FocusScreen}
            options={{ title: "Enfoque" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
