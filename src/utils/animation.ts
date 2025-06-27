import { AtlasTheme } from "../types";

/**
 * Gets the font size interpolation output range for animated input labels.
 * 
 * This function returns an array of font sizes used to animate text input labels
 * between two states - typically from a larger size when the input is empty/unfocused
 * to a smaller size when the input has content or is focused.
 * 
 * @param theme - The Atlas theme object containing typography definitions
 * @returns A tuple containing [largerFontSize, smallerFontSize] for label animation
 * 
 * @example
 * ```typescript
 * const theme = useTheme();
 * const [startSize, endSize] = getInputLabelFontSizeInterpolationOutputRange(theme);
 * // Use with react-native-reanimated interpolate function
 * const animatedStyle = useAnimatedStyle(() => ({
 *   fontSize: interpolate(animationValue, [0, 1], [startSize, endSize])
 * }));
 * ```
 */
export const getInputLabelFontSizeInterpolationOutputRange = (
  theme: AtlasTheme
) => {
  const { typography } = theme;
  return [typography.p1.fontSize, typography.p2.fontSize];
};
