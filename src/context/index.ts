import { createContext } from "react";

import { AtlasTheme } from "../types";
import { ATLAS_LIGHT } from "../themes";

export const ThemeContext = createContext<AtlasTheme>(ATLAS_LIGHT);