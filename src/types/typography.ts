export type TypographyVariants = 'h1xl' | 'h1' | 'h2' | 'h3' | 'p1' | 'p2' | 'p3';

export type FontWeights = '200' | '300' | '400' | '500' | '700' | '800' | '900';

export interface TypographyStyles {
  fontSize: number;
  lineHeight: number;
  fontWeight: FontWeights;
  fontFamily: string;
}

export type Typography = {
  [variant in TypographyVariants]: TypographyStyles;
};
