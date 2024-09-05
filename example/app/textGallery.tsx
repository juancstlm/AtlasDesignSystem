import React, { useState, useCallback } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

import { Text, useThemedStyle, TextInput } from "atlas-design-system";

export default function textGallery() {
  const styles = useStyles().styles;

  const [sampleText, setSetsampleText] = useState("The quick brown fox");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Enter Your Text Here"
        value={sampleText}
        onChangeText={setSetsampleText}
      />
      <View style={styles.section}>
        <Text category="h1">{sampleText}</Text>
        <Text category="h2">{sampleText}</Text>
        <Text category="h3">{sampleText}</Text>
        <Text category="p1">{sampleText}</Text>
        <Text category="p2">{sampleText}</Text>
        <Text category="p3">{sampleText}</Text>
      </View>
      <View style={styles.section}>
        <Text contrast='medium' category="h1">{sampleText}</Text>
        <Text contrast='medium' category="h2">{sampleText}</Text>
        <Text contrast='medium' category="h3">{sampleText}</Text>
        <Text contrast='medium' category="p1">{sampleText}</Text>
        <Text contrast='medium' category="p2">{sampleText}</Text>
        <Text contrast='medium' category="p3">{sampleText}</Text>
      </View>
      <View style={styles.section}>
        <Text contrast='low' category="h1">{sampleText}</Text>
        <Text contrast='low' category="h2">{sampleText}</Text>
        <Text contrast='low' category="h3">{sampleText}</Text>
        <Text contrast='low' category="p1">{sampleText}</Text>
        <Text contrast='low' category="p2">{sampleText}</Text>
        <Text contrast='low' category="p3">{sampleText}</Text>
      </View>
      <View style={styles.section}>
        <Text status="informative">{sampleText}</Text>
        <Text status="warning">{sampleText}</Text>
        <Text status="success">{sampleText}</Text>
        <Text status="error">{sampleText}</Text>
      </View>
    </ScrollView>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          section: {
            rowGap: t.size.baseSize * 2,
          },
          container: {
            rowGap: t.size.baseSize * 4,
            paddingVertical: t.size.baseSize * 4,
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
