import React, { useCallback, useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";

import { useThemedStyle } from "../../hooks";
import { DEFAULT_TIMING_CONFIG } from "../../constants/animations";

type ChevronProps = {
  direction: "up" | "down";
};
export default function Chevron({ direction = "down" }: ChevronProps) {
  const styles = useStyles().styles;
  const rotation = useSharedValue(direction === "up" ? 1 : 0);

  useEffect(() => {
    rotation.value = withTiming(
      direction === "up" ? 1 : 0,
      DEFAULT_TIMING_CONFIG
    );
  }, [direction]);

  const animatedChevronStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateX: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` },
      ],
    };
  }, [rotation]);

  return (
    <Animated.View style={animatedChevronStyle}>
      <IonIcons style={styles.chevron} name="chevron-down-outline" size={20} />
    </Animated.View>
  );
}
const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          chevron: {
            paddingRight: t.size.baseSize * 2,
            color: t.colors.foreground,
          },
        }),
      []
    )
  );
