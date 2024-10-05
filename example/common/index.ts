import { AtlasTheme } from "atlas-design-system";

export const getGalleryStyles = (t: AtlasTheme) => ({
  field: {
    marginBottom: t.size.baseSize * 4,
  },
  formContainer: {
    rowGap: t.size.baseSize * 4,
  },
  container: {
    rowGap: t.size.baseSize * 4,
    paddingTop: t.size.baseSize * 4,
    paddingHorizontal: t.size.baseSize * 4,
  },
});
