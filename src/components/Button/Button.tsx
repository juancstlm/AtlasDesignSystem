import React, { useMemo } from "react";
import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { useButtonStyles } from "./styles/ButtonStyle";
import Text from "../Text";

export enum ButtonType {
  Primary,
  Destructive,
}

export interface ButtonProps {
  disabled?: boolean;
  // Deprecated use appearance
  type?: ButtonType;
  onPress?: () => void;
  text: string;
  loading?: boolean;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  appearance?: "primary" | "secondary" | "destructive";
}

const getButtonStyle = (
  styles: {
    disabled: StyleProp<ViewStyle>;
    primary: StyleProp<ViewStyle>;
    secondary: StyleProp<ViewStyle>;
    destructive: StyleProp<ViewStyle>;
  },
  appearance: ButtonProps["appearance"],
  disabled: boolean
) => {
  const style = [styles.primary];

  if (appearance === "secondary") {
    style.push(styles.secondary);
  }

  if (appearance === "destructive") {
    style.push(styles.destructive);
  }

  if (disabled) {
    style.push(styles.disabled);
  }

  return style;
};

export const Button = ({
  testID,
  disabled = false,
  onPress,
  text,
  loading,
  containerStyle = {},
  appearance = "primary",
  type,
}: ButtonProps) => {
  const { styles, theme } = useButtonStyles();
  const buttonStyle = useMemo(() => {
    let _apperance = appearance;

    if (type) {
      _apperance = type === ButtonType.Destructive ? "destructive" : "primary";
    }

    return getButtonStyle(
      {
        disabled: styles.disabled,
        primary: styles.default,
        destructive: styles.destructiveContainer,
        secondary: styles.secondary,
      },
      _apperance,
      disabled
    );
  }, [styles, appearance, disabled, type]);

  return (
    <TouchableOpacity
      testID={testID}
      style={[buttonStyle, disabled && styles.disabled, containerStyle]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={theme.colors.foregroundOnPrimary}
        />
      ) : (
        <Text
          category="h3"
          style={[styles.defaultText, disabled && styles.disabledText]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
