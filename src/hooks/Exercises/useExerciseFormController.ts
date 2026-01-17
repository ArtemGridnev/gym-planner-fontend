import { useEffect, useState } from "react";
import { getExercise } from "../../services/exercisesService";
import { exerciseFormDataToCreatePayload, exerciseToFormData } from "../../utils/exerciseUtils";
import type { ExerciseFormData } from "./useExerciseForm";
import useCreateExercise from "../../queries/exercises/hooks/useCreateExercise";
import useUpdateExercise from "../../queries/exercises/hooks/useUpdateExercise";

export default function useExerciseFormController() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [exerciseId, setExerciseId] = useState<number | null>(null);
    const [initialValues, setInitialValues] = useState<ExerciseFormData>();

    const createMutation = useCreateExercise();
    const updateMutation = useUpdateExercise();
    
    const resetFormState = () => {
        setError(null);
        setSuccess(null);
        setIsLoading(false);
        setInitialValues(undefined);
    };

    const editExercise = async (id: number) => {
        resetFormState();
        
        try {
            const exercise = await getExercise(id);

            if (!exercise) return;

            const formData = exerciseToFormData(exercise);

            setExerciseId(id);
            setInitialValues(formData);
        } catch (err: any) {
            setError(err.message || 'failed to fetch exercise');
            console.error(err.message || 'failed to fetch exercise');
        }
    };

    const createExercise = () => {
        resetFormState();
        setExerciseId(null)
    };

    const onSuccess = (exerciseData: ExerciseFormData) => {
        const payload = exerciseFormDataToCreatePayload(exerciseData);

        if (exerciseId) {
            updateMutation.mutate({
                id: exerciseId,
                ...payload
            });
        } else {
            createMutation.mutate(payload);
        }
    };

    useEffect(() => {
        if (createMutation.isPending) {
            setIsLoading(true);
            setError(null);
            setSuccess(null);
        } else {
            setIsLoading(false);
        }

        if (createMutation.isError) {
            setError(createMutation.error?.message || 'failed to create exercise');
        }

        if (createMutation.isSuccess) {
            setSuccess('exercise created successfully');
        }
    }, [createMutation.isError, createMutation.isSuccess, createMutation.isPending]);

    return {
        createExercise,
        editExercise,
        formStates: {
            onSuccess,
            exerciseId,
            initialValues,
            isLoading,
            error,
            success
        }
    };
}