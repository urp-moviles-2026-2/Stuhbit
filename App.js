import { useMemo, useState } from "react";
import {
  SectionList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import { CATALOG } from "./src/viewer/catalog";
import { colors, fontSize, radius, spacing } from "./src/theme";

const Stack = createNativeStackNavigator();

function groupByCategory(items) {
  const groups = {};
  items.forEach((item) => {
    (groups[item.category] ||= []).push(item);
  });
  return Object.entries(groups).map(([title, data]) => ({ title, data }));
}

function ComponentListScreen({ navigation }) {
  const [query, setQuery] = useState("");

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? CATALOG.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q)
        )
      : CATALOG;
    return groupByCategory(filtered);
  }, [query]);

  return (
    <SectionList
      style={styles.screen}
      contentContainerStyle={styles.content}
      sections={sections}
      keyExtractor={(item) => item.name}
      keyboardShouldPersistTaps="handled"
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color={colors.textPlaceholder}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Buscar componente..."
            placeholderTextColor={colors.textPlaceholder}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons
                name="close-circle"
                size={18}
                color={colors.textPlaceholder}
              />
            </TouchableOpacity>
          )}
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>No se encontraron componentes.</Text>
      }
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Preview", { name: item.name })}
        >
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>{item.name}</Text>
            <Text style={styles.rowDesc}>{item.description}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textPlaceholder}
          />
        </TouchableOpacity>
      )}
    />
  );
}

function ComponentPreviewScreen({ route }) {
  const entry = CATALOG.find((c) => c.name === route.params.name);
  const { Demo } = entry;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.previewCategory}>{entry.category.toUpperCase()}</Text>
      <Text style={styles.previewDesc}>{entry.description}</Text>
      <View style={styles.canvas}>
        <Demo />
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
            headerTintColor: colors.text,
          }}
        >
          <Stack.Screen
            name="Components"
            component={ComponentListScreen}
            options={{ title: "Componentes UI" }}
          />
          <Stack.Screen
            name="Preview"
            component={ComponentPreviewScreen}
            options={({ route }) => ({ title: route.params.name })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md ?? 16,
    paddingBottom: (spacing.xl ?? 32) * 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.md ?? 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm ?? 12,
    paddingVertical: spacing.xs ?? 8,
    marginBottom: spacing.md ?? 16,
  },
  searchIcon: {
    marginRight: spacing.xs ?? 8,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.sm ?? 14,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: fontSize.xs ?? 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: colors.textSecondary,
    marginTop: spacing.md ?? 16,
    marginBottom: spacing.xs ?? 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg ?? 12,
    borderWidth: 1,
    borderColor: colors.divider ?? colors.border,
    padding: spacing.md ?? 16,
    marginBottom: spacing.sm ?? 8,
  },
  rowText: {
    flex: 1,
    marginRight: spacing.sm ?? 8,
  },
  rowTitle: {
    fontSize: fontSize.sm ?? 14,
    fontWeight: "600",
    color: colors.text,
  },
  rowDesc: {
    fontSize: fontSize.xs ?? 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  empty: {
    fontSize: fontSize.sm ?? 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.xl ?? 32,
  },
  previewCategory: {
    fontSize: fontSize.xs ?? 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: colors.primary,
  },
  previewDesc: {
    fontSize: fontSize.sm ?? 14,
    color: colors.textSecondary,
    marginTop: spacing.xs ?? 4,
    marginBottom: spacing.md ?? 16,
  },
  canvas: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl ?? 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    padding: spacing.md ?? 16,
  },
});