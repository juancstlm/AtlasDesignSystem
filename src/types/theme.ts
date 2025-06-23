import { StatusBarStyle, TextInputProps } from "react-native";

import { Typography } from "./typography";

export type AtlasTheme = {
  size: {
    baseSize: number;
  };
  borderRadius: number;
  borderWidth: number;
  keyboardAppearance: TextInputProps["keyboardAppearance"];
  colors: {
    primary: string; // The main color for the theme
    primaryLowContrast: string; // A low contrast version of the primary color. Used for disabled buttons
    secondaryPositive: string; // Color for positive actions
    secondaryNegative: string; // Color for negative actions
    secondaryWarning: string; // Color for conveying a warning
    foreground: string;
    foregroundHighContrast: string;
    foregroundLowContrast: string;
    foregroundPrimary: string; // Color for positiveContent that will sit on the backgroundPrimary color
    foregroundNegative: string; // Color for negative content that will sit on the backgroundPrimary color
    foregroundOnPrimary: string;
    border: string; // Primary border color
    borderSecondary: string; // Color of the border when element is inactive
    backgroundPrimary: string; // The main background color
    backgroundOnPrimary: string; // Background color for items that will be on top of the background
  };
  LIGHT_BAR_STYLE: string;
  DARK_BAR_STYLE: StatusBarStyle;
  isDarkTheme: boolean;
  typography: Typography;
};
