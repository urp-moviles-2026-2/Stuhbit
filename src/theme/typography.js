export const fontFamily = {
  regular: "PlusJakartaSans-Regular",
  medium: "PlusJakartaSans-Medium",
  semiBold: "PlusJakartaSans-SemiBold",
  bold: "PlusJakartaSans-Bold",
  extraBold: "PlusJakartaSans-ExtraBold",
};

export const fontWeight = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
};

export const fontSize = {
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  display: 32,
  timer: 48,
};

export const lineHeight = {
  xxs: 14,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 30,
  xxl: 32,
  display: 40,
  timer: 56,
};

export const typography = {
  // Número principal del temporizador de enfoque
  timer: {
    fontFamily: fontFamily.extraBold,
    fontWeight: fontWeight.extraBold,
    fontSize: fontSize.timer,
    lineHeight: lineHeight.timer,
    letterSpacing: -0.5,
  },

  // Headline especificado en Stitch
  headline: {
    fontFamily: fontFamily.extraBold,
    fontWeight: fontWeight.extraBold,
    fontSize: fontSize.display,
    lineHeight: lineHeight.display,
    letterSpacing: -0.3,
  },

  // Título de sección
  title: {
    fontFamily: fontFamily.bold,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.xxl,
    lineHeight: lineHeight.xxl,
  },

  // Título de cards
  subtitle: {
    fontFamily: fontFamily.bold,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
  },

  // Texto base
  body: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
  },

  // Texto secundario
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },

  // Headers de tarjeta
  cardLabel: {
    fontFamily: fontFamily.bold,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: 0.5,
  },

  // Badges y botones
  label: {
    fontFamily: fontFamily.semiBold,
    fontWeight: fontWeight.semiBold,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },

  // Fechas y metadatos pequeños
  caption: {
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },

  // Micro-etiquetas
  micro: {
    fontFamily: fontFamily.semiBold,
    fontWeight: fontWeight.semiBold,
    fontSize: fontSize.xxs,
    lineHeight: lineHeight.xxs,
  },
};
