import { Box, Typography } from "@mui/material";
import useLogin from "../../../hooks/auth/useLogin";
import Alerts from "../../train/Alerts";
import { useEffect } from "react";
import Form from "../../form/Form";

type LoginFormProps = {
    onSuccess: () => void;
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
            <Box>
                <Form formFields={formFields} {...formState} submitButtonText="Sign in" onSubmit={handleSubmit} loading={loading} />
            </Box>
        </>
    );
}