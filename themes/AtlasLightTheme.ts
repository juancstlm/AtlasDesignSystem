import { AtlasTheme, FontWeights, Typography } from '../../../libs/atlasDesignSystem';

const fontFamily = 'Gilroy-Bold';
const fontWeight: FontWeights = '700';

const typography: Typography = {
  h1xl: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily,
    fontWeight: '900',
  },
  h1: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily,
    fontWeight,
  },
  h2: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily,
    fontWeight,
  },
  h3: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily,
    fontWeight,
  },
  p1: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily,
    fontWeight,
  },
  p2: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily,
    fontWeight: '200',
  },
  p3: {
    fontSize: 10,
    lineHeight: 16,
    fontFamily,
    fontWeight: '200',
  },
};

export const ATLAS_LIGHT: AtlasTheme = {
  size: {
    baseSize: 5,
  },
  borderWidth: 2,
  borderRadius: 10,
  keyboardAppearance: 'light',
  colors: {
    primary: '#21b473',
    primaryLowContrast: '#90d9b9',
    secondaryPositive: '#02AD5D',
    secondaryNegative: '#f55555',
    secondaryWarning: '#FFC107',
    foreground: '#2D2D2D',
    foregroundHighContrast: '#0B0B0B',
    foregroundLowContrast: '#8A8A8A',
    foregroundPrimary: '#21b473',
    foregroundNegative: '#f55555',
    foregroundOnPrimary: '#fff',
    border: '#898989',
    borderSecondary: '#00000000',
    backgroundPrimary: '#f1f1f1',
    backgroundOnPrimary: '#e4e4e4',
  },
  typography,
  isDarkTheme: false,
  modalBackground: '#f6f6f6',
  primary: '#21b473',
  text: '#000000',
  textPrimary: '#000',
  textSecondary: '#fff',
  menuItemContainerBackground: '#e4e4e4',
  background: '#ffffff',
  LIGHT_BAR_STYLE: 'light-content',
  DARK_BAR_STYLE: 'dark-content',
  card: 'rgb(255, 255, 255)',
  chevronForward: '#afb0b3',
  workoutStatisticsBarItemBackground: '#EDEDED',
  placeholderTextColor: '#8A8A8A',
};
