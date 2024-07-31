import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../Text';
import { useThemedStyle } from '../../hooks';

type MenuItemDescriptionProps = {
  description: string;
};

const MenuItemDescription: React.FC<MenuItemDescriptionProps> = ({ description }) => {
  const { styles } = useStyles();
  return (
    <View style={styles.descriptionContainer}>
      <Text category="p2" contrast="low">
        {description}
      </Text>
    </View>
  );
};

export default React.memo(MenuItemDescription);

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
