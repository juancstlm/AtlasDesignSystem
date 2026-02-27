import { FieldProps, useField } from "informed";
import { useMemo } from "react";

import {
  SegmentedControlProps,
  SegmentedControl,
} from "../../SegmentedControl";
import { Option } from "../../SelectInput/types";

export type FormSegmentedControlProps<T> = Omit<
  SegmentedControlProps<T>,
  "options"
> & {
  options: Omit<Option<T>, "selected">[];
};

function FormSegmentedControl<T>(
  props: FieldProps<FormSegmentedControlProps<T>>
) {
  const { render, userProps, fieldApi, informed, fieldState } = useField<
    FormSegmentedControlProps<T>,
    T
  >({
    ...props,
  });

  const { value } = informed;

  const options = useMemo(() => {
    return userProps.options.map((v) => {
      return {
        ...v,
        selected: v.value === value,
      };
    });
  }, [userProps.options, value]);

  const error = fieldState.error as string | undefined;

  return render(
    <SegmentedControl
      onChange={(v) => {
        fieldApi.setValue(v.value);
      }}
      error={error}
      {...userProps}
      options={options}
    />
  );
}

export default FormSegmentedControl;
