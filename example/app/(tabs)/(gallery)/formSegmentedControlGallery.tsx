import { useCallback, useRef } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

import { FormApi } from "informed";

import {
  useThemedStyle,
  FormSegmentedControl,
  Form,
  Button,
} from "atlas-design-system";

type FormType = {
  favorite_driver?: string
}

export default function FormSegmentedControlGallery() {
  const styles = useStyles().styles;
  const formRef = useRef<FormApi>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Form
        validateOn="change"
        allowEmptyStrings={false}
        onSubmit={(formState) => {
          const { values } = formState;
          const typedValues: FormType = values;

          if (typedValues.favorite_driver === 'max_verstappen') {
            Alert.alert("Max Max Max", 'Super Super Max');
          } else {
            Alert.alert("Get In There Lewis", "It's Hammer Time");
          }
        }}
        formApiRef={formRef}
      >
        <FormSegmentedControl
          required
          name="favorite_driver"
          label="Who is your favorite driver"
          options={[
            {
              value: 'max_verstappen',
              label: 'Max Verstappen'
            },
            {
              value: 'lewis_hamilton',
              label: 'Lewis Hamilton'
            }
          ]}
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
