import useRegister from "../../../hooks/auth/useRegister";
import Form from "../../form/Form";
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
            <Form 
                formFields={formFields} 
                submitButtonText="Sign up" 
                onSuccess={handleSubmit} 
                isLoading={loading} 
                success={success} 
                error={error}
            />
        </>
    )
}
