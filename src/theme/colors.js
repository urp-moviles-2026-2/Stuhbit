export const palette = {
  primary: {
    900: "#1E1B4B",
    800: "#2E2B88",
    700: "#3730A3",
    600: "#4338CA",
    500: "#4F46E5",
    400: "#6366F1",
    300: "#818CF8",
    200: "#A5B4FC",
    100: "#C7D2FE",
    50: "#EEF2FF",
  },

  secondary: {
    900: "#064E3B",
    800: "#065F46",
    700: "#047857",
    600: "#059669",
    500: "#10B981",
    400: "#34D399",
    300: "#6EE7B7",
    200: "#A7F3D0",
    100: "#D1FAE5",
    50: "#ECFDF5",
  },

  tertiary: {
    900: "#78350F",
    800: "#92400E",
    700: "#B45309",
    600: "#D97706",
    500: "#F59E0B",
    400: "#FBBF24",
    300: "#FCD34D",
    200: "#FDE68A",
    100: "#FEF3C7",
    50: "#FFFBEB",
  },

  neutral: {
    900: "#0F172A",
    800: "#1E293B",
    700: "#334155",
    600: "#475569",
    500: "#64748B",
    400: "#94A3B8",
    300: "#CBD5E1",
    200: "#E2E8F0",
    100: "#F1F5F9",
    50: "#F8FAFC",
  },
  danger: "#EF4444",
  background: "#E8EDF5",
  surface: "#FFFFFF",
  white: "#FFFFFF",
  black: "#000000",
};

export const colors = {
  primary: palette.primary[500],
  primaryDark: palette.primary[700],
  primaryLight: palette.primary[300],

  secondary: palette.secondary[500],
  secondaryDark: palette.secondary[700],
  secondaryLight: palette.secondary[300],

  tertiary: palette.tertiary[500],
  tertiaryDark: palette.tertiary[700],
  tertiaryLight: palette.tertiary[300],

  neutral: palette.neutral[500],
  inverted: palette.neutral[800],

  background: palette.background,
  surface: palette.surface,

  text: palette.neutral[900],
  textSecondary: palette.neutral[600],
  textInverted: palette.white,
  textPlaceholder: palette.neutral[400],

  border: palette.neutral[200],
  divider: palette.neutral[100],

  success: palette.secondary[500],
  warning: palette.tertiary[500],
  danger: palette.danger,
};
