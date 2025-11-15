import { useEffect, useState } from "react";
import { exerciseFormFields as formFields } from "../../forms/exerciseFormFields";
import useForm from "../Form/useForm";
import { getExercise, postExercise, updateExercise } from "../../services/exercisesService";
import type { Exercise } from "../../types/exercise";

export default function useExercisesForm(exerciseId: number | null = null) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        formState,
        submitForm: useFromSubmit,
        fillFormFields,
        cleanFormFields
    } = useForm(formFields);

    const submitForm = async (): Promise<Exercise | null> => {
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const form = useFromSubmit();
    
            if (!form) {
                setLoading(false);
                return null;
            }

            if (exerciseId) {
                const exercise = await updateExercise(exerciseId, {
                    categoryId: form.categoryId!,
                    name: form.name!,
                    description: form.description,
                    sets: form.sets,
                    reps: form.reps,
                    durationSeconds: form.durationSeconds,
                    weight: form.weight
                });

                setSuccess('Exercise updated successfully!');

                return exercise;
            } else {
                const exercise = await postExercise({
                    categoryId: form.categoryId!,
                    name: form.name!,
                    description: form.description,
                    sets: form.sets,
                    reps: form.reps,
                    durationSeconds: form.durationSeconds,
                    weight: form.weight
                });

                setSuccess('New exercise created successfully!');

                return exercise;
            }
        } catch (err: any) {
            setError(err.message || "Exercise creation failed");
            return null;
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
        submitForm
    });
}