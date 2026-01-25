import { Autocomplete, TextField, type AutocompleteProps, type TextFieldProps } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import type { SearchSelectOption } from "../../types/form/formFieldSchema";

type SearchSelectProps = Omit<AutocompleteProps<SearchSelectOption, false, false, false>, 'onChange' | 'options' | 'renderInput' | 'value'> & {
    options: SearchSelectOption[] | (() => Promise<SearchSelectOption[]>);
    onChange: (selectedOption: SearchSelectOption | null) => void;
    value?: SearchSelectOption | null;
    input?: TextFieldProps;
};

export default function SearchSelect({ options, onChange, value, input, ...props }: SearchSelectProps) {
    const [selectOptions, setSelectOptions] = useState<SearchSelectOption[]>([]);

    const map = useMemo(() => {
        const m = new Map();

        selectOptions.forEach(option => {
            m.set(option.id, option);
        });

        return m;
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
        <Autocomplete<SearchSelectOption>
            {...props}
            disablePortal
            options={selectOptions}
            onChange={(_, option) => {
                onChange(option);
            }}
            value={map.get(value?.id) ?? null}
            renderInput={(params) => <TextField {...input} {...params}  />}
        />
    );
}
