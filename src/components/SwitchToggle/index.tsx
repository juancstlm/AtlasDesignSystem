import React from 'react';
import { StyleProp, Switch, TouchableOpacity, View, ViewStyle } from 'react-native';


import Text from '../Text';
import { MenuItemDescription } from '../MenuItemDescription';
import { useMenuItemStyles } from '../../shared/styles/index';

export type SwitchToggleProps = {
  label: string;
  value?: boolean;
  caption?: string;
  testId?: string;
  onChange?: (value: boolean) => void;
  touchableStyle?: StyleProp<ViewStyle>;
};

export const SwitchToggle = ({ testId, onChange, value, caption, label, touchableStyle }: SwitchToggleProps) => {
  const styles = useMenuItemStyles().styles;
  return (
    <View style={styles.container}>
      <TouchableOpacity testID={testId} style={[styles.itemContainer, touchableStyle]}>
        <Text numberOfLines={1}>{label}</Text>
        <Switch testID={`${testId}_toggle`} onValueChange={onChange} value={value} />
      </TouchableOpacity>
      {!!caption && <MenuItemDescription description={caption} />}
    </View>
  );
};

export default SwitchToggle;
