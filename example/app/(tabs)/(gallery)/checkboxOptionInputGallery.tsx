import React, { useState, useCallback } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { CheckboxOptionInput, useThemedStyle } from "atlas-design-system";

export default function CheckboxOptionInputGallery() {
  const styles = useStyles().styles;

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <CheckboxOptionInput
          label="Select a color"
          options={[
            {
              selected: selectedOptions.includes("blue"),
              label: "Blue",
              value: "blue",
            },
            {
              selected: selectedOptions.includes("red"),
              label: "Red",
              value: "red",
            },
            {
              selected: selectedOptions.includes("salmon"),
              label: "Salmon",
              value: "salmon",
            },
            {
              selected: selectedOptions.includes("green"),
              label: "Green",
              value: "green",
            },
          ]}
          caption="This determines your favorite color"
          onChange={(newValues) => {
            setSelectedOptions(newValues);
          }}
        />
      </View>
    </ScrollView>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            flexGrow: 1,
            padding: t.size.baseSize * 4,
          },
          section: {
            paddingVertical: t.size.baseSize * 4,
            gap: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
