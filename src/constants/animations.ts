import { Easing } from "react-native-reanimated";

export const DEFAULT_EASING = Easing.inOut(Easing.quad);
export const DEFAULT_TIMING_CONFIG = {
  duration: 150,
  easing: DEFAULT_EASING,
};

export const LABEL_INTERPOLATION_RANGE = [0, 1];
export const LABEL_INTERPOLATION_OUTPUT_RANGE = [1, -9];