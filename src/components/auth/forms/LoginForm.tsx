import useLogin from "../../../hooks/auth/useLogin";
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
        isLoading
    } = useLogin();

    useEffect(() => {
        if (success) onSuccess();
    }, [success]);

    return (
        <>
            <Form 
                onSuccess={handleSubmit} 
                formFields={formFields} 
                submitButtonText="Sign in" 
                isLoading={isLoading} 
                success={success}
                error={error}
            />
        </>
    );
}