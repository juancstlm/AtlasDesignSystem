import React, { useState, useCallback } from "react";
import { ScrollView, View, StyleSheet, Alert } from "react-native";

import { Button, useThemedStyle, TextInput, Text } from "atlas-design-system";

export default function ButtonGallery() {
  const styles = useStyles().styles;

  const [sampleText, setSetsampleText] = useState("The quick brown fox");

  const onPress = () => {
    Alert.alert("Alert", "button pressed");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Enter button text here"
        value={sampleText}
        onChangeText={setSetsampleText}
      />
      <View style={styles.section}>
        <Text>{"Primary"}</Text>
        <Button onPress={onPress} text={sampleText}></Button>
        <Text>{"Secondary"}</Text>
        <Button appearance="secondary" onPress={onPress} text={sampleText} />
        <Text>{"Loading"}</Text>
        <Button loading onPress={onPress} text={sampleText}></Button>
        <Text>{"Destructive"}</Text>
        <Button onPress={onPress} appearance="destructive" text={sampleText} />
        <Text>{"Disabled"}</Text>
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
