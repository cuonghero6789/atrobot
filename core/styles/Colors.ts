export const colors = {
  // Primary colors
  primary: "#1A2380",
  primaryLight: "#2D79E5",
  primaryLighter: "#B2D1FD",
  
  // Base colors
  white: '#FFFFFF',
  black: '#141414',
  
  // Background colors
  background: '#E8E8E8',
  backgroundDark: '#1F1F1F',
  backgroundDarker: '#1A1A1A',
  backgroundCard: '#3B3B3B',
  backgroundModal: '#2B2B2B',
  backgroundOverlay: '#262626',
  backgroundSecondary: '#363636',
  backgroundTertiary: '#383333',
  backgroundTransparent: '#18223868',
  backgroundChart: '#383D3B',
  
  // Text colors
  text: '#A8B0AD',
  textSecondary: '#CCCCCC',
  textDark: "#201E1E",
  textMuted: '#707070',
  textLight: '#ADADAD',
  textGray: '#B0ABAB',
  
  // Border colors
  border: '#4F4A4A',
  borderSecondary: '#4D4D4D',
  borderLight: '#424242',
  borderLighter: '#DEDEDE',
  
  // Status colors
  success: "#357FE9",
  successLight: "#357FE96E",
  warning: '#E1AD46',
  warningLight: "#E4C084",
  warningLighter: "#FFEECC",
  error: '#6F3636',
  
  // Surface colors
  surface: '#4F4F4F',
  surfaceDark: "#3C3B3BB2",
  surfaceCard: "#3C3B3B",
  surfaceElevated: "#3D3D3D",
  surfaceModal: "#1E1E1E",

  line: '#424242',
  line2: '#DEDEDE',
  black3: "#3D3D3D",
  gray: '#707070', 
  black4: "#1E1E1E",
  black2: "#201E1E",
  black1: "#3C3B3B",
  tint: "#1A2380",
  bgColor: '#3B3B3B',
  bgColor1: '#1F1F1F',
  bgColor2: '#1A1A1A',
  bgColor3: '#4F4F4F',
  bgColor4: '#2B2B2B',
  bgColor5: '#3B3B3B',
  bgColor6: '#262626',
  bgColor7: '#363636',
  bgColor8: '#383333',
  bgColor9: '#18223868',
  gray2: '#ADADAD',
  gray3: '#B0ABAB',
  gray4: "#3C3B3BB2",
  borderColor: '#4F4A4A',
  borderColor2: '#4D4D4D',
  grayBarChart: '#383D3B',
  textColor: '#A8B0AD',
  textColor2: '#CCCCCC',
  yellow: '#E1AD46',
  yellow2: "#E4C084",
  yellow3: "#FFEECC",
  red: '#6F3636',
  green: "#357FE9",
  green2: "#357FE96E",
  primaryColor: "#2D79E5",
  primaryColor2: "#B2D1FD",
} as const;

export type ColorKeys = keyof typeof colors;
export type ColorValue = typeof colors[ColorKeys]; 