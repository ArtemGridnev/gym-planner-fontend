import { TextField } from "@mui/material";
import PasswordField from "./PasswordField";

export type FormFieldProps = {
    name: string;
    label: string;
    type: "text" | "email" | "password";
    required?: boolean;
    value: string;
    error: string | null;
    onChange: (name: string, value: string) => void;
    onBlur: (name: string) => void;
};

export default function FormField({
    name,
    label,
    type,
    required,
    value,
    error,
    onChange,
    onBlur
}: FormFieldProps) {
    if (type === "password") {
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
    }

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
        ></TextField>
    );
}