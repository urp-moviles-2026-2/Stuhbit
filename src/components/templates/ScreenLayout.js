import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../../theme";

export const ScreenLayout = ({
  children,
  header,
  scrollable = true,
  contentContainerStyle,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Si la pantalla es tableta o apaisada ancha, limitamos el ancho para que no se deforme
  const isLargeScreen = width >= 768;

  const responsiveContainerStyle = [
    styles.responsiveWrapper,
    isLargeScreen && styles.largeScreenConstraint,
  ];

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          // No aplicamos paddingBottom aquí si tienes un BottomNavBar que ya maneja su propio inset
        },
        style,
      ]}
    >
      {/* Cabecera persistente opcional */}
      {header && <View style={styles.headerWrapper}>{header}</View>}

      {/* Contenido principal adaptativo */}
      {scrollable ? (
        <ScrollView
          style={styles.flexOne}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={responsiveContainerStyle}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.flexOne, styles.staticContent]}>
          <View style={responsiveContainerStyle}>{children}</View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flexOne: {
    flex: 1,
  },
  headerWrapper: {
    width: "100%",
    zIndex: 10,
  },
  scrollContent: {
    paddingVertical: spacing.md ?? 16,
    paddingHorizontal: spacing.md ?? 16,
    flexGrow: 1,
  },
  staticContent: {
    paddingVertical: spacing.md ?? 16,
    paddingHorizontal: spacing.md ?? 16,
  },
  responsiveWrapper: {
    width: "100%",
    flex: 1,
  },
  largeScreenConstraint: {
    maxWidth: 680,
    alignSelf: "center",
  },
});
