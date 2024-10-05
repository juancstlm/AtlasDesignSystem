import { useCallback, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

import { FormApi } from "informed";

import {
  useThemedStyle,
  FormTextInput,
  Form,
  Button,
} from "atlas-design-system";
import { getGalleryStyles } from "@/common";

type FormType = {
  favorite_food?: string;
};

export default function FormTextInputGallery() {
  const styles = useStyles().styles;
  const formRef = useRef<FormApi>();
  const [enabled, setEnabled] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Form
        validateOn="change"
        allowEmptyStrings={false}
        onSubmit={(formState) => {
          const { values } = formState;
          const typedValue: FormType = values;
          Alert.alert("Your Favorite Food", typedValue.favorite_food);
        }}
        onValid={() => {
          setEnabled(true);
        }}
        onInvalid={() => {
          setEnabled(false);
        }}
        formApiRef={formRef}
      >
        <View style={styles.formContainer}>
          <FormTextInput required name="name" label="Enter your name" />
          <FormTextInput
            required
            name="favorite_food"
            label="Enter your favorite food"
          />
        </View>
      </Form>
      <Button
        disabled={!enabled}
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
