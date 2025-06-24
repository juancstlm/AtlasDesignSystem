import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useCallback } from "react";

import { DEFAULT_TIMING_CONFIG } from "../constants/animations";

export const useInputFieldAnimatedBorder = (initialColor: string) => {
  const inputBorderColor = useSharedValue(initialColor); //starts hidden

  const setBorderColor = useCallback((color: string) => {
    inputBorderColor.value = withTiming(color, DEFAULT_TIMING_CONFIG);
  }, []);

  const borderStyle = useAnimatedStyle(
    () => ({
      borderColor: inputBorderColor.value,
    }),
    []
  );

  return {
    animatedBorderStyle: borderStyle,
    setBorderColor,
  };
};
