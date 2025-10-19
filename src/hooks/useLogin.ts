import { useEffect, useState } from "react";
import { login } from "../services/authService";
import { useAuthContext } from "../context/AuthProvider";
import { loginFormFields as formFields } from "../forms/loginFormFields";
import useFormState from "./useFormState";
import { isNotEmpty, validateEmail } from "../utils/validation";

export default function useLogin() {
    const initialValues = formFields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});
    const formState = useFormState(initialValues);
    const { setUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        form,
        errors,
        touched,
        handleError
    } = formState;

    const validateFields = (validateAll = false): boolean => {
        let isValid = true;

        formFields.forEach(formField => {
            const name = formField.name;
            const required = formField.required;
            const value = form[name];

            if (touched[name] || errors[name] || validateAll) {
                let errorMessage: string | null = null;

                if (required && !isNotEmpty(value)) {
                    errorMessage = "This Field is required.";
                } else {
                    switch (name) {
                        case 'email':
                            if (!validateEmail(value)) {
                                errorMessage = "Not valid email.";
                            }
                            break;
                    }
                }

                if (errorMessage) {
                    handleError(name, errorMessage);
                    isValid = false;
                } else {
                    handleError(name, null);
                }
            }
        });

        return isValid;
    };

    useEffect(() => {
        validateFields();
    }, [form, touched]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setSuccess(null);
        setError(null);

        const isValid = validateFields(true);

        if (!isValid) {
            setLoading(false);
            return;
        }

        try {
            const data = await login(form.email, form.password);

            setUser(data.user);
            
            setSuccess('Logged in successfully!');
        } catch (err: any) {
            setError(err.message || "Login failed");
        }

        setLoading(false);
    };

    return ({
        formFields,
        formState,
        handleSubmit,
        loading,
        success,
        error
    });
}