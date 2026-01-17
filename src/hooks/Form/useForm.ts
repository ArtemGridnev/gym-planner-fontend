import { useEffect } from "react";
import type { FormFieldSchema } from "../../types/form/formFieldSchema";
import { isEmpty } from "../../utils/validation";
import useFormState from "./useFormState";

export default function useForm<T extends Record<string, any>>(fields: FormFieldSchema[]) {
    const initialValues = fields.reduce((acc, f) => {
        acc[f.name as keyof T] = null as T[keyof T];
        return acc;
    }, {} as T);

    const formState = useFormState<T>(initialValues);

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

        fields.forEach(({ name: fieldName, type, required, validators: rawValidators }) => {
            const name = fieldName as keyof T;

            const value = form[name];

            if (touched[name] || errors[name] || validateAll) {
                let errorMessage: string | null = null;

                if (required && isEmpty(value)) {
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

    const submitForm = (): T | undefined => {
        try {
            const isValid = validateFields(true);

            if (!isValid) return;
    
            const filledForm: T = {} as T;
    
            (Object.keys(form) as Array<keyof T>).forEach((key) => {
                const value = form[key];
                filledForm[key] = value;
            });
            
            return filledForm;
        } catch (err) {
            console.error(err);
            return;
        }
    };

    const fillFormFields = (data: T): { isValid: boolean, message?: string } => {
        const newData: T = {} as T;

        for (const { name: fieldName, type, validators: rawValidators } of fields) {
            const name = fieldName as keyof T & string;
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