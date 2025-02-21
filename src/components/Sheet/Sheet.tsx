import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemedStyle } from "../../hooks/useThemedStyle";
import Text from "../Text";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  defaultMargins?: boolean;
  header?: string;
  transparent?: boolean;
  disableScroll?: boolean;
  footer?: React.ReactNode;
};

const BACKGROUND_OPACITY = 0.6;

export const Sheet = ({
  open,
  setOpen,
  children,
  containerStyle,
  defaultMargins = true,
  header,
  transparent = false,
  disableScroll = false,
  footer,
}: Props) => {
  const [footerHeight, setFooterHeight] = useState(0);
  const styles = useStyles(defaultMargins, footerHeight).styles;
  const [visible, setVisible] = useState(open);

  const opacity = useSharedValue(0);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }

    setVisible(true);
  }, [open]);

  useEffect(() => {
    if (!visible) {
      opacity.value = withTiming(
        0,
        {
          duration: 200,
          easing: Easing.bezier(0.5, 0, 0, 0.75),
        },
        () => {
          runOnJS(setOpen)(false);
        }
      );
      return;
    }
    opacity.value = withTiming(BACKGROUND_OPACITY, {
      duration: 250,
      easing: Easing.bezier(0.5, 0, 0, 0.75),
    });
  }, [visible]);

  const animatedModalBackgroundStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const content = (
    <>
      {!transparent && (
        <Pressable
          style={styles.modalPressable}
          onPress={() => {
            setVisible(false);
          }}
        >
          <Animated.View
            style={[styles.modalBackground, animatedModalBackgroundStyles]}
          />
        </Pressable>
      )}
      {visible && (
        <Animated.View
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={[styles.sheet, containerStyle]}
        >
          {!!header && (
            <View style={styles.headerContainer}>
              <Text>{header}</Text>
            </View>
          )}
          <ScrollView
            scrollEnabled={!disableScroll}
            contentContainerStyle={[
              styles.contentContainer,
              !!footer && styles.containerWithFooter,
            ]}
          >
            {children}
          </ScrollView>
          {!!footer && (
            <View
              onLayout={(e) => {
                setFooterHeight(e.nativeEvent.layout.height);
              }}
              style={styles.footer}
            >
              {footer}
            </View>
          )}
        </Animated.View>
      )}
    </>
  );

  // // Don't render anything if it's not visible
  if (!visible && !open) {
    return null;
  }

  return (
    <Modal transparent visible>
      <View style={styles.wrapper}>{content}</View>
    </Modal>
  );
};

export default Sheet;

const useStyles = (defaultMargins: boolean, footerHeight: number) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  return useThemedStyle(
    useCallback(
      (theme) =>
        StyleSheet.create({
          wrapper: {
            flex: 1,
            justifyContent: "flex-end",
          },
          headerContainer: {
            paddingVertical: theme.size.baseSize * 3,
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: theme.borderWidth / 2,
            borderColor: theme.colors.border,
          },
          modalPressable: {
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          },
          modalBackground: {
            backgroundColor: "#000000",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          },
          sheet: {
            alignSelf: "center",
            display: "flex",
            width: "100%",
            maxWidth: 600,
            maxHeight: "80%",
            backgroundColor: theme.colors.backgroundPrimary,
          },
          contentContainer: {
            padding: defaultMargins ? theme.size.baseSize * 4 : 0,
            paddingBottom: defaultMargins
              ? theme.size.baseSize * 4 + bottomInset
              : bottomInset,
          },
          containerWithFooter: {
            paddingBottom: defaultMargins
              ? theme.size.baseSize * 4 + footerHeight
              : footerHeight,
          },
          footer: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: defaultMargins ? theme.size.baseSize * 4 : 0,
            paddingBottom: defaultMargins
              ? theme.size.baseSize * 2 + bottomInset
              : bottomInset,
          },
        }),
      [bottomInset, footerHeight, defaultMargins]
    )
  );
};
