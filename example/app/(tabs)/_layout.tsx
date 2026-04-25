import { Tabs } from "expo-router";
import { TitleBar, useTheme } from "atlas-design-system";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: theme.colors.foregroundHighContrast,
      }}
    >
      <Tabs.Screen
        name="(gallery)"
        options={{
          headerShown: false,
          title: "Gallery",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
