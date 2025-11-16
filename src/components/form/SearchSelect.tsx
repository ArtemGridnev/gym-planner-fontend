import { Autocomplete, TextField, type TextFieldProps } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import type { SearchSelectOption } from "../../types/formFieldSchema";

type SearchSelectProps = Omit<TextFieldProps, 'onChange'> & {
    options: SearchSelectOption[] | (() => Promise<SearchSelectOption[]>);
    onChange: (selectedOption: SearchSelectOption | null) => void,
};

export default function SearchSelect({ options, onChange, value, ...props }: SearchSelectProps) {
    const [selectOptions, setSelectOptions] = useState<SearchSelectOption[]>([]);

    const selectOptionsMap = useMemo(() => {
        const map = new Map();

        selectOptions.forEach(option => {
            map.set(option.id.toString(), option);
        });

        return map;
    }, [selectOptions])

    const fetchOptions = async (fun: () => Promise<SearchSelectOption[]>) => {
        const options = await fun();

        setSelectOptions(options);
    };

    useEffect(() => {
        if (options instanceof Function) {
            fetchOptions(options);
        } else {
            setSelectOptions(options);
        }
    }, [options]);

    return (
        <Autocomplete
            disablePortal
            options={selectOptions}
            onChange={(e, option) => {
                onChange(option || null);
            }}
            value={selectOptionsMap.get(value) ?? null}
            renderInput={(params) => <TextField {...props} {...params}  />}
        />
    );
}
