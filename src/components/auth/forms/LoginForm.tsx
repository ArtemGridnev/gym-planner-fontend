import { Box } from "@mui/material";
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
                <Form formFields={formFields} submitButtonText="Sign in" onSubmit={handleSubmit} isLoading={loading} />
            </Box>
        </>
    );
}