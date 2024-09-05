import { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { SwitchToggle, useThemedStyle } from "atlas-design-system";

export default function DateTimeInputGallery() {
  const styles = useStyles().styles;
  const [value, setValue] = useState();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SwitchToggle value={value} onChange={setValue} label="Switch Toggle"/>
    </ScrollView>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            paddingTop: t.size.baseSize *4,
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
