import React, { useState, useCallback } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

import { RadioOptionInput, useThemedStyle, Text } from "atlas-design-system";
import CustomItem from "@/components/CustomView";

export default function RadioOptionInputGallery() {
  const styles = useStyles().styles;

  const [selection, setSelection] = useState("blue");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <RadioOptionInput
          label="Select a color"
          options={[
            { label: "Blue", value: "blue", selected: selection === "blue" },
            { label: "Red", value: "red", selected: selection === "red" },
            {
              label: "Salmon",
              value: "salmon",
              selected: selection === "salmon",
            },
            { label: "Green", value: "green", selected: selection === "green" },
          ]}
          caption="This determines your favorite color"
          onChange={({ value }) => setSelection(value)}
        />
        <RadioOptionInput
          label="Select a color"
          options={[
            { label: "Blue", value: "blue", selected: selection === "blue" },
            { label: "Red", value: "red", selected: selection === "red" },
            {
              label: "Salmon",
              value: "salmon",
              selected: selection === "salmon",
            },
            { label: "Green", value: "green", selected: selection === "green" },
          ]}
          caption="This determines your favorite color"
          onChange={({ value }) => setSelection(value)}
          renderValue={(option) => {
            if (!option) return <Text>{"No Option selected"}</Text>;
            return option && <CustomItem color={option.value} />;
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
