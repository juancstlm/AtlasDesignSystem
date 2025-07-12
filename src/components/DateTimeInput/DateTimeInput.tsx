import React, { useCallback, useEffect, useState, useRef } from "react";
import DateTimePicker, {
  IOSNativeProps,
  AndroidNativeProps,
} from "@react-native-community/datetimepicker";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import IonIcons from "react-native-vector-icons/Ionicons";
import moment from "moment";

import Sheet from "../Sheet";
import Text from "../Text";
import { MenuItemDescription } from "../MenuItemDescription";
import { useThemedStyle } from "../../hooks";
import Button from "../Button";
import { useInputFieldAnimatedBorder } from "../../hooks/useInputFieldAnimatedBorder";
import { FieldError } from "../FieldError/FieldError";
import {
  LABEL_INTERPOLATION_OUTPUT_RANGE,
  LABEL_INTERPOLATION_RANGE,
  ANIMATED_VALUE_TRANSLATE_Y_MULTIPLIER,
  DEFAULT_TIMING_CONFIG,
} from "../../constants/animations";
import { FIELD_HEIGHT_MULTIPLIER } from "../../constants";
import { useInputFieldFontSizeInterpolationOutputRange } from "../../hooks/useInputFieldFontSizeInterpolationOutputRange";

export type DateTimeInputProps = {
  label: string;
  caption?: string;
  value: Date;
  onChange?: (date: Date) => void;
  onSave?: (date: Date) => void;
  disabled?: boolean;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  mode?: IOSNativeProps["mode"] | AndroidNativeProps["mode"];
  error?: string;
  display?: IOSNativeProps["display"] | AndroidNativeProps["display"];
};

const getFormat = (mode?: DateTimeInputProps["mode"]) => {
  switch (mode) {
    case "date": {
      return "MMM D, YYYY";
    }
    case "time": {
      return "h:mm A";
    }
    case "datetime":
    default: {
      return "MMM D, YYYY  h:mm A";
    }
  }
};

const DateTimeInput = ({
  value,
  onChange,
  testID,
  containerStyle,
  label,
  caption,
  mode = "date",
  error,
  disabled = false,
  onSave,
}: DateTimeInputProps) => {
  const { styles, theme } = useStyles(disabled);
  const [dateSheetOpen, setDateSheetOpen] = useState(false);
  const [date, setDate] = useState(value);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (dateSheetOpen) {
      return;
    }

    setDate(value);
  }, [dateSheetOpen, value]);

  const animatedValue = useSharedValue(value ? 1 : 0);
  const { animatedBorderStyle, setBorderColor } = useInputFieldAnimatedBorder(
    styles.itemContainer.borderColor
  );

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

  useEffect(() => {
    if (error) {
      setBorderColor(styles.itemContainerError.borderColor);
      return;
    }
    setBorderColor(
      dateSheetOpen
        ? styles.itemContainerFocused.borderColor
        : styles.itemContainer.borderColor
    );
  }, [error, dateSheetOpen]);

  const labelFontSizeInterpolationOutputRange =
    useInputFieldFontSizeInterpolationOutputRange();

  const animatedLabelStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedValue.value,
            LABEL_INTERPOLATION_RANGE,
            LABEL_INTERPOLATION_OUTPUT_RANGE
          ),
        },
      ],
      fontSize: interpolate(
        animatedValue.value,
        LABEL_INTERPOLATION_RANGE,
        labelFontSizeInterpolationOutputRange
      ),
    };
  }, [labelFontSizeInterpolationOutputRange]);

  const animatedValueStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [
        {
          translateY:
            animatedValue.value * ANIMATED_VALUE_TRANSLATE_Y_MULTIPLIER,
        },
      ],
    };
  });

  return (
    <>
      <View testID={testID} style={[styles.container, containerStyle]}>
        <TouchableOpacity
          onPress={() => setDateSheetOpen(true)}
          disabled={disabled}
        >
          <Animated.View style={[styles.itemContainer, animatedBorderStyle]}>
            <View pointerEvents="none" style={styles.labelContainer}>
              <Animated.Text style={[styles.label, animatedLabelStyles]}>
                {label}
              </Animated.Text>
            </View>
            <Animated.View style={animatedValueStyle}>
              <Text contrast="low" style={styles.value}>
                {moment(value).format(getFormat(mode)).toString()}
              </Text>
            </Animated.View>
            <IonIcons
              color={
                !disabled
                  ? theme.colors.foreground
                  : theme.colors.foregroundLowContrast
              }
              name={mode === "time" ? "time-outline" : "calendar-outline"}
              size={20}
            />
          </Animated.View>
        </TouchableOpacity>
        {!!error && <FieldError error={error} />}
        {!!caption && <MenuItemDescription description={caption} />}
      </View>
      <Sheet
        disableScroll
        header={label}
        open={dateSheetOpen}
        setOpen={setDateSheetOpen}
        footerPadding={70}
        footer={
          <Button
            text="Save"
            onPress={() => {
              onSave?.(date);
              setDateSheetOpen(false);
            }}
          />
        }
      >
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={date}
            style={styles.datePicker}
            mode={mode}
            themeVariant={theme.isDarkTheme ? "dark" : "light"}
            display="spinner"
            onChange={(_, newDate) => {
              if (!newDate) {
                return;
              }
              setDate(newDate);
              onChange?.(newDate);
            }}
          />
        </View>
      </Sheet>
    </>
  );
};

export default DateTimeInput;

const useStyles = (disabled: boolean) =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {},
          pickerContainer: {
            justifyContent: "center",
            alignItems: "center",
            height: t.size.baseSize * 40,
          },
          datePicker: {
            flex: 1,
          },
          itemContainer: {
            backgroundColor: t.colors.backgroundOnPrimary,
            borderRadius: t.borderRadius,
            paddingHorizontal: t.size.baseSize * 2,
            minHeight: t.size.baseSize * FIELD_HEIGHT_MULTIPLIER,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: t.colors.backgroundOnPrimary,
            borderWidth: t.borderWidth,
            height: t.size.baseSize * FIELD_HEIGHT_MULTIPLIER,
          },
          itemContainerError: {
            borderColor: t.colors.foregroundNegative,
          },
          itemContainerFocused: {
            borderColor: t.colors.border,
          },
          labelContainer: {
            left: t.size.baseSize * 2,
            position: "absolute",
          },
          label: {
            color: !disabled
              ? t.colors.foregroundHighContrast
              : t.colors.foregroundLowContrast,
            ...t.typography.p1,
          },
          value: {
            paddingHorizontal: t.size.baseSize * 0,
          },
        }),
      [disabled]
    )
  );
