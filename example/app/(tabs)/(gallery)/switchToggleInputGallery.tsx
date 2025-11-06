import { useState, useCallback, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SwitchToggle, useThemedStyle } from "atlas-design-system";

export default function DateTimeInputGallery() {
  const styles = useStyles().styles;
  const [value, setValue] = useState<boolean>();

  const error = useMemo(() => {
    if (value == undefined) {
      return "Must toggle this field";
    }
    return;
  }, [value]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SwitchToggle value={value} onChange={setValue} label="Switch Toggle" />
      <SwitchToggle
        value={value}
        onChange={setValue}
        label="Switch Toggle"
        caption="With Caption"
      />
      <SwitchToggle
        error={error}
        value={value}
        onChange={setValue}
        label="Switch Toggle"
      />
      <SwitchToggle
        value={value}
        onChange={setValue}
        label="A very long label that should wrapped in two lines"
        caption="With Caption"
      />
      <SwitchToggle
        value={value}
        onChange={setValue}
        label="An even longer label that should wrapp in two lines and be ellipsized at the end"
        caption="With Caption"
      />
    </ScrollView>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            paddingTop: t.size.baseSize * 4,
            rowGap: t.size.baseSize * 4,
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
