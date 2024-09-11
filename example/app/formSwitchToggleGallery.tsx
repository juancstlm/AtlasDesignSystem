import { useCallback, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

import { FormApi } from "informed";

import {
  useThemedStyle,
  FormSwitchToggle,
  Form,
  Button,
} from "atlas-design-system";

type FormType = {
  likes_f1?: string 
}

export default function FormSwitchToggleInputGallery() {
  const styles = useStyles().styles;
  const formRef = useRef<FormApi>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Form
        validateOn="change"
        allowEmptyStrings={false}
        onSubmit={(formState) => {
          const { values } = formState;
          const typedValue: FormType = values;

          if (typedValue.likes_f1) {
            Alert.alert("Checkerd Flagg", 'You won the race!');
          } else {
            Alert.alert("Black Flagg", "You were given a black flag");
          }
        }}
        formApiRef={formRef}
      >
        <FormSwitchToggle
          required
          name="likes_f1"
          label="Do you like Formula 1"
        />
      </Form>
      <Button
        text="Submit"
        onPress={() => {
          formRef.current?.submitForm();
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
            rowGap: t.size.baseSize * 2,
            paddingTop: t.size.baseSize * 4,
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
