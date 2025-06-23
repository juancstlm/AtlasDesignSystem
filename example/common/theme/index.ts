import { createContext, useContext } from "react";
import { ATLAS_LIGHT } from "atlas-design-system";

import { CustomDarkTheme } from "./CustomDarkTheme";

type ThemeIdContextType = {
  id: "light" | "dark";
  setId: (id: "light" | "dark") => void;
};

const initialState: ThemeIdContextType = {
  id: "light",
  setId: (id: "light" | "dark") => {},
};

export const ThemeIdContext = createContext<ThemeIdContextType>(initialState);

export const useThemeId = () => {
  const { id, setId } = useContext(ThemeIdContext);
  return { id, setId };
};

export const getThemeFromId = (id: "light" | "dark") => {
  return id === "light" ? ATLAS_LIGHT : CustomDarkTheme;
};
