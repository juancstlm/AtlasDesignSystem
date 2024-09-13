import React, { useEffect } from 'react';
import { StyleProp, Switch, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import Text from '../Text';
import { MenuItemDescription } from '../MenuItemDescription';
import { useMenuItemStyles } from '../../shared/styles/index';
import { FieldError } from '../FieldError/FieldError';
import { useInputFieldAnimatedBorder } from '../../hooks/useInputFieldAnimatedBorder';

export type SwitchToggleProps = {
  label: string;
  value?: boolean;
  caption?: string;
  testId?: string;
  onChange?: (value: boolean) => void;
  touchableStyle?: StyleProp<ViewStyle>;
  error?: string;
};

export const SwitchToggle = ({ testId, onChange, value, caption, label, touchableStyle, error }: SwitchToggleProps) => {
  const {styles, theme} = useMenuItemStyles();
  const { animatedBorderStyle, setBorderColor } = useInputFieldAnimatedBorder(styles.itemContainer.borderColor)

  useEffect(() => {
    setBorderColor(error ? theme.colors.foregroundNegative : styles.itemContainer.borderColor)
  }, [error])
  
  return (
    <View style={styles.container}>
      <TouchableOpacity testID={testId} style={touchableStyle}>
        <Animated.View style={[styles.itemContainer, animatedBorderStyle]}>
          <Text numberOfLines={1}>{label}</Text>
          <Switch testID={`${testId}_toggle`} onValueChange={onChange} value={value} />
        </Animated.View>
      </TouchableOpacity>
      {!!error && <FieldError error={error} />}
      {!!caption && <MenuItemDescription description={caption} />}
    </View>
  );
};

export default SwitchToggle;
