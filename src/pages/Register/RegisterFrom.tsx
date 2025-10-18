import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import useRegister from "../../hooks/useRegister";
import Form from "../../components/form/Form";
import Alerts from "../../components/Alerts";
import { useEffect } from "react";

type RegisterFormProps = {
    onSuccess: () => void
};

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
    const {
        formFields,
        formState,
        handleSubmit,
        success,
        error,
        loading
    } = useRegister();

    useEffect(() => {
        if (success) {
            onSuccess();
        }
    }, [onSuccess]);

    return (
        <>
            <Alerts success={success} error={error} />
            <Typography variant="h5" gutterBottom>
                Sign up
            </Typography>
            <Box sx={{mt: 2}}>
                <Form formFields={formFields} {...formState} onSubmit={handleSubmit} loading={loading} />
            </Box>
        </>
    )
}
