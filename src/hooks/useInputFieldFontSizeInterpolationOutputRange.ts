import { useMemo } from "react";

import { getInputLabelFontSizeInterpolationOutputRange } from "../utils";

import { useTheme } from "./useTheme";

export const useInputFieldFontSizeInterpolationOutputRange = () => {
  const theme = useTheme();
  return useMemo(
    () => getInputLabelFontSizeInterpolationOutputRange(theme),
    [theme]
  );
};
