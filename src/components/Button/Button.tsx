import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import Text from "../Text";

import { useButtonStyles } from "./styles/ButtonStyle";

export interface ButtonProps {
  disabled?: boolean;
  onPress?: () => void;
  text: string;
  loading?: boolean;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  appearance?: "primary" | "secondary" | "destructive";
}

export const Button = ({
  testID,
  disabled = false,
  onPress,
  text,
  loading,
  containerStyle = {},
  appearance = "primary",
}: ButtonProps) => {
  const { buttonStyle, styles, textStyle } = useButtonStyles(
    appearance,
    disabled
  );

  return (
    <TouchableOpacity
      testID={testID}
      style={[buttonStyle, containerStyle]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={styles.loadingIndicator.color} />
      ) : (
        <Text category="h3" style={textStyle}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
