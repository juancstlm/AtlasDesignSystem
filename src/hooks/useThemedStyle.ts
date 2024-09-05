import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

import useTheme from '../hooks/useTheme';
import { AtlasTheme } from '../types/theme';

export declare type ThemedStyleCreator<T extends StyleSheet.NamedStyles<unknown>> = (theme: AtlasTheme) => T;

export const useThemedStyle = <T extends StyleSheet.NamedStyles<unknown>>(creator: ThemedStyleCreator<T>) => {
  const theme = useTheme();

  const styles = useMemo(() => creator(theme), [theme, creator]);

  return {
    theme,
    styles,
  };
};
