import { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { DateTimeInput, useThemedStyle } from "atlas-design-system";

export default function DateTimeInputGallery() {
  const styles = useStyles().styles;
  const [date, setDate] = useState(new Date());
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DateTimeInput value={date} onChange={setDate} label="Date Time Input"/>
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
