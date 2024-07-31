import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useThemedStyle } from "../../hooks";

export const MENU_ITEM_HEIGHT = 40;

export const useMenuItemStyles = () =>
    useThemedStyle(
      useCallback(
        theme =>
          StyleSheet.create({
            textInput: {
              ...theme.typography.h3,
            },
            container: {
              marginBottom: theme.size.baseSize * 3,
            },
            itemContainer: {
              backgroundColor: theme.menuItemContainerBackground,
              borderRadius: theme.borderRadius,
              paddingHorizontal: theme.size.baseSize * 2,
              minHeight: MENU_ITEM_HEIGHT,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            itemLabel: {
              color: theme.textPrimary,
            },
          }),
        []
      )
    );