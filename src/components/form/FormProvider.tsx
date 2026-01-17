import { Box } from "@mui/material";
import { useEffect } from "react";
import { FormProvider as RHFProvider, useForm, type FieldValues } from "react-hook-form";

type FormProviderProps = {
    onSubmit: (data: FieldValues) => void;
    children: React.ReactNode;
    initialValues?: FieldValues;
};

export default function FormProvider({ children, onSubmit, initialValues }: FormProviderProps) {
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
                onSubmit={methods.handleSubmit(onSubmit)}
                noValidate
            >
                {children}
            </Box>
        </RHFProvider>
    );
}