import React, { useCallback } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, useTheme, useThemedStyle } from "atlas-design-system";

const COLOR_KEYS = [
  { key: "primary", label: "Primary" },
  { key: "primaryLowContrast", label: "Primary Low Contrast" },
  { key: "secondaryPositive", label: "Secondary Positive" },
  { key: "secondaryNegative", label: "Secondary Negative" },
  { key: "secondaryWarning", label: "Secondary Warning" },
  { key: "foreground", label: "Foreground" },
  { key: "foregroundHighContrast", label: "Foreground High Contrast" },
  { key: "foregroundLowContrast", label: "Foreground Low Contrast" },
  { key: "foregroundPrimary", label: "Foreground Primary" },
  { key: "foregroundNegative", label: "Foreground Negative" },
  { key: "foregroundOnPrimary", label: "Foreground On Primary" },
  { key: "border", label: "Border" },
  { key: "borderSecondary", label: "Border Secondary" },
  { key: "backgroundPrimary", label: "Background Primary" },
  { key: "backgroundOnPrimary", label: "Background On Primary" },
] as const;

export default function ColorsGallery() {
  const styles = useStyles().styles;
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {COLOR_KEYS.map(({ key, label }) => {
        const color = theme.colors[key];
        return (
          <View key={key} style={styles.row}>
            <View style={[styles.swatch, { backgroundColor: color }]} />
            <View style={styles.info}>
              <Text category="p1">{label}</Text>
              <Text category="p2">{color}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            padding: t.size.baseSize * 4,
            rowGap: t.size.baseSize * 3,
          },
          row: {
            flexDirection: "row",
            alignItems: "center",
            columnGap: t.size.baseSize * 3,
          },
          swatch: {
            width: 48,
            height: 48,
            borderRadius: t.borderRadius,
            borderWidth: t.borderWidth,
            borderColor: t.colors.border,
          },
          info: {
            flex: 1,
            rowGap: t.size.baseSize,
          },
        }),
      []
    )
  );
