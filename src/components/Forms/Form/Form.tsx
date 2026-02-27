import { InformedProps, useForm } from "informed";
import { View, ViewProps } from "react-native";

const Form = ({ children, ...rest }: InformedProps<ViewProps>) => {
  const { render, userProps } = useForm<ViewProps>(rest);
  return render(<View {...userProps}>{children}</View>);
};

export default Form;
