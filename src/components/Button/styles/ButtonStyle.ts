import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useCallback, useMemo } from "react";

import { useThemedStyle } from "../../../hooks";
import { ButtonProps } from "../Button";
import { AtlasTheme } from "../../../types";

const getButtonStyle = (
  styles: {
    disabled: StyleProp<ViewStyle>;
    primary: StyleProp<ViewStyle>;
    secondary: StyleProp<ViewStyle>;
    destructive: StyleProp<ViewStyle>;
  },
  appearance: ButtonProps["appearance"],
  disabled: boolean
) => {
  const style = [styles.primary];

  if (appearance === "secondary") {
    style.push(styles.secondary);
  }

  if (appearance === "destructive") {
    style.push(styles.destructive);
  }

  if (disabled) {
    style.push(styles.disabled);
  }

  return style;
};

const getButtonTextStyle = (
  styles: {
    disabled: StyleProp<TextStyle>;
    primary: StyleProp<TextStyle>;
  },
  appearance: ButtonProps["appearance"],
  disabled: boolean
) => {
  const style = [styles.primary];

  if (disabled) {
    style.push(styles.disabled);
  }
  return style;
};

export const useButtonStyles = (
  appearance: ButtonProps["appearance"] = "primary",
  disabled: boolean = false,
  themeOverride?: AtlasTheme
) => {
  const styles = useThemedStyle(
    useCallback(
      (t) => {
        let theme = t;
        if (themeOverride) {
          theme = themeOverride;
        }
        return StyleSheet.create({
          default: {
            borderRadius: theme.borderRadius,
            justifyContent: "center",
            backgroundColor: theme.colors.primary,
            paddingHorizontal: theme.size.baseSize * 4,
            paddingVertical: theme.size.baseSize * 2,
            textAlign: "center",
          },
          secondary: {
            backgroundColor: theme.colors.foregroundLowContrast,
          },
          destructiveContainer: {
            borderRadius: theme.borderRadius,
            justifyContent: "center",
            paddingHorizontal: theme.size.baseSize * 4,
            paddingVertical: theme.size.baseSize * 2,
            textAlign: "center",
            backgroundColor: theme.colors.secondaryNegative,
          },
          destructiveText: {
            textAlign: "center",
            color: theme.colors.backgroundPrimary,
          },
          defaultText: {
            textAlign: "center",
            color: theme.colors.foregroundOnPrimary,
          },
          disabled: {
            backgroundColor: theme.colors.primaryLowContrast,
          },
          disabledText: {
            color: theme.colors.foregroundOnPrimary,
          },
          loadingIndicator: {
            color: theme.colors.foregroundOnPrimary,
          },
        });
      },
      [themeOverride]
    )
  ).styles;

  const buttonStyle = useMemo(() => {
    return getButtonStyle(
      {
        disabled: styles.disabled,
        primary: styles.default,
        destructive: styles.destructiveContainer,
        secondary: styles.secondary,
      },
      appearance,
      disabled
    );
  }, [styles, appearance, disabled]);

  const textStyle = useMemo(
    () =>
      getButtonTextStyle(
        {
          disabled: styles.disabledText,
          primary: styles.defaultText,
        },
        appearance,
        disabled
      ),
    [styles, appearance, disabled]
  );

  return { styles, buttonStyle, textStyle };
};
