import { Stack } from "expo-router";

import { ThemeContext, ATLAS_LIGHT, TitleBar } from "atlas-design-system";

export default function RootLayout() {
  return (
    <ThemeContext.Provider value={ATLAS_LIGHT}>
      <Stack
        screenOptions={{
          header: ({ options, navigation }) => (
            <TitleBar
              title={options.title}
              canGoBack={navigation.canGoBack()}
              onBackPressed={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: "Components" }} />
        <Stack.Screen name="dateTimeInputGallery" options={{ title: "Date Time Input" }} />
        <Stack.Screen name="textInputGallery" options={{ title: "Text Input" }} />
        <Stack.Screen name="switchToggleInputGallery" options={{ title: "Switch Toggle" }} />
        <Stack.Screen name="textGallery" options={{ title: "Text" }} />
        <Stack.Screen name="buttonGallery" options={{ title: "Button" }} />
        <Stack.Screen name="sheetGallery" options={{ title: "Sheet" }} />
        <Stack.Screen name="selectInputGallery" options={{ title: "Select Input" }} />
        <Stack.Screen name="navigationListRowGallery" options={{ title: "Navigation Row" }} />
      </Stack>
    </ThemeContext.Provider>
  );
}
