import React, { useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  ReturnKeyType,
  TouchableOpacity,
  LayoutChangeEvent,
  StyleProp,
  TextInputProps,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { TextInput, Text } from "../../components";
import { useThemedStyle } from "../../hooks";

const CANCEL_BUTTON_WIDTH = 62;

type SearchProps = {
  searchQuery: string;
  onChangeText: (text: string) => void;
  rightComponent?: React.ReactNode;
  onPressFilter?: () => void;
  placeholder?: string; // Deprecated use label instead
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  returnKeyType?: ReturnKeyType;
} & Omit<
  TextInputProps,
  "returnKeyType" | "onFocus" | "onBlur" | "onChangeText"
>;

const Search = ({
  searchQuery,
  onChangeText,
  placeholder,
  containerStyle = {},
  returnKeyType,
  label,
  ...rest
}: SearchProps) => {
  const { styles } = useStyles();
  const inputRef = useRef<typeof TextInput>(null);
  const [minWidth, setMinWidth] = useState<number>(0);

  const focused = useSharedValue(0);

  const onFocus = () => {
    focused.value = withTiming(1, {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };
  const onBlur = () => {
    focused.value = withTiming(0, {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const animatedCancelButtonStyle = useAnimatedStyle(
    () => ({
      opacity: focused.value,
    }),
    [focused]
  );

  const animatedSearchInput = useAnimatedStyle(
    () => ({
      width: `${interpolate(
        focused.value,
        [0, 1],
        [100, ((minWidth - CANCEL_BUTTON_WIDTH) / minWidth) * 100]
      )}%`,
    }),
    [focused, minWidth]
  );

  const onPressCancel = useCallback(() => {
    onChangeText("");
    // @ts-expect-error not yet typed
    inputRef?.current?.blur();
  }, [inputRef]);

  const onLayout = (e: LayoutChangeEvent) => {
    setMinWidth(e.nativeEvent.layout.width);
  };

  return (
    <View
      style={[styles.searchBarContainer, containerStyle]}
      onLayout={onLayout}
    >
      <Animated.View style={[animatedSearchInput, styles.animatedContainer]}>
        <TextInput
          ref={inputRef}
          value={searchQuery}
          onFocus={onFocus}
          onBlur={onBlur}
          returnKeyType={returnKeyType ?? "search"}
          label={label || placeholder || "Enter search term"}
          onChangeText={onChangeText}
          {...rest}
        />
      </Animated.View>
      <Animated.View style={animatedCancelButtonStyle}>
        <TouchableOpacity style={styles.cancelButton} onPress={onPressCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Search;

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (theme) =>
        StyleSheet.create({
          searchBarContainer: {
            flexDirection: "row",
            width: "100%",
          },
          animatedContainer: {
            width: "100%",
            justifyContent: "center",
          },
          cancelButton: {
            flex: 1,
            maxWidth: CANCEL_BUTTON_WIDTH,
            minWidth: CANCEL_BUTTON_WIDTH,
            justifyContent: "center",
            alignItems: "center",
          },
          cancelButtonText: {
            color: theme.colors.primary,
          },
        }),
      []
    )
  );
