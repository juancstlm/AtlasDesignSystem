import { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SwitchToggle, useThemedStyle } from "atlas-design-system";

import { useThemeId } from "@/common/theme";

export default function Settings() {
  const { id, setId } = useThemeId();

  const styles = useStyles().styles;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SwitchToggle
        label="Dark Mode"
        value={id === "dark"}
        onChange={(value) => {
          setId(value ? "dark" : "light");
        }}
      />
    </ScrollView>
  );
}

const useStyles = () => {
  const bottom = useSafeAreaInsets();
  return useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            paddingHorizontal: t.size.baseSize * 4,
            paddingBottom: bottom.bottom + t.size.baseSize * 4,
          },
        }),
      [bottom]
    )
  );
};
