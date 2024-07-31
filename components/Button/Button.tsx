import { ActivityIndicator, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';

import { useButtonStyles } from './styles/ButtonStyle';
import Text from '../Text';

export enum ButtonType {
  Primary,
  Destructive,
}

export interface ButtonProps {
  disabled?: boolean;
  type?: ButtonType;
  onPress?: () => void;
  text: string;
  loading?: boolean;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const Button = ({ testID, disabled = false, onPress, text, loading, type = ButtonType.Primary, containerStyle = {} }: ButtonProps) => {
  const { styles, theme } = useButtonStyles();
  const buttonStyle = type === ButtonType.Primary ? styles.default : styles.destructiveContainer;

  return (
    <TouchableOpacity
      testID={testID}
      style={[buttonStyle, disabled && styles.disabled, containerStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.foregroundOnPrimary} />
      ) : (
        <Text category="h3" style={[styles.defaultText, disabled && styles.disabledText]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
