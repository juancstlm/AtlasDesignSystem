import React from 'react';
import { FieldProps, useField } from 'informed';

import { TextInput,  TextInputProps } from '../../TextInput';

export const FormTextInput = (props: FieldProps<TextInputProps>) => {
  const { render, userProps, fieldApi, informed } = useField<TextInputProps, string>({
    type: 'text',
    ...props,
  });

  const { value } = informed;

  return render(<TextInput onChangeText={fieldApi.setValue} {...userProps} value={value} />);
};

export default FormTextInput;
