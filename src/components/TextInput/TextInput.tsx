import React, {
  forwardRef,
  useCallback,
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
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Text from "../Text";
import MenuItemDescription from "../MenuItemDescription";
import { useThemedStyle } from "../../hooks";

export type TextInputProps = {
  disabled?: boolean;
  testId?: string;
  caption?: string;
  keyboardType?: KeyboardTypeOptions;
  onBlur?: (text: string) => void;
  value: string;
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
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
      ...rest
    }: TextInputProps,
    ref
  ) => {
    const { styles, theme } = useStyles(disabled);

    const inputRef = useRef<RNTextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef?.current?.focus();
      },
      blur: () => {
        inputRef?.current?.blur();
      },
    }));

    const animatedValue = useSharedValue(value ? 1 : 0);
    const focusedValue = useSharedValue(0);

    const animatedLabelStyles = useAnimatedStyle(() => {
      return {
        transform: [
          { translateY: interpolate(animatedValue.value, [0, 1], [1, -8]) },
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

    const animatedContainerStyles = useAnimatedStyle(() => {
      return {
        borderColor: interpolateColor(
          focusedValue.value,
          [0, 1],
          ["#ffffff00", theme.colors.border]
        ),
      };
    });

    const handleOnChangeText = (text: string) => {
      if (text.length === 0) {
        animatedValue.value = withTiming(0, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }
      onChangeText?.(text);
      if (value || animatedValue.value === 1) {
        return;
      }
      animatedValue.value = withTiming(1, {
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    };

    const handleOnBlur: RNTextInputProps["onBlur"] = ({ nativeEvent }) => {
      onBlur?.(nativeEvent.text);
      focusedValue.value = withTiming(0, {
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      if (!value) {
        animatedValue.value = withTiming(0, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }
    };

    const onFocus = () => {
      focusedValue.value = withTiming(1, {
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
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
            style={[
              styles.itemContainer,
              animatedContainerStyles,
              containerStyle,
            ]}
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
                  numberOfLines={1}
                  keyboardType={keyboardType}
                  placeholderTextColor={theme.placeholderTextColor}
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
        {!!caption && <MenuItemDescription description={caption} />}
      </View>
    );
  }
);

export default TextInput;

const useStyles = (disabled: boolean) =>
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
            ...theme.typography.p1,
            color: theme.colors.foregroundLowContrast,
          },
          text: {
            marginTop: theme.size.baseSize,
            paddingHorizontal: theme.size.baseSize * 2,
            color: theme.colors.foregroundLowContrast,
          },
          itemContainer: {
            borderWidth: theme.borderWidth,
            borderColor: theme.colors.borderSecondary,
            backgroundColor: theme.colors.backgroundOnPrimary,
            borderRadius: theme.borderRadius,
            minHeight: theme.size.baseSize * 8,
            flexDirection: "row",
            alignItems: "center",
          },
          labelContainer: {
            left: theme.size.baseSize * 2,
            position: "absolute",
          },
          label: {
            color: !disabled
              ? theme.colors.foreground
              : theme.colors.foregroundLowContrast,
            ...theme.typography.p1,
          },
          descriptionContainer: {
            marginHorizontal: theme.size.baseSize * 4,
            marginBottom: theme.size.baseSize * 2,
          },
        }),
      [disabled]
    )
  );
