import { useMemo, useState } from "react";
import { ThemeContext } from "atlas-design-system";
import {
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";

import { getThemeFromId, ThemeIdContext } from ".";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState<"light" | "dark">("light");

  const theme = useMemo(() => {
    return getThemeFromId(id);
  }, [id]);

  const navigationTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: theme.colors.backgroundPrimary,
        primary: theme.colors.primary,
        text: theme.colors.foreground,
        border: theme.colors.border,
      },
    }),
    [theme]
  );

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <ThemeContext.Provider value={theme}>
        <ThemeIdContext.Provider value={{ id, setId }}>
          {children}
        </ThemeIdContext.Provider>
      </ThemeContext.Provider>
    </NavigationThemeProvider>
  );
};
