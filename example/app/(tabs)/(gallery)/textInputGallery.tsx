import { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TextInput, useThemedStyle } from "atlas-design-system";

import { getGalleryStyles } from "@/common";

export default function TextInputGallery() {
  const styles = useStyles().styles;
  const [text, setText] = useState("");
  const [multilineText, setMultilineText] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput value={text} onChangeText={setText} label="Text Input" />
      <TextInput disabled value="Canot Be eddited" label="Dissabled Input" />
      <TextInput
        disabled
        error="Value should be a number"
        value="Lots"
        label="Enter your salary"
      />
      <TextInput
        error={!text ? "This field is required" : undefined}
        value={text}
        onChangeText={setText}
        label="Text Input (required)"
      />
      <TextInput
        value={multilineText}
        onChangeText={setMultilineText}
        label="Multiline Text Input"
        multiline
        numberOfLines={4}
      />
    </ScrollView>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          ...getGalleryStyles(t),
        }),
      []
    )
  );
