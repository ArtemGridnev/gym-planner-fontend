import { Box } from "@mui/material";
import useRegister from "../../hooks/Auth/useRegister";
import Form from "../form/Form";
import Alerts from "../Alerts";
import { useEffect } from "react";

type RegisterFormProps = {
    onSuccess: () => void;
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
        if (success) onSuccess();
    }, [success]);

    return (
        <>
            <Alerts success={success} error={error} />
            <Box>
                <Form formFields={formFields} {...formState} submitButtonText="Sign up" onSubmit={handleSubmit} loading={loading} />
            </Box>
        </>
    )
}
