import { FieldProps, useField } from "informed";

import { DateTimeInput, DateTimeInputProps } from "../../DateTimeInput";
export const FormDateTimeInput = (props: FieldProps<DateTimeInputProps>) => {
  const { render, userProps, fieldApi, informed } = useField<
    DateTimeInputProps,
    Date
  >({
    type: "date",
    ...props,
  });

  return render(
    <DateTimeInput
      value={informed.value}
      onSave={fieldApi.setValue}
      {...userProps}
    />
  );
};

export default FormDateTimeInput;
