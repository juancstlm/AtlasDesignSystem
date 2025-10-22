import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { useThemedStyle } from "../../../hooks/useThemedStyle";
import { Text } from "../../Text";
type SheetHeaderProps = {
  title?: string;
  children?: React.ReactNode;
};

function SheetHeader({ title, children }: SheetHeaderProps) {
  const styles = useStyles().styles;

  const getContent = () => {
    if (children) {
      return children;
    }
    if (title) {
      return <Text>{title}</Text>;
    }
    return null;
  };

  const content = getContent();

  if (!content) {
    return null;
  }

  return <View style={styles.headerContainer}>{content}</View>;
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (theme) =>
        StyleSheet.create({
          headerContainer: {
            paddingVertical: theme.size.baseSize * 3,
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: theme.borderWidth / 2,
            borderColor: theme.colors.border,
          },
        }),
      []
    )
  );

export default SheetHeader;
