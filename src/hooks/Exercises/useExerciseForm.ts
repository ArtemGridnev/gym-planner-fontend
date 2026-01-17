import { useEffect, useMemo, useState } from "react";
import { getExerciseFormFields } from "../../forms/exerciseFormFields.schema";
import useForm from "../form/useForm";
import type { ExerciseCategory } from "../../types/exerciseCategory";
import { useExerciseCategories } from "../../queries/hooks/useExerciseCategories";
import type { FormFieldSchema, SearchSelectOption } from "../../types/form/formFieldSchema";

export type ExerciseFormData = {
    category: ExerciseCategory;
    name: string;
    description: string | null;
    sets: number | null;
    reps: number | null;
    durationSeconds: number | null;
    weight: number | null;
};

export default function useExerciseForm({ initialValues }: { initialValues?: ExerciseFormData }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        categories
    } = useExerciseCategories();
 
    const formFields = useMemo(() => {
        if (categories) {
            const options = categories.map((category: ExerciseCategory) => ({ id: category.id, value: category, label: category.name } as SearchSelectOption));

            const fileds = getExerciseFormFields(options);

            return fileds || [];
        } else {
            return [];
        }
    }, [categories]);

    const {
        formState,
        submitForm: useFromSubmit,
        fillFormFields,
        cleanFormFields
    } = useForm<ExerciseFormData>(formFields);

    const submitForm = (): ExerciseFormData | undefined => {
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const form = useFromSubmit();
    
            if (!form) {
                setLoading(false);
                return;
            }

            return form;
        } catch (err: any) {
            setError(err.message || "Exercise creation failed");
            return;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (initialValues) {
            fillFormFields(initialValues);
        }
    }, [initialValues]);

    return ({
        formFields,
        formState,
        loading,
        success,
        error,
        submitForm,
        cleanFormFields
    });
}