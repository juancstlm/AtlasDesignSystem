import { ScrollView } from "react-native";
import { router } from "expo-router";

import { NavigationListRow } from "atlas-design-system";

export default function Index() {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <NavigationListRow
        onPress={() => {
          router.navigate("/dateTimeInputGallery");
        }}
        label="Date Time Input"
      ></NavigationListRow>
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
      ></NavigationListRow>
    </ScrollView>
  );
}
