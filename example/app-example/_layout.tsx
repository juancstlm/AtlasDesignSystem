import { SplashScreen, Stack } from "expo-router";

// import { ATLAS_LIGHT, ThemeContext } from "atlas-design-system";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  return (
    // <ThemeContext.Provider value={ATLAS_LIGHT}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    // </ThemeContext.Provider>
  );
}
