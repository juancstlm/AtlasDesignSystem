import { useState, useCallback } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

import { NavigationListRow, useThemedStyle } from "atlas-design-system";

export default function DateTimeInputGallery() {
  const styles = useStyles().styles;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NavigationListRow label="Max Verstappen" caption='3x World Champion' onPress={() => {
        Alert.alert('Max Max Max', 'Yes bois dis feels good!')
      }}/>
      <NavigationListRow label="Lewis Hamilton" caption='7x World Champion' onPress={() => {
        Alert.alert('Hammer Time', 'Get In There Lewis!!')
      }} />
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
