import { FieldProps, useField } from "informed";
import { useMemo } from "react";

import SelectInput, { SelectInputProps } from "../../SelectInput";
import { Option } from "../../SelectInput/types";

type FormSelectInputProps<T> = Omit<SelectInputProps<T>, "options"> & {
  options: Omit<Option<T>, "selected">[];
};
type Props<T> = FieldProps<FormSelectInputProps<T>>;
export function FormSelectInput<T>(props: Props<T>) {
  const { render, userProps, fieldApi, informed, fieldState } = useField<
    FormSelectInputProps<T>,
    T
  >({
    ...props,
  });

  const { value } = informed;
  const { error } = fieldState;

  const options = useMemo(() => {
    return userProps.options.map((v) => {
      return {
        ...v,
        selected: v.value === value,
      };
    });
  }, [userProps.options, value]);

  return render(
    <SelectInput
      onChange={(v) => {
        fieldApi.setValue(v.value);
      }}
      //@ts-expect-error no types yet :(
      error={error}
      {...userProps}
      options={options}
    />
  );
}
