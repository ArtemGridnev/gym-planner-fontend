import { TextField } from "@mui/material";
import PasswordField from "./PasswordField";
import type { FormFieldSchema } from "../../types/formFieldSchema";
import Select from "./Select";
import SearchSelect from "./SearchSelect";
import NumberField from "./NumberField";

export type FormFieldProps = FormFieldSchema & {
    value: string;
    error: string | null;
    onChange: (name: string, value: string) => void;
    onBlur: (name: string) => void;
};

export default function FormField(props: FormFieldProps) {
    const {
        name,
        label,
        type,
        required,
        value,
        error,
        onChange,
        onBlur,
        ...otherProps
    } = props;

    switch (type) {
        case 'number':
            return (
                <NumberField
                    label={label}
                    aria-label={label}
                    type={type}
                    variant="outlined"
                    required={required}
                    onChange={({ target: { value: inputValue } }) => onChange(name, inputValue)}
                    onBlur={() => onBlur(name)}
                    value={value}
                    error={!!error}
                    helperText={error}
                    {...otherProps}
                />  
            );

        case 'select':
            return (
                <Select
                    label={label}
                    required={required}
                    value={value}
                    onChange={({ target: { value: inputValue } }) => onChange(name, inputValue)}
                    onBlur={() => onBlur(name)}
                    error={!!error}
                    helperText={error}
                    options={props.options}
                />  
            );

        case 'searchSelect':
            return (
                <SearchSelect 
                    label={label}
                    required={required}
                    value={value}
                    onChange={(selectedOption) => onChange(name, selectedOption?.id.toString() || '')}
                    onBlur={() => onBlur(name)}
                    error={!!error}
                    helperText={error}
                    options={props.options}
                />
            );

        case 'password':
            return (
                <PasswordField
                  label={label}
                  required={required}
                  value={value}
                  onChange={({ target: { value: inputValue } }) => onChange(name, inputValue)}
                  onBlur={() => onBlur(name)}
                  error={!!error}
                  helperText={error}
                />
            );

        default:
            return (
                <TextField
                    label={label}
                    aria-label={label}
                    type={type}
                    variant="outlined"
                    required={required}
                    onChange={({ target: { value: inputValue } }) => onChange(name, inputValue)}
                    onBlur={() => onBlur(name)}
                    value={value}
                    error={!!error}
                    helperText={error}
                    {...(type === "textarea" ? {
                        multiline: true,
                        minRows: 4.5,
                        maxRows: 6
                    } : {})}
                ></TextField>
            );
    }
}