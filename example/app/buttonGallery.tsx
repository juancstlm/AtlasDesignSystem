import React, { useState, useCallback } from "react";
import { ScrollView, View, StyleSheet, Alert } from "react-native";

import { Button, useThemedStyle, TextInput } from "atlas-design-system";

export default function ButtonGallery() {
  const styles = useStyles().styles;

  const [sampleText, setSetsampleText] = useState("The quick brown fox");

  const onPress = () => {
    Alert.alert('Alert', 'button pressed')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Enter button text here"
        value={sampleText}
        onChangeText={setSetsampleText}
      />
      <View style={styles.section}>
        <Button onPress={onPress} text={sampleText}></Button>
        <Button appearance='secondary' onPress={onPress} text={sampleText}></Button>
        <Button loading onPress={onPress} text={sampleText}></Button>
        <Button onPress={onPress} appearance='destructive' text={sampleText}></Button>
        <Button disabled text={sampleText}></Button>
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
