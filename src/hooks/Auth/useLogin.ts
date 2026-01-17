import { useState } from "react";
import { login } from "../../services/authService";
import { useAuthContext } from "../../context/AuthProvider";
import { loginFormFields as formFields } from "../../forms/loginFormFields.schema";
import type { FieldValues } from "react-hook-form";

export default function useLogin() {
    const { setUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (form: FieldValues) => {
        setLoading(true);
        setSuccess(null);
        setError(null);

        if (!form) {
            setLoading(false);
            return;
        }

        try {
            const data = await login(form.email!, form.password!);

            setUser(data.user);
            
            setSuccess('Logged in successfully!');
        } catch (err: any) {
            setError(err.message || "Login failed");
        }

        setLoading(false);
    };

    return ({
        formFields,
        handleSubmit,
        loading,
        success,
        error
    });
}