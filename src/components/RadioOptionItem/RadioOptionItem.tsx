import { useCallback } from "react";
import { Pressable, View, StyleSheet } from "react-native";

import Text from "../Text";

import { useThemedStyle } from "../../hooks";
import { Option } from "../SelectInput/types";

export type RadioOptionItemProps<T> = {
  option: Option<T>;
  disabled?: boolean;
  onPress?: (value: T) => void;
  renderItem?: (option: Option<T>) => React.ReactNode;
};

export function RadioOptionItem<T>({
  option,
  onPress,
  renderItem,
  disabled,
}: RadioOptionItemProps<T>) {
  const { label, value, selected } = option;
  const styles = useStyles(selected).styles;

  return (
    <Pressable
      onPress={() => onPress?.(value)}
      style={styles.itemContainer}
      disabled={disabled || !onPress}
    >
      <View style={styles.itemContent}>
        <View
          style={[
            styles.radioContainer,
            disabled && styles.radioContainerDisabled,
          ]}
        >
          {selected && <View style={styles.radio} />}
        </View>
        {!renderItem && (
          <Text contrast={disabled ? "low" : "high"}>{label}</Text>
        )}
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
          radioContainer: {
            width: t.size.baseSize * 4,
            height: t.size.baseSize * 4,
            borderRadius: t.size.baseSize * 2,
            borderWidth: t.borderWidth,
            borderColor: selected ? t.colors.primary : t.colors.border,
            justifyContent: "center",
            alignItems: "center",
          },
          radioContainerDisabled: {
            borderColor: t.colors.backgroundOnPrimary,
          },
          radio: {
            width: t.size.baseSize * 2,
            height: t.size.baseSize * 2,
            borderRadius: t.size.baseSize,
            backgroundColor: t.colors.primary,
          },
        }),
      [selected]
    )
  );

export default RadioOptionItem;
