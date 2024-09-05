import { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Sheet, useThemedStyle, Button, Text } from "atlas-design-system";

export default function DateTimeInputGallery() {
  const styles = useStyles().styles;
  const [open, setOpen] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        text="Open Sheet"
        onPress={() => {
          setOpen(true);
        }}
      />
      <Sheet open={open} setOpen={setOpen} header='Sheet Header'>
        <Text>Hi</Text>
      </Sheet>
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
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
