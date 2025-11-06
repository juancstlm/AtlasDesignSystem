import React, { useEffect } from "react";
import {
  StyleProp,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";

import { MenuItemDescription } from "../MenuItemDescription";
import { Text } from "../Text";
import { useMenuItemStyles } from "../../shared/styles/index";
import { FieldError } from "../FieldError/FieldError";
import { useInputFieldAnimatedBorder } from "../../hooks/useInputFieldAnimatedBorder";

export type SwitchToggleProps = {
  label: string;
  value?: boolean;
  caption?: string;
  testId?: string;
  onChange?: (value: boolean) => void;
  touchableStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
};

const SwitchToggle = ({
  testId,
  onChange,
  value,
  caption,
  label,
  touchableStyle,
  error,
  containerStyle,
}: SwitchToggleProps) => {
  const { styles, theme } = useMenuItemStyles();
  const { animatedBorderStyle, setBorderColor } = useInputFieldAnimatedBorder(
    styles.itemContainer.borderColor
  );

  useEffect(() => {
    setBorderColor(
      error ? theme.colors.foregroundNegative : styles.itemContainer.borderColor
    );
  }, [
    error,
    theme.colors.foregroundNegative,
    styles.itemContainer.borderColor,
  ]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity testID={testId} style={touchableStyle}>
        <Animated.View style={[styles.itemContainer, animatedBorderStyle]}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={switchStyle.label}
          >
            {label}
          </Text>
          <Switch
            style={switchStyle.switch}
            onValueChange={onChange}
            value={value}
          />
        </Animated.View>
      </TouchableOpacity>
      {!!error && <FieldError error={error} />}
      {!!caption && <MenuItemDescription description={caption} />}
    </View>
  );
};

const switchStyle = StyleSheet.create({
  switch: {
    alignSelf: "center",
  },
  label: {
    flex: 1,
    // flexGrow: 0,
    flexShrink: 1,
  },
});

export default SwitchToggle;
