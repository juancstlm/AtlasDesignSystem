import React from 'react';
import { InformedProps, useForm } from 'informed';
import { View, ViewProps } from 'react-native';

export const Form: React.FC<InformedProps<ViewProps>> = ({ children, onValid, onInvalid, ...props }) => {
  const { render, userProps } = useForm({ ...props, onValid, onInvalid });
  // @ts-expect-error no types yet :/
  return render(<View {...userProps}>{children}</View>);
};

export default Form;