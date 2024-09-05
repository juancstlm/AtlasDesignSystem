import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { useThemedStyle } from "../../hooks";

const SIZE_MAP = {
  small: 5,
  medium: 10,
  large: 20,
};

type DragHandleSize = "small" | "medium" | "large";

type Props = {
  size?: DragHandleSize;
};

export const DragHandle = ({ size = "medium" }: Props) => {
  const styles = useStyles(size).styles;

  return (
    <View style={styles.container}>
      <View style={styles.handle}></View>
    </View>
  );
};

export default DragHandle;

const useStyles = (size: DragHandleSize) =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            width: "100%",
            paddingVertical: t.size.baseSize * 2,
            alignItems: "center",
          },
          handle: {
            width: t.size.baseSize * (SIZE_MAP[size] || t.size.baseSize),
            height: t.size.baseSize,
            borderRadius: t.borderRadius,
            backgroundColor: t.colors.backgroundOnPrimary,
          },
        }),
      [size]
    )
  );
