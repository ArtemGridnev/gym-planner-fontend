import { Box } from "@mui/material";
import Form from "../form/Form";
import Alerts from "../Alerts";
import { useEffect } from "react";
import useExercisesForm from "../../hooks/Exercises/useExerciseForm";

type ExerciseFormProps = {
    onSuccess: () => void;
    exerciseId?: number | null;
};

export default function ExerciseForm({ onSuccess, exerciseId }: ExerciseFormProps) {
    const {
        formFields,
        formState,
        success,
        error,
        loading,
        handleSubmit
    } = useExercisesForm(exerciseId);

    useEffect(() => {
        if (success) onSuccess();
    }, [success]);

    return (
        <>
            <Alerts success={success} error={error} />
            <Box>
                <Form formFields={formFields} {...formState} submitButtonText="Create Exercise" onSubmit={handleSubmit} loading={loading} />
            </Box>
        </>
    )
}
