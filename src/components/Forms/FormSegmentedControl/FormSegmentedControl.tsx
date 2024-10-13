import { FieldProps, useField } from "informed";
import SegmentedControl, {
  SegmentedControlProps,
} from "../../SegmentedControl";
import { useMemo } from "react";
import { Option } from "../../SelectInput/types";

type FormSegmentedControlProps<T> = Omit<
  SegmentedControlProps<T>,
  "options"
> & {
  options: Omit<Option<T>, "selected">[];
};

export function FormSegmentedControl<T>(
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

  return render(
    <SegmentedControl
      onChange={(v) => {
        fieldApi.setValue(v.value);
      }}
      //@ts-expect-error no types yet :(
      error={fieldState.error}
      {...userProps}
      options={options}
    />
  );
}
