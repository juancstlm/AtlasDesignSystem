import { ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { NavigationListRow, Text, useThemedStyle } from "atlas-design-system";
import { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const styles = useStyles().styles;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionHeader} category="h2">
        Components
      </Text>
      <NavigationListRow
        onPress={() => {
          router.navigate("/searchGallery");
        }}
        label="Search"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/segmentedControlGallery");
        }}
        label="Segmented Control"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/radioOptionGallery");
        }}
        label="Radio Option"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/radioOptionInputGallery");
        }}
        label="Radio Option Input"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/checkboxOptionInputGallery");
        }}
        label="Checkbox Option Input"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/dateTimeInputGallery");
        }}
        label="Date Time Input"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/textInputGallery");
        }}
        label="Text Input"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/selectInputGallery");
        }}
        label="Select Input"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/switchToggleInputGallery");
        }}
        label="Switch Toggle"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/textGallery");
        }}
        label="Text"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/buttonGallery");
        }}
        label="Button"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/sheetGallery");
        }}
        label="Sheet"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/navigationListRowGallery");
        }}
        label="Navigation List Row"
      />
      <Text style={styles.sectionHeader} category="h2">
        Form Components
      </Text>
      <NavigationListRow
        onPress={() => {
          router.navigate("/formTextInputGallery");
        }}
        label="Form Text Input"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/formSwitchToggleGallery");
        }}
        label="Form Switch Toggle"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/formDateTimeInputGallery");
        }}
        label="Form Date Time Input"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/formSelectInputGallery");
        }}
        label="Form Select Input"
      />
      <NavigationListRow
        onPress={() => {
          router.navigate("/formSegmentedControlGallery");
        }}
        label="Form Segmented Control"
      />
    </ScrollView>
  );
}

const useStyles = () => {
  const bottom = useSafeAreaInsets();
  return useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            paddingBottom: bottom.bottom + t.size.baseSize * 4,
          },
          sectionHeader: {
            paddingTop: t.size.baseSize * 4,
            paddingHorizontal: t.size.baseSize * 4,
            alignSelf: "flex-start",
            paddingBottom: t.size.baseSize * 2,
          },
        }),
      []
    )
  );
};
