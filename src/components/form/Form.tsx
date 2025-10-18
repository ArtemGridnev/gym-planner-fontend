import { Box, Button, CircularProgress } from "@mui/material"
import type { FormFieldProps } from "./FormField"
import FormField from "./FormField"

export type FormCompFieldProps = {
    name: string;
    label: string;
    type: "text" | "email" | "password";
    required?: boolean;
};

type FormProps = {
    formFields: FormCompFieldProps[];
    form: Record<string, string>;
    errors: Record<string, string | null>;
    handleChange: (field: string, value: string) => void;
    handleBlur: (field: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
};

export default function Form({
    formFields,
    form,
    errors,
    handleChange,
    handleBlur,
    onSubmit,
    loading
}: FormProps) {
    const getField = (field: FormCompFieldProps, index: number) => {
        const fieldProps: FormFieldProps = {
            ...field,
            value: form[field.name],
            error: errors[field.name],
            onChange: handleChange,
            onBlur: handleBlur
        };

        return (
            <FormField {...fieldProps} key={index}></FormField>
        );
    };

    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
            onSubmit={(e) => onSubmit(e)}
            noValidate
        >
            {formFields.map((field, index) => getField(field, index))}
            <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={20} color="inherit" /> : "Sing Up"}
            </Button>
        </Box>
    );
}