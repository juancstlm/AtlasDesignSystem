import { useCallback, useRef } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

import { FormApi } from "informed";

import {
  useThemedStyle,
  FormSwitchToggle,
  Form,
  Button,
} from "atlas-design-system";
import { getGalleryStyles } from "@/common";

type FormType = {
  likes_f1?: boolean;
  likes_nascar?: boolean;
};

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
            Alert.alert("Checkerd Flagg", "You won the race!");
          } else {
            Alert.alert("Black Flagg", "You were given a black flag");
          }
        }}
        formApiRef={formRef}
      >
        <View style={styles.formContainer}>
          <FormSwitchToggle
            required
            name="likes_f1"
            label="Do you like Formula 1"
          />
          <FormSwitchToggle name="likes_nascar" label="Do you like Nascar" />
        </View>
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
          ...getGalleryStyles(t),
        }),
      []
    )
  );
