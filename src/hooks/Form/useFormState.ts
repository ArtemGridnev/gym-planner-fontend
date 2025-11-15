import { useState } from "react";

export default function useFormState(initialValues: Record<string, string>) {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, ...{ [field]: value }}));
    };

    const handleError = (field: string, error: string | null) => {
        setErrors(prev => ({ ...prev, [field]: error }));

        if (!touched[field]) {
            setTouched(prev => ({ ...prev, ...{ [field]: true }}));
        }
    };

    const handleBlur = (field: string) => {
        if (form[field]) {
            setTouched(prev => ({ ...prev, ...{ [field]: true }}));
        }
    };

    const setFormData = (data: Record<string, string>) => {
        const currData = { ...form };

        Object.keys(currData).forEach(key => {
            currData[key] = data[key];
        });

        setForm(currData);
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