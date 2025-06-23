import React, { useCallback } from "react";
import { View, StyleSheet, ViewStyle, SafeAreaView, Pressable } from "react-native";
import IonIcons from 'react-native-vector-icons/Ionicons'

import { useThemedStyle } from "../../hooks";
import Text from "../Text";
import DragHandle from "../DragHandle";

const TitleBarHeight = 60;

export type TitleBarProps = {
  title?: string;
  titleComponent?: React.ReactElement;
  rightItem?: React.ReactElement;
  onBackPressed?: () => void;
  canGoBack?: boolean;
  type?: "modal" | "default";
  containerStyle?: ViewStyle;
};

export const TitleBar = ({
  title,
  onBackPressed,
  canGoBack = true,
  rightItem,
  titleComponent,
  type = "default",
  containerStyle = {},
}: TitleBarProps) => {
  const isModal = type === "modal";
  const styles = useStyles(canGoBack, isModal).styles;

  const handleOnBackPress = useCallback(() => {
    if (!onBackPressed) {
      return;
    }
    onBackPressed();
  }, [onBackPressed]);

  const renderBack = () => {
    if (isModal || !canGoBack) {
      return null;
    }
    return (
      <Pressable style={styles.backButtonContainer} onPress={handleOnBackPress}>
        <IonIcons
          style={styles.backButton}
          name="chevron-back-outline"
          size={20}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      {isModal && <DragHandle size="large" />}
      <View style={styles.bar}>
        {renderBack()}
        {!!titleComponent && (
          <View style={styles.titleComponentContainer}>{titleComponent}</View>
        )}
        {!titleComponent && !!title && (
          <View style={styles.titleContainer}>
            <Text
              category="h1"
              style={styles.headerTitle}
              numberOfLines={1}
            >
              {title ?? ""}
            </Text>
          </View>
        )}
        {!!rightItem && (
          <View style={styles.rightItemContainer}>{rightItem}</View>
        )}
      </View>
    </SafeAreaView>
  );
};

const useStyles = (canGoBack: boolean, isModal: boolean) =>
  useThemedStyle(
    useCallback(
      (theme) =>
        StyleSheet.create({
          container: {
            backgroundColor: theme.colors.backgroundPrimary,
            overflow: "hidden",
          },
          bar: {
            flexDirection: "row",
            paddingHorizontal: theme.size.baseSize * 2,
            overflow: "hidden",
          },
          backButtonContainer: {
            position: "absolute",
            height: "100%",
            top: 16,
            justifyContent: "center",
            zIndex: 20,
          },
          headerTitle: {
            flexShrink: 1,
            marginLeft: canGoBack
              ? theme.size.baseSize * 4
              : theme.size.baseSize * 4,
            paddingLeft: !canGoBack || isModal ? 0 : theme.size.baseSize * 4,
          },
          backButton: {
            height: "100%",
            marginLeft: theme.size.baseSize * 4,
            color: theme.colors.foregroundHighContrast,
          },
          titleComponentContainer: {
            flex: 1,
            justifyContent: "center",
            paddingLeft: canGoBack ? theme.size.baseSize * 4 : 0,
          },
          titleContainer: {
            flex: 1,
            justifyContent: "center",
            height: TitleBarHeight,
          },
          rightItemContainer: {
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 20,
            justifyContent: "center",
            alignItems: "flex-end",
            height: "100%",
          },
          chevronBack: {
            color: theme.colors.foreground,
          }
        }),
      []
    )
  );

export default TitleBar;
