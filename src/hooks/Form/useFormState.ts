import { useState } from "react";

export default function useFormState<T extends Record<string, any>>(initialValues: T) {
    const [form, setForm] = useState<T>(initialValues);
    const [errors, setErrors] = useState<
        Partial<Record<keyof T, string | null>>
    >({});
    const [touched, setTouched] = useState<
        Partial<Record<keyof T, boolean>>
    >({});

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({ ...prev, ...{ [field]: value }}));
    };

    const handleError = <K extends keyof T>(field: K, error: string | null) => {
        setErrors(prev => ({ ...prev, [field]: error }));

        if (!touched[field]) {1
            setTouched(prev => ({ ...prev, ...{ [field]: true }}));
        }
    };

    const handleBlur = (field: string) => {
        if (form[field]) {
            setTouched(prev => ({ ...prev, ...{ [field]: true }}));
        }
    };

    const setFormData = (data: T) => {
        setForm({ ...form, ...data });
    };

    const cleanForm = () => {
        setForm(initialValues);
        setErrors({});
        setTouched({});
    };

    return ({
        form,
        errors,
        touched,
        handleChange,
        handleError,
        handleBlur,
        setFormData,
        cleanForm
    });
}