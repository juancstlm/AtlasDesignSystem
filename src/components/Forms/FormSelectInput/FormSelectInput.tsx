import { FieldProps, useField } from "informed";
import SelectInput, { SelectInputProps } from '../../SelectInput'
import { useMemo } from "react";

export function FormSelectInput<T>(props: FieldProps<SelectInputProps<T>>) {
    const { render, userProps, fieldApi, informed, fieldState } = useField<SelectInputProps<T>, T>({
        ...props,
    });

    const { value } = informed;
    const { error } = fieldState

    const options = useMemo(() => {
        return userProps.options.map((v) => {
            return {
                ...v,
                selected: v.value === value
            }
        })
    }, [userProps.options, value])

    return render(
        <SelectInput
            onChange={(v) => {
                fieldApi.setValue(v.value)
            }}
            //@ts-expect-error no types yet :(
            error={error}
            {...userProps}
            options={options}
        />)
}