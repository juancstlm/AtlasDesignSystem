import { useCallback } from "react";
import { Pressable, View, StyleSheet } from "react-native";

import { useThemedStyle } from "../../hooks";
import { Option } from "../SelectInput/types";
import { Text } from "../Text";
export type CheckboxOptionItemProps<T> = {
  option: Option<T>;
  disabled?: boolean;
  onPress?: (value: T) => void;
  renderItem?: (option: Option<T>) => React.ReactNode;
};
export default function CheckboxOptionItem<T>({
  option,
  onPress,
  renderItem,
  disabled,
}: CheckboxOptionItemProps<T>) {
  const { label, selected } = option;
  const styles = useStyles(selected).styles;

  return (
    <Pressable
      onPress={() => onPress?.(option.value)}
      style={styles.itemContainer}
      disabled={disabled}
    >
      <View style={styles.itemContent}>
        <View style={styles.checkboxContainer}>
          {selected && <View style={styles.checkbox} />}
        </View>
        {!renderItem && <Text>{label}</Text>}
        {renderItem && renderItem(option)}
      </View>
    </Pressable>
  );
}

const useStyles = (selected: boolean) =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          itemContainer: {
            paddingVertical: t.size.baseSize * 2,
            paddingHorizontal: t.size.baseSize * 4,
          },
          itemContent: {
            flexDirection: "row",
            alignItems: "center",
            gap: t.size.baseSize * 2,
          },
          checkboxContainer: {
            width: t.size.baseSize * 4,
            height: t.size.baseSize * 4,
            borderRadius: t.size.baseSize * 1,
            borderWidth: t.size.baseSize / 2,
            borderColor: selected ? t.colors.primary : t.colors.border,
            justifyContent: "center",
            alignItems: "center",
          },
          checkbox: {
            width: t.size.baseSize * 2,
            height: t.size.baseSize * 2,
            backgroundColor: selected ? t.colors.primary : undefined,
          },
        }),
      [selected]
    )
  );
