import { Box } from "@mui/material";
import Form from "../form/Form";
import Alerts from "../Alerts";
import { useEffect } from "react";
import useExercisesForm from "../../hooks/Exercises/useExerciseForm";
import type { Exercise } from "../../types/exercise";

type ExerciseFormProps = {
    onSuccess: (exercise: Exercise) => void;
    exerciseId?: number | null;
};

export default function ExerciseForm({ onSuccess, exerciseId }: ExerciseFormProps) {
    const {
        formFields,
        formState,
        success,
        error,
        loading,
        submitForm
    } = useExercisesForm(exerciseId);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const exercise = await submitForm();

        if (exercise) {
            onSuccess(exercise);
        }
    };

    return (
        <>
            <Alerts success={success} error={error} />
            <Box>
                <Form 
                    formFields={formFields} 
                    {...formState} 
                    submitButtonText="Create Exercise" 
                    onSubmit={submitHandler} 
                    loading={loading} 
                />
            </Box>
        </>
    )
}
