import { TextField, type TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import type { SelectOption } from "../../types/form/formFieldSchema";

type SelectFieldProps = Omit<TextFieldProps, 'onChange'> & {
    options: SelectOption[] | (() => Promise<SelectOption[]>);
    onChange: (option: SelectOption) => void;
};

export default function Select({ options, onChange, ...props }: SelectFieldProps) {
    const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);

    const fetchOptions = async (fun: (() => Promise<SelectOption[]>)) => {
        const options = await fun();
        setSelectOptions(options);
    };

    const handleChnage = (inputValue: string) => {
        const value = selectOptions.find(op => op.value === inputValue);

        if (!value) return;

        onChange(value);
    }

    useEffect(() => {
        if (options instanceof Function) {
            fetchOptions(options);
        } else {
            setSelectOptions(options);
        }
    }, [options]);

    return (
        <TextField
            onChange={({ target: { value: inputValue } }) => handleChnage(inputValue)}
            { ...props }
            select
        >
            {selectOptions?.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>  
            ))}
        </TextField>
    );
}
