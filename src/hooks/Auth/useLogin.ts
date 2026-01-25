import { useState } from "react";
import { login } from "../../services/authService";
import { useAuthContext } from "../../context/AuthProvider";
import { loginFormFields as formFields } from "../../forms/loginFormFields.schema";
import type { FieldValues } from "react-hook-form";

export default function useLogin() {
    const { setUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (form: FieldValues) => {
        setIsLoading(true);
        setSuccess(null);
        setError(null);

        if (!form) {
            setIsLoading(false);
            return;
        }

        try {
            const data = await login(form.email!, form.password!);

            setUser(data.user);
            
            setSuccess('Logged in successfully!');
        } catch (err: any) {
            setError(err.message || "Login failed");
        }

        setIsLoading(false);
    };

    return ({
        formFields,
        handleSubmit,
        isLoading,
        success,
        error
    });
}