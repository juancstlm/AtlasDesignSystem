import { StyleSheet, View } from "react-native";
import { useCallback } from "react";

import { Text } from "../../Text";
import { useThemedStyle } from "../../../hooks";
import { Option } from "../types";

export type SelectionItemProps<T> = {
  option: Option<T>;
};
export default function SelectionItem<T>({ option }: SelectionItemProps<T>) {
  const styles = useStyles().styles;

  return (
    <View
      style={[
        styles.selectionItem,
        option.selected && styles.selectedSelectionItem,
      ]}
    >
      <Text contrast={option.selected ? "high" : "low"}>{option.label}</Text>
    </View>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          selectionItem: {
            alignItems: "center",
            borderWidth: t.borderWidth,
            borderColor: t.colors.border,
            marginBottom: t.size.baseSize * 2,
            padding: t.size.baseSize * 2,
            borderRadius: t.borderRadius,
          },
          selectedSelectionItem: {
            borderColor: t.colors.primary,
          },
        }),
      []
    )
  );
