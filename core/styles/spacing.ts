export const spacing = {
  // Base spacing units
  xTiny: 2,
  xs: 4,
  xxs: 6,
  sm: 8,
  ssm: 12,
  md: 16,
  large: 20,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  bigx2: 64,
  big: 32,
  extraLarge: 24,
} as const;

export type SpacingKeys = keyof typeof spacing; 