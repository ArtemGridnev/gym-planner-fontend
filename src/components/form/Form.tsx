import { Box, Button, CircularProgress } from "@mui/material";
import type { FormFieldSchema } from '../../types/formFieldSchema';
import FormField from "./FormField";

type FormProps = {
    formFields: FormFieldSchema[];
    form: Record<string, string>;
    errors: Record<string, string | null>;
    handleChange: (field: string, value: string) => void;
    handleBlur: (field: string) => void;
    submitButtonText: string,
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
};

export default function Form({
    formFields,
    form,
    errors,
    handleChange,
    handleBlur,
    submitButtonText,
    onSubmit,
    loading
}: FormProps) {
    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
            onSubmit={onSubmit}
            noValidate
        >
            {formFields.map((field, index) => (
                <FormField 
                    {...{
                        ...field,
                        value: form[field.name],
                        error: errors[field.name],
                        onChange: handleChange,
                        onBlur: handleBlur
                    }} 
                    key={index}
                ></FormField>
            ))}

            <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={20} color="inherit" /> : submitButtonText}
            </Button>
        </Box>
    );
}