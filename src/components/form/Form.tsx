import { Box, Button, CircularProgress } from "@mui/material";
import type { FormFieldSchema } from '../../types/form/formFieldSchema';
import FormField from "./FormField";
import FormProvider from "./FormProvider";
import { type FieldValues } from "react-hook-form";

type FormProps = {
    formFields: FormFieldSchema[];
    initialValues?: FieldValues;
    submitButtonText: string;
    isLoading?: boolean;
    onSubmit: (data: FieldValues) => void;
};

export default function Form({
    formFields,
    initialValues,
    submitButtonText,
    isLoading,
    onSubmit,
}: FormProps) {
    return (
        <FormProvider onSubmit={onSubmit} initialValues={initialValues}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}
            >
                {formFields.map((field, index) => (
                    <FormField 
                        {...field} 
                        key={index}
                    ></FormField>
                ))}

                <Button type="submit" variant="contained" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={20} color="inherit" /> : submitButtonText}
                </Button>
            </Box>
        </FormProvider>
    );
}