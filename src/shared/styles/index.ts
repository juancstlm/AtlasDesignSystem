import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useThemedStyle } from "../../hooks";

export const MENU_ITEM_HEIGHT = 40;

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
            minHeight: MENU_ITEM_HEIGHT,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: theme.size.baseSize * 9,
          },
          itemLabel: {
            color: theme.textPrimary,
          },
        }),
      []
    )
  );
