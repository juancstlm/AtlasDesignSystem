import { useCallback, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

import { FormApi } from "informed";

import {
  useThemedStyle,
  FormDateTimeInput,
  Form,
  Button,
} from "atlas-design-system";
import moment from "moment";
import { getGalleryStyles } from "@/common";

type FormType = {
  favorite_day?: Date;
};

export default function FormDateTimeInputGallery() {
  const styles = useStyles().styles;
  const formRef = useRef<FormApi>();
  const [enabled, setEnabled] = useState(false);

  const initialValues = useRef<FormType>({ favorite_day: new Date() });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Form
        validateOn="change"
        allowEmptyStrings={false}
        initialValues={initialValues.current}
        onSubmit={(formState) => {
          const { values } = formState;
          const typedValue: FormType = values;
          Alert.alert(
            "Your Favorite Time Is",
            moment(typedValue.favorite_day).format("lll")
          );
        }}
        onValid={() => {
          setEnabled(true);
        }}
        onInvalid={() => {
          setEnabled(false);
        }}
        formApiRef={formRef}
        style={styles.formContainer}
      >
        <FormDateTimeInput
          required
          name="favorite_day"
          label="Enter your favorite day"
        />
        <FormDateTimeInput
          required
          name="favorite_day"
          mode="time"
          label="Enter your favorite time"
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
          ...getGalleryStyles(t),
        }),
      []
    )
  );
