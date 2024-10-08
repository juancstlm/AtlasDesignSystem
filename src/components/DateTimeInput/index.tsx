import { useCallback, useEffect, useState } from "react";
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

export const DateTimeInput = ({
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
              style={styles.iconRight}
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
      >
        <DateTimePicker
          value={date}
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
        <Button
          text="Save"
          onPress={() => {
            onSave?.(date);
            setDateSheetOpen(false);
          }}
        />
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
          itemContainer: {
            backgroundColor: t.colors.backgroundOnPrimary,
            borderRadius: t.borderRadius,
            paddingHorizontal: t.size.baseSize * 2,
            minHeight: t.size.baseSize * 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: t.colors.backgroundOnPrimary,
            borderWidth: t.borderWidth,
            height: t.size.baseSize * 9,
          },
          itemContainerError: {
            borderColor: t.colors.foregroundNegative,
          },
          itemContainerFocused: {
            borderColor: t.colors.border,
          },
          itemLabel: {
            color: t.textPrimary,
          },
          labelContainer: {
            left: t.size.baseSize * 2,
            position: "absolute",
          },
          label: {
            color: !disabled
              ? t.colors.foreground
              : t.colors.foregroundLowContrast,
            ...t.typography.p1,
          },
          iconRight: {},
          value: {
            paddingHorizontal: t.size.baseSize * 0,
          },
        }),
      [disabled]
    )
  );
