import { TextField, type TextFieldProps } from "@mui/material";
import SearchSelectMultiple from "../fields/SearchSelectMultiple";
import SearchSelect from "../fields/SearchSelect";
import Select from "../fields/Select";
import NumberField from "../fields/NumberField";
import type { FilterFieldSchema } from "../../types/filterFieldSchema";

export type FilterFieldProps = FilterFieldSchema & {
    value: string;
    onChange: (name: string, value: string) => void;
    inputProps?: Omit<TextFieldProps, 'value' | 'onChange' | 'type'>
};

export default function FilterField(props: FilterFieldProps) {
    const {
        name,
        type,
        value,
        onChange,
        inputProps,
        ...otherProps
    } = props;

    switch (type) {
        case 'number':
            return (
                <NumberField
                    type={type}
                    onChange={({ target: { value: inputValue } }) => onChange(name, inputValue)}
                    value={value}
                    {...otherProps}
                    {...inputProps}
                />  
            );

        case 'select':
            return (
                <Select
                    value={value}
                    onChange={({ target: { value: inputValue } }) => onChange(name, inputValue)}
                    options={props.options}
                    {...inputProps}
                />  
            );

        case 'searchSelect':
            return (
                <SearchSelect
                    input={inputProps}
                    value={value}
                    onChange={(selectedOption) => onChange(name, selectedOption?.id.toString() || '')}
                    options={props.options}
                />
            );
        
        case 'searchSelectMultiple':
            return (
                <SearchSelectMultiple 
                    input={inputProps}
                    value={value}
                    onChange={(selectedOptions) => onChange(name, selectedOptions.map(o => o.id).join(','))}
                    options={props.options}
                />
            );

        case 'text': 
        case 'email':
        case 'search':
            return (
                <TextField
                    type={type}
                    onChange={({ target: { value: inputValue } }) => onChange(name, inputValue)}
                    value={value}
                    {...inputProps}
                ></TextField>
            );
    }
}