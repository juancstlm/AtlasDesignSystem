import { ScrollView, View, StyleSheet } from "react-native";
import { useThemedStyle, RadioOptionItem } from "atlas-design-system";
import { useCallback, useState } from "react";

const CustomItem = ({ color }: { color: string }) => {
  const styles = useStyles().styles;

  return <View style={[styles.item, { backgroundColor: color }]} />;
};

export default function RadioOptionGallery() {
  const styles = useStyles().styles;

  const [selection, setSelection] = useState("blue");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <RadioOptionItem
          option={{
            label: "Blue",
            value: "blue",
            selected: selection === "blue",
          }}
          onPress={setSelection}
        />
        <RadioOptionItem
          option={{
            label: "Red",
            value: "red",
            selected: selection === "red",
          }}
          onPress={setSelection}
        />
        <RadioOptionItem
          option={{
            label: "Salmon",
            value: "salmon",
            selected: selection === "salmon",
          }}
          onPress={setSelection}
          disabled
        />
        <RadioOptionItem
          option={{
            label: "Green",
            value: "green",
            selected: selection === "green",
          }}
          onPress={setSelection}
          renderItem={({ value }) => <CustomItem color={value} />}
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
            rowGap: t.size.baseSize * 2,
          },
          container: {
            rowGap: t.size.baseSize * 4,
            paddingVertical: t.size.baseSize * 4,
            paddingHorizontal: t.size.baseSize * 4,
          },
          item: {
            width: 24,
            height: 24,
          },
        }),
      []
    )
  );
