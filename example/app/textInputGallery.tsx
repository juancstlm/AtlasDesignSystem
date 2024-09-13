import { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { TextInput, useThemedStyle } from "atlas-design-system";

export default function TextInputGallery() {
  const styles = useStyles().styles;
  const [text, setText] = useState('');
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput value={text} onChangeText={setText} label="Text Input"/>
    </ScrollView>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            paddingTop: t.size.baseSize *4,
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
