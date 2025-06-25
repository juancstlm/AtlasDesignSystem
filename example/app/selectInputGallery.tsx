import { useState, useCallback, useMemo } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useThemedStyle, SelectInput, Option, Text } from "atlas-design-system";

import { getGalleryStyles } from "@/common";

export default function SelectInputGallery() {
  const styles = useStyles().styles;

  const [selectedOption, setSelectedOption] = useState<Option<string>>();
  const [selectedOption2, setSelectedOption2] = useState<Option<string>>();
  const [preSelectedOption, setPreSelectedOption] = useState<Option<string>>({
    value: "honey",
    label: "Honey",
    selected: true,
  });

  const error = useMemo(() => {
    if (!selectedOption2) {
      return "Must Select A Value";
    }
    return;
  }, [selectedOption2]);

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
        caption="With a caption"
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

      <Text>Pre-selected Option</Text>
      <SelectInput
        options={[
          {
            value: "almond",
            label: "Almond",
            selected: preSelectedOption?.value === "almond",
          },
          {
            value: "honey",
            label: "Honey",
            selected: preSelectedOption?.value === "honey",
          },
        ]}
        onChange={setPreSelectedOption}
        label="Pre-selected Example"
        caption="This starts with 'Honey' already selected"
      />

      <Text>Custom Option Render</Text>
      <SelectInput
        options={[
          {
            value: "almond",
            label: "🐶",
            selected: selectedOption?.value === "almond",
          },
          {
            value: "honey",
            label: "🍯",
            selected: selectedOption?.value === "honey",
          },
        ]}
        renderOption={(option, onPress) => {
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.customOption,
                option.selected && styles.customOptionSelected,
              ]}
              onPress={() => onPress(option)}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          );
        }}
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
          ...getGalleryStyles(t),
          customOption: {
            alignItems: "center",
            backgroundColor: "#ffa1aa23",
            paddingVertical: t.size.baseSize * 2,
            marginVertical: t.size.baseSize * 3,
          },
          customOptionSelected: {
            backgroundColor: "purple",
          },
        }),
      []
    )
  );
