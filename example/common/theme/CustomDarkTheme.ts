import {
  AtlasTheme,
  FontWeights,
  Typography,
  ATLAS_LIGHT,
} from "atlas-design-system";

const fontFamily = ATLAS_LIGHT.typography.h1.fontFamily;
const fontWeight: FontWeights = "700";

const typography: Typography = {
  h1xl: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily,
    fontWeight: "900",
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
    fontWeight: "500",
  },
  p3: {
    fontSize: 10,
    lineHeight: 16,
    fontFamily,
    fontWeight: "400",
  },
};

export const CustomDarkTheme: AtlasTheme = {
  size: {
    baseSize: 5,
  },
  borderWidth: 2,
  borderRadius: 10,
  keyboardAppearance: "dark",
  colors: {
    primary: "#69EEE0",
    primaryLowContrast: "#C5FAF5",
    secondaryPositive: "#69EEE0",
    secondaryNegative: "#f55555",
    secondaryWarning: "#FFC107",
    foreground: "#2D2D2D",
    foregroundHighContrast: "#ffffff",
    foregroundLowContrast: "#8A8A8A",
    foregroundPrimary: "#69EEE0",
    foregroundNegative: "#f55555",
    foregroundOnPrimary: "#212122",
    border: "#898989",
    borderSecondary: "#000000",
    backgroundPrimary: "#212122",
    backgroundOnPrimary: "#1a1a1a",
  },
  typography,
  isDarkTheme: false,
  LIGHT_BAR_STYLE: "light-content",
  DARK_BAR_STYLE: "dark-content",
};
