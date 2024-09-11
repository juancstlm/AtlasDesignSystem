import { FieldProps, useField } from "informed";

import { SwitchToggle, SwitchToggleProps } from "../../SwitchToggle";

export const FormSwitchToggle = (props: FieldProps<SwitchToggleProps>) => {
  const { render, userProps, fieldApi, informed } = useField<
    SwitchToggleProps,
    boolean
  >({
    type: "boolean",
    ...props,
  });

  const { value } = informed;

  return render(
    <SwitchToggle value={value} onChange={fieldApi.setValue} {...userProps} />
  );
};

export default FormSwitchToggle;
