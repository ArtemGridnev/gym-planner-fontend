import { useEffect } from "react";
import type { FormFieldSchema } from "../types/formFieldSchema";
import useFormState from "./useFormState";
import { isNotEmpty } from "../utils/validation";

export default function useForm(formFields: FormFieldSchema[]) {
    const initialValues = formFields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});
    const formState = useFormState(initialValues);

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
                } else if (formField.validators)  {
                    const validators = typeof formField.validators === 'function' ? formField.validators(form) : formField.validators;
                    
                    const failed = validators.find(m => !m.fn(value));
                    errorMessage = failed?.message || null;
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

    const submitForm = (): Record<string, string> | false => {
        const isValid = validateFields(true);

        if (isValid) return form;

        return false;
    };

    useEffect(() => {
        validateFields();
    }, [form, touched]);

    return {
        formState,
        form,
        handleError,
        submitForm
    };
}