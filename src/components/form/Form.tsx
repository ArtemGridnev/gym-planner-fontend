import { Box, Button, CircularProgress } from "@mui/material";
import Alerts from "../Alerts.tsx";
import type { FormFieldSchema } from "../../types/form/formFieldSchema.ts";
import FormField from "./FormField.tsx";
import FormProvider, { type FormProviderProps } from "./FormProvider.tsx";

export type FormProps = Omit<FormProviderProps, 'children'> & {
    formFields: FormFieldSchema[];
    submitButtonText: string;
    disabled?: boolean;
    isLoading?: boolean;
    success?: string | null,
    error?: string | null
};

export default function Form({ initialValues, onSuccess, formFields, submitButtonText, disabled, isLoading, success, error }: FormProps) {
    return (
        <>
            <Alerts success={success} error={error} />
            <FormProvider 
                initialValues={initialValues}
                onSuccess={onSuccess}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    {formFields.map((field, index) => (
                        <FormField 
                            disabled={disabled}
                            {...field} 
                            key={index}
                        ></FormField>
                    ))} 
                    <Button type="submit" variant="contained" disabled={isLoading || disabled}>
                        {isLoading ? <CircularProgress size={20} color="inherit" /> : submitButtonText}
                    </Button>
                </Box>
            </FormProvider>
        </>
    )
}
