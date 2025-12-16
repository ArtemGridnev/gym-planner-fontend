import { TextField } from "@mui/material";
import PasswordField from "../fields/PasswordField";
import type { FormFieldSchema } from "../../types/formFieldSchema";
import Select from "../fields/Select";
import SearchSelect from "../fields/SearchSelect";
import NumberField from "../fields/NumberField";
import CronField from "../fields/CronField";
import SearchSelectMultiple from "../fields/SearchSelectMultiple";

export type FormFieldProps = FormFieldSchema & {
    value: string;
    error?: string | null;
    onChange: (name: string, value: string) => void;
    onBlur?: (name: string) => void;
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
                    required={required}
                    onChange={({ target: { value: inputValue } }) => onChange(name, inputValue)}
                    onBlur={() => onBlur?.(name)}
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
                    onBlur={() => onBlur?.(name)}
                    error={!!error}
                    helperText={error}
                    options={props.options}
                />  
            );

        case 'searchSelect':
            return (
                <SearchSelect 
                    input={{
                        label,
                        required,
                        error: !!error,
                        helperText: error
                    }}
                    value={value}
                    onChange={(selectedOption) => onChange(name, selectedOption?.id.toString() || '')}
                    onBlur={() => onBlur?.(name)}
                    options={props.options}
                />
            );
        
        case 'searchSelectMultiple':
            return (
                <SearchSelectMultiple 
                    input={{
                        label,
                        required,
                        error: !!error,
                        helperText: error
                    }}
                    value={value}
                    onChange={(selectedOptions) => onChange(name, selectedOptions.map(o => o.id).join(','))}
                    onBlur={() => onBlur?.(name)}
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
                  onBlur={() => onBlur?.(name)}
                  error={!!error}
                  helperText={error}
                />
            );

        case 'cron':
            return (
                <CronField 
                    fields={props.fields}
                    onChange={(cron) => onChange(name, cron)}
                    value={value}
                 />
            );

        case 'textarea': 
        case 'text': 
        case 'email':
            return (
                <TextField
                    label={label}
                    aria-label={label}
                    type={type}
                    required={required}
                    onChange={({ target: { value: inputValue } }) => onChange(name, inputValue)}
                    onBlur={() => onBlur?.(name)}
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