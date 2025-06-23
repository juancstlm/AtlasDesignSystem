import React, { useCallback, useEffect, useMemo } from "react";
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
import { MenuItemDescription } from "../MenuItemDescription";
import { CheckboxOptionItem } from "../CheckboxOptionItem";
import Button from "../Button";

type CheckboxOptionInputProps<T> = {
  caption?: string;
  label: string;
  options: Option<T>[];
  onChange: (newValues: T[]) => void;
  renderOption?: (
    option: Option<T>,
    onPress: (option: Option<T>) => void
  ) => React.ReactNode;
  renderValues?: (option?: Option<T>[]) => React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
};
export function CheckboxOptionInput<T>({
  caption,
  label,
  options = [],
  onChange,
  renderOption,
  renderValues,
  containerStyle = {},
  placeholder = "No Option selected",
}: CheckboxOptionInputProps<T>) {
  const styles = useStyles().styles;
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const selectedOptions = useMemo(() => {
    if (!options) return [];
    return options.filter((v) => v.selected);
  }, [options]);

  const [values, setValues] = React.useState<T[]>(
    selectedOptions.map((v) => v.value)
  );

  const handleOptionPress = useCallback(
    (option: Option<T>) => {
      if (values.find((v) => v === option.value)) {
        setValues(values.filter((v) => v !== option.value));
      } else {
        setValues([...values, option.value]);
      }
    },
    [values]
  );

  const handleSave = useCallback(() => {
    onChange(values);
    setSheetOpen(false);
  }, [values]);

  useEffect(() => {
    setValues(selectedOptions.map((v) => v.value));
  }, [sheetOpen]);

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <Text>{label}</Text>
        <TouchableOpacity
          onPress={() => setSheetOpen(true)}
          style={styles.valueDisplayContainer}
        >
          {!renderValues && selectedOptions.length === 0 && (
            <Text contrast="low">{placeholder}</Text>
          )}
          {!renderValues && selectedOptions.length > 0 && (
            <Text>{selectedOptions.map((v) => v.label).join(", ")}</Text>
          )}
          {renderValues && renderValues(selectedOptions)}
          <Chevron direction={sheetOpen ? "up" : "down"} />
        </TouchableOpacity>
        {!!caption && <MenuItemDescription description={caption} />}
      </View>
      <Sheet
        header={label}
        open={sheetOpen}
        setOpen={setSheetOpen}
        footer={<Button text="Save" onPress={handleSave} />}
      >
        {options.map((option) => {
          return renderOption ? (
            renderOption(option, handleOptionPress)
          ) : (
            <CheckboxOptionItem
              option={{
                ...option,
                selected: !!values.find((v) => v === option.value),
              }}
              onPress={() => handleOptionPress(option)}
              key={option.label}
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
          container: {},
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

export default CheckboxOptionInput;
