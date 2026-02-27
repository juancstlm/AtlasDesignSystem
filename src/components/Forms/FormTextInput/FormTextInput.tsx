import React from 'react';
import { FieldProps, useField } from 'informed';

import { TextInput, TextInputProps } from '../../TextInput';

const FormTextInput = (props: FieldProps<TextInputProps>) => {
  const { render, userProps, fieldApi, informed, fieldState } = useField<TextInputProps, string>({
    type: 'text',
    ...props,
  });

  const { value } = informed;
  const error = fieldState.error as string | undefined;

  return render(
    <TextInput
      error={error}
      onChangeText={fieldApi.setValue}
      {...userProps}
      value={value}
    />);
};

export default FormTextInput;
