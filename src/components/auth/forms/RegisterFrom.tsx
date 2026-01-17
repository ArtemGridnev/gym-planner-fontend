import { Box } from "@mui/material";
import useRegister from "../../../hooks/auth/useRegister";
import Form from "../../form/Form";
import Alerts from "../../train/Alerts";
import { useEffect } from "react";

type RegisterFormProps = {
    onSuccess: () => void;
};

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
    const {
        formFields,
        handleSubmit,
        success,
        error,
        loading
    } = useRegister();

    useEffect(() => {
        if (success) onSuccess();
    }, [success]);

    return (
        <>
            <Alerts success={success} error={error} />
            <Box>
                <Form formFields={formFields} submitButtonText="Sign up" onSubmit={handleSubmit} isLoading={loading} />
            </Box>
        </>
    )
}
