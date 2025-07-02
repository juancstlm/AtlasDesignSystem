import { Tabs } from "expo-router";
import { TitleBar } from "atlas-design-system";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(gallery)"
        options={{ headerShown: false, title: "Gallery" }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          header: ({ options, navigation }) => (
            <TitleBar
              title={options.title}
              canGoBack={navigation.canGoBack()}
              onBackPressed={() => {
                navigation.goBack();
              }}
            />
          ),
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
