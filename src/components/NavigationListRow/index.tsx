import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";

import Text from "../Text";
import { useThemedStyle } from "../../hooks/useThemedStyle";

export type NavigationListRowProps = {
  label: string;
  caption?: string;
  onPress?: () => void;
  disabled?: boolean;
  defaultPadding?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  iconRight?: React.ReactNode;
  iconRightName?: string;
};

export const NavigationListRow = ({
  label,
  caption,
  onPress,
  disabled,
  defaultPadding = true,
  containerStyle = {},
  iconRight,
  iconRightName = "chevron-forward-outline",
}: NavigationListRowProps) => {
  const styles = useStyles(defaultPadding).styles;

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text category="h3">{label}</Text>
        {caption && <Text contrast="low">{caption}</Text>}
      </View>
      {iconRight ? (
        iconRight
      ) : (
        <IonIcons style={styles.chevronRight} size={18} name={iconRightName} />
      )}
    </TouchableOpacity>
  );
};

export default NavigationListRow;

const useStyles = (defaultPadding: boolean) =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            flexDirection: "row",
            justifyContent: "flex-start",
            columnGap: t.size.baseSize * 0,
            paddingVertical: t.size.baseSize * 2,
            paddingHorizontal: defaultPadding ? t.size.baseSize * 4 : 0,
          },
          content: {
            flex: 1,
          },
          chevronRight: {
            color: t.colors.foregroundHighContrast,
          },
        }),
      [defaultPadding]
    )
  );
