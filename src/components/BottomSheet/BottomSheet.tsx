import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemedStyle } from "../../hooks";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
  defaultMargins?: boolean;
  transparent?: boolean;
  height: number;
};

const DEFAULT_EASING = Easing.bezier(0.5, 0, 0, 0.75);

export const BottomSheet = ({ open, children, height, setOpen }: Props) => {
  const styles = useStyles(height).styles;
  const { height: deviceHeight } = useWindowDimensions();
  const [visible, setVisible] = useState(open);

  const position = useSharedValue(deviceHeight);

  useEffect(() => {
    if (!open) {
      position.value = withTiming(
        height,
        {
          duration: 200,
          easing: DEFAULT_EASING,
        },
        () => {
          runOnJS(setVisible)(false);
        }
      );
      return;
    }

    setVisible(true);
  }, [open]);

  useEffect(() => {
    if (!visible) {
      return;
    }
    position.value = withTiming(0, {
      duration: 250,
      easing: DEFAULT_EASING,
    });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: position.value }],
    };
  }, [position]);

  // // Don't render anything if it's not visible
  if (!visible) {
    return null;
  }

  return (
    <Modal transparent visible>
      <Pressable
        onPress={() => {
          setOpen(false);
        }}
        style={styles.wrapper}
      ></Pressable>
      <Animated.View style={[styles.sheet, animatedStyle]}>
        {children}
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;

const useStyles = (height: number) => {
  const bottom = useSafeAreaInsets().bottom;
  return useThemedStyle(
    useCallback(
      (theme) =>
        StyleSheet.create({
          wrapper: {
            height: "100%",
            bottom: 0,
            width: "100%",
            position: "absolute",
          },
          sheet: {
            height: "40%",
            bottom: 0,
            position: "absolute",
            alignSelf: "center",
            width: "100%",
            backgroundColor: theme.colors.backgroundPrimary,
          },
        }),
      [bottom, height]
    )
  );
};
