import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../Text';
import { useThemedStyle } from '../../hooks';

export type MenuItemDescriptionProps = {
  description: string;
};

export const MenuItemDescription = ({ description }: MenuItemDescriptionProps) => {
  const styles = useStyles().styles;
  return (
    <View style={styles.descriptionContainer}>
      <Text category="p2" contrast="low">
        {description}
      </Text>
    </View>
  );
};

const useStyles = () =>
  useThemedStyle(
    useCallback(
      theme =>
        StyleSheet.create({
          descriptionContainer: {
            marginHorizontal: theme.size.baseSize * 2,
            marginTop: theme.size.baseSize,
          },
        }),
      []
    )
  );
