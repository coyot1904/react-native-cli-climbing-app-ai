export const Colors = {
  // Primary palette — forest green
  primary: '#3A7D44',
  primaryLight: '#5DB86A',
  primaryDark: '#2A5C30',
  primaryBg: '#EAF4EC',

  // Accent — summit orange
  accent: '#FF6B35',
  accentLight: '#FF8F60',
  accentBg: '#FDE8D8',

  // Info — sky blue
  info: '#4A90D9',
  infoBg: '#E5EDF8',

  // Neutrals
  black: '#0D0D0D',
  dark: '#1A1A1A',
  gray900: '#2C2C2A',
  gray700: '#5F5E5A',
  gray500: '#888780',
  gray300: '#B4B2A9',
  gray100: '#D3D1C7',
  gray50: '#F1EFE8',
  gray200: '#C1BFAF',
  white: '#FFFFFF',

  // Surface
  surface: '#FFFFFF',
  surfaceAlt: '#F8F7F4',
  background: '#F1EFE8',

  // Semantic
  danger: '#E24B4A',
  warning: '#BA7517',
  success: '#3A7D44',
};

export const Typography = {
  // Font sizes
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  hero: 36,

  // Weights
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  round: 999,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
  },
};
