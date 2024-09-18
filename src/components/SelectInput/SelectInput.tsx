import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import IonIcons from "react-native-vector-icons/Ionicons";

import Text from "../Text";
import Sheet from "../Sheet";
import { MenuItemDescription } from "../MenuItemDescription";
import { useThemedStyle } from "../../hooks";
import { Option } from "./types";
import { useInputFieldAnimatedBorder } from "../../hooks/useInputFieldAnimatedBorder";
import { DEFAULT_TIMING_CONFIG } from "../../constants/animations";

export type SelectInputProps<T> = {
  caption?: string;
  label: string;
  options: Option<T>[];
  onChange: (newValue: Option<T>) => void;
  error?: string;
};

export function SelectInput<T>({
  caption,
  label,
  options = [],
  onChange,
  error,
}: SelectInputProps<T>) {
  const { styles } = useStyles();

  const values = useMemo(() => {
    return options.filter((v) => v.selected);
  }, options);

  const [sheetOpen, setSheetOpen] = useState(false);

  const animatedValue = useSharedValue(values.length ? 1 : 0);
  const rotation = useSharedValue(sheetOpen ? 1 : 0);
  const { animatedBorderStyle, setBorderColor } = useInputFieldAnimatedBorder(styles.itemContainer.borderColor)

  useEffect(() => {
    if (error) {
      setBorderColor(styles.itemContainerError.borderColor)
      return;
    } 
    setBorderColor(sheetOpen ? styles.itemContainerFocused.borderColor : styles.itemContainer.borderColor)
  }, [error, sheetOpen])

  useEffect(() => {
    rotation.value = withTiming(sheetOpen ? 1 : 0, DEFAULT_TIMING_CONFIG);
  }, [sheetOpen]);

  useEffect(() => {
    animatedValue.value = values.length ? 1 : 0;
  }, [values.length]);

  const animatedLabelStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(animatedValue.value, [0, 1], [1, -8]) },
      ],
      fontSize: interpolate(animatedValue.value, [0, 1], [14, 10]),
    };
  }, []);

  const animatedValueStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [{ translateY: animatedValue.value * 6 }],
    };
  }, [animatedValue]);

  const animatedChevronStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateX: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` },
      ],
    };
  }, [rotation]);

  const handleOptionPress = (option: Option<T>) => {
    onChange(option);
    setSheetOpen(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setSheetOpen(true)}>
        <Animated.View style={[styles.itemContainer, animatedBorderStyle]}>
          <View pointerEvents="none" style={styles.labelContainer}>
            <Animated.Text style={[styles.label, animatedLabelStyles]}>
              {label}
            </Animated.Text>
          </View>
          <Animated.View style={animatedValueStyle}>
            {!!values.length && (
              <Text contrast="low" style={styles.value}>
                {values[0].label}
              </Text>
            )}
          </Animated.View>
          <Animated.View style={animatedChevronStyle}>
            <IonIcons
              style={styles.chevron}
              name="chevron-down-outline"
              size={20}
            />
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
      {!!caption && <MenuItemDescription description={caption} />}
      <Sheet open={sheetOpen} setOpen={setSheetOpen} header={label}>
        {options.map((option, i) => (
          <TouchableOpacity
            style={[
              styles.selectionItem,
              option.selected && styles.selectedSelectionItem,
            ]}
            key={i}
            onPress={() => handleOptionPress(option)}
          >
            <Text contrast={option.selected ? "high" : "low"}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </Sheet>
    </>
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
          selectedSelectionItem: {
            borderColor: theme.colors.primary,
          },
          selectionItem: {
            alignItems: "center",
            borderWidth: theme.borderWidth,
            borderColor: theme.colors.border,
            marginBottom: theme.size.baseSize * 2,
            padding: theme.size.baseSize * 2,
            borderRadius: theme.borderRadius,
          },
          itemContainer: {
            borderWidth: theme.borderWidth,
            borderColor: theme.colors.backgroundPrimary,
            backgroundColor: theme.colors.backgroundOnPrimary,
            marginBottom: theme.size.baseSize * 2,
            borderRadius: theme.borderRadius,
            minHeight: theme.size.baseSize * 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
            color: theme.text,
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
