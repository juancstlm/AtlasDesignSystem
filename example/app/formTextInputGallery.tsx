import { useCallback, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

import { FormApi } from "informed";

import {
  useThemedStyle,
  FormTextInput,
  Form,
  Button,
} from "atlas-design-system";

type FormType = {
    favorite_food?: string 
}

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
        <FormTextInput
          required
          name="favorite_food"
          label="Enter your favorite food"
        />
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
          container: {
            rowGap: t.size.baseSize * 2,
            paddingTop: t.size.baseSize * 4,
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
