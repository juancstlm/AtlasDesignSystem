import React, { useCallback } from 'react';
import { StyleProp, StyleSheet, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

import { TypographyStyles, TypographyVariants } from '../../types/typography';
import { useThemedStyle } from '../../hooks';

type TextContrast = 'high' | 'medium' | 'low';
type TextStatus = 'error' | 'informative' | 'warning' | 'success';

export interface TextProps extends RNTextProps {
  status?: TextStatus;
  category?: TypographyVariants;
  contrast?: TextContrast;
  style?: StyleProp<TextStyle>;
}

const getFontStyle = ({ fontFamily, fontSize, fontWeight, lineHeight }: TypographyStyles): TextStyle => {
  return {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
  };
};

export const Text = ({ category = 'p1', contrast, style, status, ...rest }: TextProps) => {
  const { styles } = useStyles(category, contrast, status);
  return <RNText style={[styles.fontStyle, styles.colorStyle, style]} {...rest} />;
};

export default Text;

const useStyles = (category: TypographyVariants, contrast: TextContrast = 'high', status?: TextStatus) =>
  useThemedStyle(
    useCallback(
      theme => {
        let color = theme.colors.foregroundHighContrast;
        if (contrast) {
          if (contrast === 'medium') {
            color = theme.colors.foreground;
          } else if (contrast === 'low') {
            color = theme.colors.foregroundLowContrast;
          }
        }
        if (status) {
          if (status) {
            switch (status) {
              case 'error':
                color = theme.colors.secondaryNegative;
                break;
              case 'informative':
                color = theme.colors.primary;
                break;
              case 'warning':
                color = theme.colors.secondaryWarning;
                break;
              case 'success':
                color = theme.colors.secondaryPositive;
                break;
              default:
                break;
            }
          }
        }
        return StyleSheet.create({
          colorStyle: {
            color,
          },
          fontStyle: getFontStyle(theme.typography[category]),
        });
      },
      [category, contrast, status]
    )
  );
