import { useThemedStyle, SegmentedControl } from "atlas-design-system";
import React, { useState, useCallback } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

export default function SegmentedControlGallery() {
  const styles = useStyles().styles;
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <SegmentedControl
          label="Segmented Control"
          onChange={(option) => {
            setSelectedIndex(option.value);
          }}
          options={[
            { label: "First", value: 0, selected: selectedIndex === 0 },
          ]}
        />
        <SegmentedControl
          label="Segmented Control"
          onChange={(option) => {
            setSelectedIndex(option.value);
          }}
          options={[
            { label: "First", value: 0, selected: selectedIndex === 0 },
            { label: "Second", value: 1, selected: selectedIndex === 1 },
          ]}
        />
        <SegmentedControl
          label="Segmented Control"
          onChange={(option) => {
            setSelectedIndex(option.value);
          }}
          options={[
            { label: "First", value: 0, selected: selectedIndex === 0 },
            { label: "Second", value: 1, selected: selectedIndex === 1 },
            { label: "Third", value: 2, selected: selectedIndex === 2 },
          ]}
        />
        <SegmentedControl
          label="Segmented Control"
          onChange={(option) => {
            setSelectedIndex(option.value);
          }}
          options={[
            { label: "First", value: 0, selected: selectedIndex === 0 },
            { label: "Second", value: 1, selected: selectedIndex === 1 },
            { label: "Third", value: 2, selected: selectedIndex === 2 },
            { label: "Fourth", value: 3, selected: selectedIndex === 3 },
          ]}
        />
        <SegmentedControl
          label="Segmented Control No Options"
          options={[]}
          onChange={(option) => {
            setSelectedIndex(0);
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
          section: {
            rowGap: t.size.baseSize * 3,
          },
          container: {
            rowGap: t.size.baseSize * 4,
            paddingVertical: t.size.baseSize * 4,
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
