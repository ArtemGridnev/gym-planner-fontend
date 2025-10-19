import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import useLogin from "../../hooks/useLogin";
import Alerts from "../../components/Alerts";
import { useEffect } from "react";
import Form from "../../components/form/Form";

type LoginFormProps = {
    onSuccess: () => void
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const {
        formFields,
        formState,
        handleSubmit,
        success,
        error,
        loading
    } = useLogin();

    useEffect(() => {
        if (success) onSuccess();
    }, [success]);

    return (
        <>
            <Alerts success={success} error={error} />
            <Typography variant="h5" gutterBottom>
                Sign in
            </Typography>
            <Box sx={{mt: 2}}>
                <Form formFields={formFields} {...formState} onSubmit={handleSubmit} loading={loading} />
            </Box>
        </>
    );
}