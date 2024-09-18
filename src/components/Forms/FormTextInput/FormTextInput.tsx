import React from 'react';
import { FieldProps, useField } from 'informed';

import { TextInput, TextInputProps } from '../../TextInput';

export const FormTextInput = (props: FieldProps<TextInputProps>) => {
  const { render, userProps, fieldApi, informed, fieldState } = useField<TextInputProps, string>({
    type: 'text',
    ...props,
  });

  const { value } = informed;
  const { error } = fieldState

  return render(
    <TextInput
      //@ts-expect-error no types yet
      error={error}
      onChangeText={fieldApi.setValue}
      {...userProps}
      value={value}
    />);
};

export default FormTextInput;
