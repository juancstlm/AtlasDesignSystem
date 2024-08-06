import { Stack } from "expo-router";

import { ThemeContext, ATLAS_LIGHT } from "atlas-design-system";

export default function RootLayout() {
  return (
    <ThemeContext.Provider value={ATLAS_LIGHT}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ThemeContext.Provider>
  );
}
