import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { colors, palette } from "../../theme";

export const Avatar = ({ source, name = "", size = 40, onPress, style }) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (text) => {
    if (!text) return "";
    const parts = text.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const containerSizeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const hasValidImage = source && !imageError;

  const content = hasValidImage ? (
    <Image
      source={typeof source === "string" ? { uri: source } : source}
      style={[styles.image, containerSizeStyle]}
      onError={() => setImageError(true)}
      resizeMode="cover"
    />
  ) : (
    <View style={[styles.fallbackContainer, containerSizeStyle]}>
      <Text style={[styles.fallbackText, { fontSize: size * 0.4 }]}>
        {getInitials(name)}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        hitSlop={8}
        style={({ pressed }) => [
          styles.pressableWrapper,
          containerSizeStyle,
          pressed && styles.pressed,
          style,
        ]}
        accessibilityRole="button"
        accessibilityLabel={name ? `Perfil de ${name}` : "Perfil de usuario"}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={[styles.wrapper, containerSizeStyle, style]}>{content}</View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    backgroundColor: palette.neutral[100],
  },
  pressableWrapper: {
    overflow: "hidden",
    backgroundColor: palette.neutral[100],
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallbackContainer: {
    backgroundColor: palette.primary[50],
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: palette.primary[100],
  },
  fallbackText: {
    fontWeight: "700",
    color: palette.primary[700],
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});
