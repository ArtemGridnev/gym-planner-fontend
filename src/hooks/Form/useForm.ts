import { useEffect } from "react";
import type { FormFieldSchema } from "../../types/formFieldSchema";
import useFormState from "./useFormState";
import { isNotEmpty } from "../../utils/validation";

export default function useForm(fields: FormFieldSchema[]) {
    const initialValues = fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});
    const formState = useFormState(initialValues);

    const {
        form,
        errors,
        touched,
        handleError,
        setFormData,
        cleanForm
    } = formState;

    const validateFields = (validateAll = false): boolean => {
        let isValid = true;

        fields.forEach(({ name, type, required, validators: rawValidators }) => {
            const value = form[name];

            if (touched[name] || errors[name] || validateAll) {
                let errorMessage: string | null = null;

                if (required && !isNotEmpty(value)) {
                    errorMessage = "This Field is required.";
                } else if (type === 'number' && value && !+value) {
                    errorMessage = "This Field must be type of number.";
                } else if (rawValidators && value)  {
                    const validators = typeof rawValidators === 'function' ? rawValidators(form) : rawValidators;
                    
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

    const submitForm = (): Record<string, string | null> | false => {
        try {
            const isValid = validateFields(true);

            if (!isValid) return false;
    
            const filledForm: Record<string, string | null> = {};
    
            Object.entries(form).forEach(([key, value]) => {
                if (value) {
                    filledForm[key] = value;
                } else {
                    filledForm[key] = null;
                }
            });
    
            return filledForm;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const fillFormFields = (data: Record<string, any>): { isValid: boolean, message?: string } => {
        const newData: Record<string, string> = {};

        for (const { name, type, validators: rawValidators } of fields) {
            const value = data[name];

            if (value) {
                if (rawValidators)  {
                    if (type === 'number' && !+value) {
                        return { isValid: false, message: `${name}: This Field must be type of number.` };
                    }

                    const validators = typeof rawValidators === 'function' ? rawValidators(form) : rawValidators;
                    
                    const failed = validators.find(m => !m.fn(value));
                    
                    if (failed) {
                        return { isValid: false, message: `${name}: ${failed.message}` };
                    }
                }

                newData[name] = value;
            }
        }

        setFormData(newData);

        return { isValid: true }; 
    };

    const cleanFormFields = () => {
        cleanForm();
    };

    useEffect(() => {
        validateFields();
    }, [form, touched]);

    return {
        formState,
        form,
        handleError,
        submitForm,
        fillFormFields,
        cleanFormFields
    };
}