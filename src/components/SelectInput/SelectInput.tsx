import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Text from "../Text";
import Sheet from "../Sheet";
import { MenuItemDescription } from "../MenuItemDescription";
import { useThemedStyle } from "../../hooks";
import { useInputFieldAnimatedBorder } from "../../hooks/useInputFieldAnimatedBorder";
import Chevron from "../Chevron";
import {
  DEFAULT_TIMING_CONFIG,
  LABEL_INTERPOLATION_OUTPUT_RANGE,
  LABEL_INTERPOLATION_RANGE,
} from "../../constants/animations";

import { Option } from "./types";
import SelectionItem from "./components/SelectionItem";

export type SelectInputProps<T> = {
  caption?: string;
  label: string;
  options: Option<T>[];
  onChange: (newValue: Option<T>) => void;
  error?: string;
  renderOption?: (
    option: Option<T>,
    onPress: (option: Option<T>) => void
  ) => React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export function SelectInput<T>({
  caption,
  label,
  options = [],
  onChange,
  error,
  renderOption,
  containerStyle,
}: SelectInputProps<T>) {
  const styles = useStyles().styles;

  const value = useMemo(() => {
    return options.find((v) => v.selected);
  }, [options]);

  const [sheetOpen, setSheetOpen] = useState(false);
  const isInitialMount = useRef(true);

  const animatedValue = useSharedValue(0);
  const { animatedBorderStyle, setBorderColor } = useInputFieldAnimatedBorder(
    styles.itemContainer.borderColor
  );

  useEffect(() => {
    if (error) {
      setBorderColor(styles.itemContainerError.borderColor);
      return;
    }
    setBorderColor(
      sheetOpen
        ? styles.itemContainerFocused.borderColor
        : styles.itemContainer.borderColor
    );
  }, [
    error,
    sheetOpen,
    styles.itemContainerFocused.borderColor,
    styles.itemContainer.borderColor,
  ]);

  useEffect(() => {
    if (isInitialMount.current) {
      // skip animation on initial mount we already have the value
      isInitialMount.current = false;
      animatedValue.value = value ? 1 : 0;
      return;
    } else {
      // After initial mount, animate the value changes
      animatedValue.value = withTiming(value ? 1 : 0, DEFAULT_TIMING_CONFIG);
    }
  }, [value]);

  const animatedLabelStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedValue.value,
            LABEL_INTERPOLATION_RANGE,
            LABEL_INTERPOLATION_OUTPUT_RANGE,
            Extrapolation.CLAMP
          ),
        },
      ],
      fontSize: interpolate(
        animatedValue.value,
        [0, 1],
        [14, 10],
        Extrapolation.CLAMP
      ),
    };
  }, []);

  const animatedValueStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [{ translateY: animatedValue.value * 7 }],
    };
  }, [animatedValue]);

  const handleOptionPress = useCallback((option: Option<T>) => {
    onChange(option);
    setSheetOpen(false);
  }, []);

  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={() => setSheetOpen(true)}>
        <Animated.View style={[styles.itemContainer, animatedBorderStyle]}>
          <View pointerEvents="none" style={styles.labelContainer}>
            <Animated.Text style={[styles.label, animatedLabelStyles]}>
              {label}
            </Animated.Text>
          </View>
          <Animated.View style={animatedValueStyle}>
            {!!value && (
              <Text contrast="low" style={styles.value}>
                {value.label}
              </Text>
            )}
          </Animated.View>
          <Chevron direction={sheetOpen ? "up" : "down"} />
        </Animated.View>
      </TouchableOpacity>
      {!!caption && <MenuItemDescription description={caption} />}
      <Sheet open={sheetOpen} setOpen={setSheetOpen} header={label}>
        {options.map((option, i) =>
          renderOption ? (
            renderOption(option, handleOptionPress)
          ) : (
            <TouchableOpacity
              onPress={() => handleOptionPress(option)}
              key={i + option.label}
            >
              <SelectionItem option={option} />
            </TouchableOpacity>
          )
        )}
      </Sheet>
    </View>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (theme) =>
        StyleSheet.create({
          chevron: {
            paddingRight: theme.size.baseSize * 2,
            color: theme.colors.foreground,
          },
          itemContainer: {
            borderWidth: theme.borderWidth,
            borderColor: theme.colors.backgroundOnPrimary,
            backgroundColor: theme.colors.backgroundOnPrimary,
            borderRadius: theme.borderRadius,
            minHeight: theme.size.baseSize * 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: theme.size.baseSize * 9,
          },
          itemContainerFocused: {
            borderColor: theme.colors.border,
          },
          itemContainerError: {
            borderColor: theme.colors.foregroundNegative,
          },
          labelContainer: {
            left: theme.size.baseSize * 2,
            position: "absolute",
          },
          label: {
            color: theme.colors.foregroundHighContrast,
            ...theme.typography.p1,
          },
          descriptionContainer: {
            marginHorizontal: theme.size.baseSize * 4,
            marginBottom: theme.size.baseSize * 2,
          },
          value: {
            paddingHorizontal: theme.size.baseSize * 2,
          },
        }),
      []
    )
  );

export default SelectInput;
