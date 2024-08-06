import { StyleSheet } from 'react-native';
import { useCallback } from 'react';

import { useThemedStyle } from '../../../hooks';

export const useButtonStyles = () =>
  useThemedStyle(
    useCallback(
      theme =>
        StyleSheet.create({
          default: {
            borderRadius: theme.borderRadius,
            justifyContent: 'center',
            backgroundColor: theme.colors.primary,
            paddingHorizontal: theme.size.baseSize * 4,
            paddingVertical: theme.size.baseSize * 2,
            textAlign: 'center',
          },
          destructiveContainer: {
            borderRadius: theme.borderRadius,
            justifyContent: 'center',
            paddingHorizontal: theme.size.baseSize * 4,
            paddingVertical: theme.size.baseSize * 2,
            textAlign: 'center',
            backgroundColor: theme.colors.secondaryNegative,
          },
          destructiveText: {
            textAlign: 'center',
            color: theme.colors.backgroundPrimary,
          },
          defaultText: {
            textAlign: 'center',
            color: theme.colors.foregroundOnPrimary,
          },
          disabled: {
            backgroundColor: theme.colors.primaryLowContrast,
          },
          disabledText: {
            color: theme.colors.foregroundOnPrimary,
          },
        }),
      []
    )
  );
