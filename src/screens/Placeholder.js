// src/screens/Placeholder.js
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Placeholder({ title, description, links = [] }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.buttonContainer}>
        {links.map(({ label, to, params }) => (
          <Pressable
            key={label}
            style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
            onPress={() => {
              if (to) {
                navigation.navigate(to, params);
              } else {
                navigation.goBack();
              }
            }}
          >
            <Text style={styles.btnLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 12,
  },
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#4F46E5",
    alignItems: "center",
  },
  btnPressed: {
    opacity: 0.8,
  },
  btnLabel: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
});
