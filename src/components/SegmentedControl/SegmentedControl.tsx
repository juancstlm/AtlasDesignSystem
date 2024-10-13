import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Pressable,
} from "react-native";
import { Text } from "../Text";
import { Option } from "../SelectInput/types";
import { useThemedStyle } from "../../hooks";
import { useCallback } from "react";
import { FieldError } from "../FieldError/FieldError";
import { MenuItemDescription } from "../MenuItemDescription";

export type SegmentedControlProps<T> = {
  label: string;
  options: Option<T>[];
  silenceWarning?: boolean;
  error?: string;
  caption?: string;
  onChange: (newValue: Option<T>) => void;
};
export function SegmentedControl<T>({
  label,
  options = [],
  silenceWarning,
  error,
  caption,
  onChange,
}: SegmentedControlProps<T>) {
  const styles = useStyles().styles;

  if (options.length > 4 && !silenceWarning) {
    console.warn(
      "SegmentedControl should have 4 or fewer options, consider using a SelectInput instead"
    );
  }

  return (
    <View style={styles.container}>
      <Text numberOfLines={1}>{label}</Text>
      <View style={styles.contentContainer}>
        {!options.length && <Text>No options</Text>}
        {options.map((option, index, list) => {
          const optionStyle: StyleProp<ViewStyle>[] = [styles.optionContainer];
          if (index === 0) {
            optionStyle.push(styles.firstOptionContainer);
          }
          if (index === list.length - 1) {
            optionStyle.push(styles.lastOptionContainer);
          }
          if (option.selected) {
            optionStyle.push(styles.selectedOptionContainer);
          }
          return (
            <Pressable
              onPress={() => {
                onChange(option);
              }}
              style={optionStyle}
              key={option.value + option.label}
            >
              <Text
                style={option.selected ? styles.selectedOptionText : undefined}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {!!error && <FieldError error={error} />}
      {!!caption && <MenuItemDescription description={caption} />}
    </View>
  );
}

export default SegmentedControl;

function scaleBorderRadius(originalRadius: number, originalSize: number, newSize: number) {
    if (originalSize === 0) {
      throw new Error("Original size cannot be zero.");
    }
  
    const scalingFactor = newSize / originalSize;
    const newRadius = originalRadius * scalingFactor;
    return newRadius;
  }

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {},
          contentContainer: {
            marginTop: t.size.baseSize,
            flexDirection: "row",
            backgroundColor: t.colors.backgroundOnPrimary,
            height: t.size.baseSize * 9,
            borderRadius: t.borderRadius,
            alignItems: "center",
            justifyContent: "center",
            columnGap: t.borderWidth * 2,
          },
          optionContainer: {
            flex: 1,
            backgroundColor: `${t.colors.backgroundPrimary}90`,
            borderRadius: scaleBorderRadius(t.borderRadius, t.size.baseSize * 9, t.size.baseSize * 7.5),
            height: t.size.baseSize * 7.5,
            justifyContent: "center",
            alignItems: "center",
            // borderWidth: t.borderWidth,
            // borderColor: t.colors.backgroundOnPrimary,
          },
          firstOptionContainer: {
            marginLeft: t.borderWidth * 2,
          },
          lastOptionContainer: {
            marginRight: t.borderWidth * 2,
          },
          selectedOptionContainer: {
            backgroundColor: t.colors.primary,
            // borderWidth: t.borderWidth,
            borderColor: t.colors.primary,
          },
          selectedOptionText: {
            color: t.colors.foregroundOnPrimary,
          },
        }),
      []
    )
  );
