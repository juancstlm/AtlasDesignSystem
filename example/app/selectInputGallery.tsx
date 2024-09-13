import { useState, useCallback, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { useThemedStyle, SelectInput, Option } from "atlas-design-system";

export default function SelectInputGallery() {
  const styles = useStyles().styles;

  const [selectedOption, setSelectedOption] = useState<Option<string>>();
  const [selectedOption2, setSelectedOption2] = useState<Option<string>>();

  const error = useMemo(() => {
    if(!selectedOption2) {
      return "Must Select A Value"
    }
    return;
  }, [selectedOption2])

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
      <SelectInput
        error={error}
        options={[
          {
            value: "almond",
            label: "Almond",
            selected: selectedOption2?.value === "almond",
          },
          {
            value: "honey",
            label: "Honey",
            selected: selectedOption2?.value === "honey",
          },
        ]}
        onChange={setSelectedOption2}
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
