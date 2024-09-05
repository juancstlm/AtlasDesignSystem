import React, { useCallback } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SymbolView } from "expo-symbols";

import Text from "../Text";
import { useThemedStyle } from "../../hooks/useThemedStyle";

export type NavigationListRowProps = {
  label: string;
  caption?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const NavigationListRow = ({
  label,
  caption,
  onPress,
  disabled,
}: NavigationListRowProps) => {
  const styles = useStyles().styles;

  return (
    <TouchableOpacity disabled={disabled} style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text category="h3">{label}</Text>
        {caption && <Text contrast="low">{caption}</Text>}
      </View>
        <SymbolView
          style={styles.chevronRight}
          tintColor={styles.chevronRightTint.color}
          resizeMode="center"
          name="chevron.right"
        />
    </TouchableOpacity>
  );
};

export default NavigationListRow;

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          content: {
            flexGrow: 1,
          },
          container: {
            width: "100%",
            flexDirection: "row",
            paddingVertical: t.size.baseSize * 2,
            paddingHorizontal: t.size.baseSize * 4,
          },
          chevronRight: {
            height: '100%',
            flexGrow: 0,
          },
          chevronRightTint: {
            color: t.colors.foregroundLowContrast
          }
        }),
      []
    )
  );
