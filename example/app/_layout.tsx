import { Stack } from "expo-router";

import { ThemeProvider } from "@/common/theme/Provider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ title: "Tabs", headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}
