import { FieldProps, useField } from "informed";

import { DateTimeInput, DateTimeInputProps } from "../../DateTimeInput";

const FormDateTimeInput = (props: FieldProps<DateTimeInputProps>) => {
  const { render, userProps, fieldApi, informed, fieldState } = useField<
    DateTimeInputProps,
    Date
  >({
    type: "date",
    ...props,
  });

  const error = fieldState.error as string | undefined;

  return render(
    <DateTimeInput
      error={error}
      value={informed.value}
      onSave={fieldApi.setValue}
      {...userProps}
    />
  );
};

export default FormDateTimeInput;
