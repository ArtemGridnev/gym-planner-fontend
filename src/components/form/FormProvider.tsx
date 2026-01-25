import { Box } from "@mui/material";
import { useEffect } from "react";
import { FormProvider as RHFProvider, useForm, type FieldValues } from "react-hook-form";

export type FormProviderProps = {
    onSuccess: (data: FieldValues) => void;
    children: React.ReactNode;
    initialValues?: FieldValues;
};

export default function FormProvider({ children, onSuccess, initialValues }: FormProviderProps) {
    const methods = useForm({ 
        mode: 'onBlur'
    });

    useEffect(() => {
        methods.reset(initialValues || {});
    }, [initialValues, methods]);

    return (
        <RHFProvider {...methods}>
            <Box
                component="form"
                onSubmit={methods.handleSubmit(onSuccess)}
                noValidate
            >
                {children}
            </Box>
        </RHFProvider>
    );
}