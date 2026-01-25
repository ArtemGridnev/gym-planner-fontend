import { useState } from "react";
import { register } from "../../services/authService";
import { registerFormFields as formFields } from "../../forms/registerFormFields.schema";
import { useAuthContext } from "../../context/AuthProvider";
import type { FieldValues } from "react-hook-form";

export default function useRegister() {
    const { setUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (form: FieldValues) => {
        try {
            const data = await register({ 
                firstName: form.firstName, 
                lastName: form.lastName, 
                email: form.email, 
                password: form.password 
            });

            setUser(data.user);
            
            setSuccess('Registered successfully!');
        } catch (err: any) {
            setError(err.message || "Register failed");
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