import { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Sheet, useThemedStyle, Button, Text } from "atlas-design-system";

export default function DateTimeInputGallery() {
  const styles = useStyles().styles;
  const [open, setOpen] = useState(false);
  const [openWithFooter, setOpenWithFooter] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        text="Open Sheet"
        onPress={() => {
          setOpen(true);
        }}
      />
      <Button
        text="Open Sheet with Footer"
        onPress={() => {
          setOpenWithFooter(true);
        }}
      />
      <Sheet open={open} setOpen={setOpen} header="Sheet Header">
        <Text>Hi</Text>
      </Sheet>
      <Sheet
        open={openWithFooter}
        setOpen={setOpenWithFooter}
        header="Sheet Header"
        footer={<Button text="Footer" onPress={() => {}} />}
      >
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
            rowGap: t.size.baseSize * 4,
            paddingTop: t.size.baseSize * 4,
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
