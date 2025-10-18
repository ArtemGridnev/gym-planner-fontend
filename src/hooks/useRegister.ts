import { useEffect, useState } from "react";
import { register } from "../services/authService";
import useFormState from "./useFormState";
import { registerFormFields as formFields } from "../forms/registerFormFields";
import { minLength, validateEmail, validatePassword, isNotEmpty } from "../utils/validation";
import { useAuthContext } from "../context/AuthProvider";

export default function useRegister() {
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
                        case 'firstName':
                            if (!minLength(value, 2)) {
                                errorMessage = "First name should be at least two characters long.";
                            }
                            break;
                        case 'lastName':
                            if (!minLength(value, 2)) {
                                errorMessage = "Last name should be at least two characters long.";
                            }
                            break;
                        case 'email':
                            if (!validateEmail(value)) {
                                errorMessage = "Not valid email.";
                            }
                            break;
                        case 'password':
                            errorMessage = validatePassword(value);
                            break;
                        case 'validatePassword':
                            if (value !== form.password) {
                                errorMessage = "Please make sure it matches the password field.";
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
        formState,
        handleSubmit,
        loading,
        success,
        error
    });
}