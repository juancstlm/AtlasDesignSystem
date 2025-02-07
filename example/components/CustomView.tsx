import { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useThemedStyle } from "atlas-design-system";

const CustomItem = ({ color }: { color: string }) => {
  const styles = useStyles().styles;

  return <View style={[styles.item, { backgroundColor: color }]} />;
};

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          item: {
            width: t.size.baseSize * 5,
            height: t.size.baseSize * 5,
          },
        }),
      []
    )
  );
export default CustomItem;
