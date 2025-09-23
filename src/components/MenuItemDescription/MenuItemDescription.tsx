import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { useThemedStyle } from "../../hooks";
import { Text } from "../Text";

export type MenuItemDescriptionProps = {
  description: string;
};

const MenuItemDescription = ({ description }: MenuItemDescriptionProps) => {
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
      (theme) =>
        StyleSheet.create({
          descriptionContainer: {
            marginHorizontal: theme.size.baseSize * 2,
            marginTop: theme.size.baseSize,
          },
        }),
      []
    )
  );

export default MenuItemDescription;
