import { useCallback } from "react";
import { StyleSheet } from "react-native";

import { useThemedStyle } from "../../hooks";
import { FIELD_HEIGHT_MULTIPLIER } from "../../constants";

export const useMenuItemStyles = () =>
  useThemedStyle(
    useCallback(
      (theme) =>
        StyleSheet.create({
          textInput: {
            ...theme.typography.h3,
          },
          container: {},
          itemContainer: {
            borderWidth: theme.borderWidth,
            borderColor: theme.colors.backgroundOnPrimary,
            backgroundColor: theme.colors.backgroundOnPrimary,
            borderRadius: theme.borderRadius,
            paddingHorizontal: theme.size.baseSize * 2,
            minHeight: theme.size.baseSize * FIELD_HEIGHT_MULTIPLIER,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: theme.size.baseSize * FIELD_HEIGHT_MULTIPLIER,
          },
          itemLabel: {
            color: theme.colors.foregroundHighContrast,
          },
        }),
      []
    )
  );
