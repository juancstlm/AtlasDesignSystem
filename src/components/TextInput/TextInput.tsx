import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Text from "../Text";
import { MenuItemDescription } from "../MenuItemDescription";
import { useThemedStyle } from "../../hooks";
import { FieldError } from "../FieldError/FieldError";
import { useInputFieldAnimatedBorder } from "../../hooks/useInputFieldAnimatedBorder";
import {
  DEFAULT_TIMING_CONFIG,
  LABEL_INTERPOLATION_OUTPUT_RANGE,
  LABEL_INTERPOLATION_RANGE,
} from "../../constants/animations";

const getLabelStyle = (
  disabled: boolean,
  error: boolean,
  style: { default: TextStyle; error: TextStyle; disabled: TextStyle }
) => {
  if (disabled) {
    return style.disabled;
  } else if (error) {
    return style.error;
  }

  return style.default;
};

const getTextInputStyle = (
  disabled: boolean,
  error: boolean,
  style: { default: TextStyle; error: TextStyle; disabled: TextStyle }
) => {
  if (disabled) {
    return style.disabled;
  } else if (error) {
    return style.error;
  }

  return style.default;
};

export type TextInputProps = {
  disabled?: boolean;
  testId?: string;
  caption?: string;
  keyboardType?: KeyboardTypeOptions;
  onBlur?: (text: string) => void;
  value: string;
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
} & Omit<RNTextInputProps, "onBlur">;

export const TextInput = forwardRef(
  (
    {
      caption,
      keyboardType,
      onChangeText,
      testId,
      value,
      label,
      onBlur,
      containerStyle,
      disabled = false,
      error,
      multiline,
      numberOfLines,
      ...rest
    }: TextInputProps,
    ref
  ) => {
    const { styles, theme } = useStyles(disabled, !!error, !!multiline);

    const inputRef = useRef<RNTextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef?.current?.focus();
      },
      blur: () => {
        inputRef?.current?.blur();
      },
    }));

    const animatedValue = useSharedValue(0);
    const isInitialMount = useRef(true);
    const { animatedBorderStyle, setBorderColor } = useInputFieldAnimatedBorder(
      styles.itemContainer.borderColor
    );

    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        animatedValue.value = value ? 1 : 0;
      }
      if (inputRef.current?.isFocused()) {
        return;
      }

      if (!isInitialMount.current) {
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
              LABEL_INTERPOLATION_OUTPUT_RANGE
            ),
          },
        ],
        fontSize: interpolate(animatedValue.value, [0, 1], [14, 10]),
      };
    }, []);

    const animatedInputStyles = useAnimatedStyle(() => {
      return {
        flex: 1,
        transform: [{ translateY: animatedValue.value * 4 }],
      };
    });

    useEffect(() => {
      if (inputRef.current?.isFocused()) {
        setBorderColor(
          error
            ? styles.itemContainerError.borderColor
            : styles.itemContainerFocused.borderColor
        );
      } else {
        startBlurAnimation();
      }
    }, [error]);

    const handleOnChangeText = (text: string) => {
      if (text.length === 0) {
        animatedValue.value = withTiming(0, DEFAULT_TIMING_CONFIG);
      }
      onChangeText?.(text);
      if (value || animatedValue.value === 1) {
        return;
      }
      animatedValue.value = withTiming(1, DEFAULT_TIMING_CONFIG);
    };

    const startBlurAnimation = () => {
      setBorderColor(
        error
          ? `${styles.itemContainerError.borderColor}40`
          : styles.itemContainer.borderColor
      );
      if (!value) {
        animatedValue.value = withTiming(0, DEFAULT_TIMING_CONFIG);
      }
    };

    const handleOnBlur: RNTextInputProps["onBlur"] = ({ nativeEvent }) => {
      onBlur?.(nativeEvent.text);
      startBlurAnimation();
    };

    const onFocus = () => {
      setBorderColor(
        error
          ? styles.itemContainerError.borderColor
          : styles.itemContainerFocused.borderColor
      );
    };

    return (
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            inputRef?.current?.focus();
          }}
          style={styles.pressable}
          disabled={disabled}
        >
          <Animated.View
            style={[styles.itemContainer, animatedBorderStyle, containerStyle]}
          >
            <View pointerEvents="none" style={styles.labelContainer}>
              <Animated.Text style={[styles.label, animatedLabelStyles]}>
                {label}
              </Animated.Text>
            </View>
            <Animated.View style={animatedInputStyles}>
              {disabled ? (
                <Text style={styles.text}>{value}</Text>
              ) : (
                <RNTextInput
                  ref={inputRef}
                  testID={testId}
                  value={value}
                  style={styles.textInput}
                  numberOfLines={numberOfLines}
                  multiline={multiline}
                  keyboardType={keyboardType}
                  onChangeText={handleOnChangeText}
                  maxLength={40}
                  returnKeyType="done"
                  onBlur={handleOnBlur}
                  onFocus={onFocus}
                  keyboardAppearance={theme.keyboardAppearance}
                  {...rest}
                />
              )}
            </Animated.View>
          </Animated.View>
        </Pressable>
        {!!error && <FieldError error={error} />}
        {!!caption && <MenuItemDescription description={caption} />}
      </View>
    );
  }
);

export default TextInput;

TextInput.displayName = "TextInput";

const useStyles = (disabled: boolean, error: boolean, multiline: boolean) =>
  useThemedStyle(
    useCallback(
      (theme) =>
        StyleSheet.create({
          container: {
            width: "100%",
            flexShrink: 0.5,
          },
          pressable: {
            flexGrow: 2,
            flexShrink: 1,
          },
          textInput: {
            paddingHorizontal: theme.size.baseSize * 2,
            height: multiline ? "95%" : "auto",
            ...theme.typography.p1,
            ...getTextInputStyle(disabled, error, {
              disabled: {
                color: theme.colors.foregroundLowContrast,
              },
              error: {
                color: theme.colors.foregroundNegative,
              },
              default: {
                color: theme.colors.foregroundLowContrast,
              },
            }),
          },
          text: {
            ...theme.typography.p1,
            paddingVertical: theme.size.baseSize * 1,
            marginTop: theme.size.baseSize,
            paddingHorizontal: theme.size.baseSize * 2,
            color: theme.colors.foregroundLowContrast,
            ...getTextInputStyle(disabled, error, {
              disabled: {
                color: theme.colors.foregroundLowContrast,
              },
              error: {
                color: theme.colors.foregroundNegative,
              },
              default: {
                color: theme.colors.foregroundLowContrast,
              },
            }),
          },
          itemContainer: {
            borderWidth: theme.borderWidth,
            backgroundColor: theme.colors.backgroundOnPrimary,
            height: multiline
              ? theme.size.baseSize * 24
              : theme.size.baseSize * 9,
            borderRadius: theme.borderRadius,
            minHeight: theme.size.baseSize * 8,
            flexDirection: "row",
            alignItems: "center",
            borderColor: `${theme.colors.border}00`,
          },
          itemContainerFocused: {
            borderColor: theme.colors.border,
          },
          itemContainerError: {
            borderColor: theme.colors.foregroundNegative,
          },
          labelContainer: {
            left: theme.size.baseSize * 2,
            top: multiline ? theme.size.baseSize * 1 : theme.size.baseSize * 2,
            position: "absolute",
          },
          label: getLabelStyle(disabled, error, {
            default: {
              color: theme.colors.foregroundHighContrast,
              ...theme.typography.p1,
            },
            disabled: {
              color: theme.colors.foregroundLowContrast,
              ...theme.typography.p1,
            },
            error: {
              color: theme.colors.foregroundNegative,
              ...theme.typography.p1,
            },
          }),
          descriptionContainer: {
            marginHorizontal: theme.size.baseSize * 4,
            marginBottom: theme.size.baseSize * 2,
          },
        }),
      [disabled, error, multiline]
    )
  );
