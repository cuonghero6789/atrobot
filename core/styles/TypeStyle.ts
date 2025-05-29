import { StyleSheet } from 'react-native';
import { colors } from './Colors';

// Font families
export const fontFamily = {
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  semibold: 'Montserrat-SemiBold',
  bold: 'Montserrat-Bold',
} as const;

// Font sizes
export const fontSize = {
  xxs: 8,
  xsss: 10,
  xssm: 11,
  xs: 12,
  xss: 13,
  sm: 14,
  ssm: 15,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 36,
} as const;

// Font weights
export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Line heights
export const lineHeight = {
  x: 15,
  xs: 16,
  xxs: 17,
  sm: 20,
  ssm: 21,
  sssm: 22,
  ssssm: 23,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 36,
} as const;

// Text styles
export const textStyle = StyleSheet.create({
  // Headings
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    lineHeight: lineHeight.xxl,
    fontWeight: fontWeight.bold,
  },
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
    fontWeight: fontWeight.bold,
  },
  h3: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
  },

  // Body text
  body: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    fontWeight: fontWeight.regular,
  },
  bodyBold: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    fontWeight: fontWeight.bold,
  },

  // Small text
  small: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.regular,
  },
  smallBold: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.bold,
  },

  // Caption
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.regular,
  },

  description: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },

  subTitle: {
    fontFamily: fontFamily.semibold,
    lineHeight: lineHeight.xxs,
    fontSize: fontSize.ssm
  },
  textBold: {
    fontFamily: fontFamily.bold,
    lineHeight: lineHeight.sm,
    fontSize: fontSize.ssm,
    fontWeight: fontWeight.bold
  },
  text: {
    fontFamily: fontFamily.regular,
    lineHeight: lineHeight.sm,
    fontSize: fontSize.ssm,
    fontWeight: fontWeight.regular
  },
  subTitleMedium: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.ssm
  },
  largeText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xxxl
  },
  btnSecondary: {
    fontFamily: fontFamily.semibold,
    lineHeight: lineHeight.xs,
    fontSize: fontSize.xxs
  },
  bodyTextBold: {
    fontFamily: fontFamily.semibold,
    lineHeight: lineHeight.xs,
    fontSize: fontSize.xs
  },
  textBold3: {
    fontFamily: fontFamily.bold,
    lineHeight: lineHeight.ssm,
    fontSize: fontSize.xs
  },
  subTitleMedium1: {
    fontFamily: fontFamily.medium,
    lineHeight: lineHeight.ssm,
    fontSize: fontSize.sm,
    color: "#1E1E1E",
    fontWeight: fontWeight.regular
  },
  textBold2: {
    fontFamily: fontFamily.bold,
    lineHeight: lineHeight.md,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.surfaceElevated
  },
  textBold4: {
    fontFamily: fontFamily.bold,
    lineHeight: lineHeight.sm,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold
  },
  bodyText2: {
    fontFamily: fontFamily.medium,
    lineHeight: lineHeight.md,
    fontSize: fontSize.xss
  },
  bodyText1: {
    fontFamily: fontFamily.medium,
    lineHeight: lineHeight.sm,
    fontSize: fontSize.xss
  },
  title: {
    fontFamily: fontFamily.semibold,
    lineHeight: lineHeight.sssm,
    fontSize: fontSize.lg
  },
  subTitle2: {
    fontFamily: fontFamily.semibold,
    lineHeight: lineHeight.ssssm,
    fontSize: fontSize.ssm
  },
  subTitle1: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.md
  },
  bodyText: {
    fontFamily: fontFamily.medium,
    lineHeight: lineHeight.xs,
    fontSize: fontSize.xssm
  },
});

export type FontFamilyKeys = keyof typeof fontFamily;
export type FontSizeKeys = keyof typeof fontSize;
export type FontWeightKeys = keyof typeof fontWeight;
export type LineHeightKeys = keyof typeof lineHeight;
export type TextStyleKeys = keyof typeof textStyle; 