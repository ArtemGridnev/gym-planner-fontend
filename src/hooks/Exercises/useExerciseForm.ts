import { useEffect, useState } from "react";
import { exerciseFormFields as formFields } from "../../forms/exerciseFormFields";
import useForm from "../Form/useForm";
import { getExercise, postExercise, updateExercise } from "../../services/exercisesService";

export default function useExercisesForm(exerciseId: number | null = null) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        formState,
        submitForm,
        fillFormFields,
        cleanFormFields
    } = useForm(formFields);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const form = submitForm();
    
            if (!form) {
                setLoading(false);
                return;
            }

            if (exerciseId) {
                await updateExercise(exerciseId, {
                    categoryId: form.categoryId!,
                    name: form.name!,
                    description: form.description,
                    sets: form.sets,
                    reps: form.reps,
                    durationSeconds: form.durationSeconds,
                    weight: form.weight
                });

                setSuccess('Exercise updated successfully!');
            } else {
                await postExercise({
                    categoryId: form.categoryId!,
                    name: form.name!,
                    description: form.description,
                    sets: form.sets,
                    reps: form.reps,
                    durationSeconds: form.durationSeconds,
                    weight: form.weight
                });

                setSuccess('New exercise created successfully!');
            }
        } catch (err: any) {
            setError(err.message || "Exercise creation failed");
        } finally {
            setLoading(false);
        }
    };

    const editExercise = async (id: number) => {
        const exercise = await getExercise(id);

        if (!exercise) console.error('Exercise not found.');

        const { isValid, message } = fillFormFields({ categoryId: exercise?.category.id.toString(), ...exercise });

        if (!isValid) console.error(message);
    };

    useEffect(() => {
        if (exerciseId) {
            editExercise(exerciseId);
        } else {
            cleanFormFields();
        }
    }, [exerciseId])

    return ({
        formFields,
        formState,
        loading,
        success,
        error,
        handleSubmit
    });
}