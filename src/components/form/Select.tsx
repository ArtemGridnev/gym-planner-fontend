import { TextField, type TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import type { SelectOption } from "../../types/formFieldSchema";

type PasswordFieldProps = TextFieldProps & {
    options: SelectOption[] | Promise<SelectOption[]>
};

export default function Select({ options, ...props }: PasswordFieldProps) {
    const [selectOptions, setSelectOptions] = useState<SelectOption[] | null>();

    const fetchOptions = async (promise: Promise<SelectOption[]>) => {
        const options = await promise;
        setSelectOptions(options);
    };

    useEffect(() => {
        if (options instanceof Promise) {
            fetchOptions(options);
        } else {
            setSelectOptions(options);
        }
    }, []);

    return (
        <TextField
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
