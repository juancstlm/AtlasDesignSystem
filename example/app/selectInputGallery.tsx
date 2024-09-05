import { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { useThemedStyle, SelectInput, Option } from "atlas-design-system";

export default function selectInputGallery() {
  const styles = useStyles().styles;

  const [selectedOption, setSelectedOption] = useState<Option>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SelectInput
        options={[
          {
            value: "almond",
            label: "Almond",
            selected: selectedOption?.value === "almond",
          },
          {
            value: "honey",
            label: "Honey",
            selected: selectedOption?.value === "honey",
          },
        ]}
        onChange={setSelectedOption}
        label="Select One"
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
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
