import { useCallback } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { NavigationListRow, useThemedStyle } from "atlas-design-system";

export default function NavigationListRowGallery() {
  const styles = useStyles().styles;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NavigationListRow
        label="Max Verstappen"
        caption="3x World Champion"
        onPress={() => {
          Alert.alert("Max Max Max", "Yes bois dis feels good!");
        }}
      />

      <NavigationListRow
        label="Lewis Hamilton"
        caption="7x World Champion"
        iconRightName="trophy-outline"
        onPress={() => {
          Alert.alert("Hammer Time", "Get In There Lewis!!");
        }}
      />

      <NavigationListRow
        label="Oscar Pastries"
        caption="The best pastries in the world"
        onPress={() => {
          Alert.alert("Oscar Pastries", "The best pastries in the world");
        }}
      />

      <NavigationListRow
        label="Best Quote"
        caption="Gentlemen, a short view back to the past. Thirty years ago, Niki Lauda told us ‘take a monkey, place him into the cockpit and he is able to drive the car.’ Thirty years later, Sebastian told us ‘I had to start my car like a computer, it’s very complicated.’ "
        onPress={() => {
          Alert.alert("Hammer Time", "Get In There Lewis!!");
        }}
      />
    </ScrollView>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            paddingTop: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
