import React, { useCallback, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useThemedStyle } from "../../hooks";
import { Option } from "../SelectInput/types";
import Sheet from "../Sheet";
import Text from "../Text";
import Chevron from "../Chevron";
import RadioOptionItem from "../RadioOptionItem";
import { MenuItemDescription } from "../MenuItemDescription";

type RadioOptionInputProps<T> = {
  caption?: string;
  label: string;
  options: Option<T>[];
  onChange: (newValue: Option<T>) => void;
  renderOption?: (
    option: Option<T>,
    onPress: (option: Option<T>) => void
  ) => React.ReactNode;
  renderValue?: (option?: Option<T>) => React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};
export function RadioOptionInput<T>({
  caption,
  label,
  options = [],
  onChange,
  renderOption,
  renderValue,
  containerStyle = {},
}: RadioOptionInputProps<T>) {
  const styles = useStyles().styles;
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const value = useMemo(() => {
    return options.find((v) => v.selected);
  }, [options]);

  const handleOptionPress = useCallback((option: Option<T>) => {
    onChange(option);
    setSheetOpen(false);
  }, []);

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <Text>{label}</Text>
        <TouchableOpacity
          onPress={() => setSheetOpen(true)}
          style={styles.valueDisplayContainer}
        >
          {!renderValue && <Text>{value?.label}</Text>}
          {renderValue && renderValue(value)}
          <Chevron direction={sheetOpen ? "up" : "down"} />
        </TouchableOpacity>
        {!!caption && <MenuItemDescription description={caption} />}
      </View>
      <Sheet header={label} open={sheetOpen} setOpen={setSheetOpen}>
        {options.map((option) => {
          return renderOption ? (
            renderOption(option, onChange)
          ) : (
            <RadioOptionItem
              option={option}
              onPress={() => handleOptionPress(option)}
              key={option.value as string}
            />
          );
        })}
      </Sheet>
    </>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            // paddingVertical: t.size.baseSize * 4,
          },
          chevron: {
            paddingRight: t.size.baseSize * 2,
            color: t.colors.foreground,
          },
          valueDisplayContainer: {
            marginTop: t.size.baseSize * 1,
            flexDirection: "row",
            alignItems: "center",
            gap: t.size.baseSize * 2,
          },
        }),
      []
    )
  );

export default RadioOptionInput;
