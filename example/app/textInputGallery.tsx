import { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { TextInput, useThemedStyle } from "atlas-design-system";

export default function TextInputGallery() {
  const styles = useStyles().styles;
  const [text, setText] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput value={text} onChangeText={setText} label="Text Input" />
      <TextInput disabled value="Canot Be eddited" label="Dissabled Input" />
      <TextInput disabled error="Value should be a number" value="Lots" label="Enter your salary" />
      <TextInput error={!text ? "This field is required" : undefined} value={text} onChangeText={setText} label="Text Input (required)" />
    </ScrollView>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            rowGap: t.size.baseSize * 4,
            paddingTop: t.size.baseSize * 4,
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
