import { Autocomplete, TextField, type AutocompleteProps, type TextFieldProps, Chip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import type { SearchSelectOption } from "../../types/form/formFieldSchema";

type SearchSelectProps = Omit<AutocompleteProps<SearchSelectOption, true, false, false>, 'onChange' | 'options' | 'renderInput' | 'value'> & {
    options: SearchSelectOption[] | (() => Promise<SearchSelectOption[]>);
    onChange: (selectedOption: SearchSelectOption[]) => void;
    value?: SearchSelectOption[];
    input?: TextFieldProps;
};

export default function SearchSelectMultiple({ options, onChange, value: rawValue, input }: SearchSelectProps) {
    const [selectOptions, setSelectOptions] = useState<SearchSelectOption[]>([]);

    const map = useMemo(() => {
        const m = new Map();

        selectOptions.forEach(option => {
            m.set(option.id.toString(), option);
        });

        return m;
    }, [selectOptions]);

    const value = useMemo<SearchSelectOption[]>(() => {
        if (!rawValue) return [];

        return rawValue.map(op => map.get(op.id)).filter(Boolean);
    }, [rawValue]);

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
            multiple
            options={selectOptions}
            onChange={(_, options) => {
                onChange(options);
            }}
            value={value}
            renderInput={(params) => <TextField {...input} {...params} />}
            renderValue={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    label={option.label}
                    size={input?.size || 'medium'}
                    key={index}
                  />
                ))
            }
            sx={{
                "& .MuiAutocomplete-input": {
                    width: "auto !important",
                }
            }}
        />
    );
}
