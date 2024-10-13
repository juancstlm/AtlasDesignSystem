import { ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";

import { NavigationListRow, Text, useThemedStyle } from "atlas-design-system";
import { useCallback } from "react";

export default function Index() {
  const styles = useStyles().styles;
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      ></NavigationListRow>
      <NavigationListRow
        onPress={() => {
          router.navigate("/textGallery");
        }}
        label="Text"
      ></NavigationListRow>
      <NavigationListRow
        onPress={() => {
          router.navigate("/buttonGallery");
        }}
        label="Button"
      ></NavigationListRow>
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

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            flex: 1,
            alignItems: "center",
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
