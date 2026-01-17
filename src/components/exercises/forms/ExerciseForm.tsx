import { Box } from "@mui/material";
import Form from "../../form/Form";
import Alerts from "../../train/Alerts";
import useExerciseForm, { type ExerciseFormData } from "../../../hooks/exercises/useExerciseForm";

type ExerciseFormProps = {
    initialValues?: ExerciseFormData;
    submitButtonText: string;
    onSuccess: (exercise: ExerciseFormData) => void;
};

export default function ExerciseForm({ initialValues, submitButtonText, onSuccess }: ExerciseFormProps) {
    const {
        formFields,
        formState,
        success,
        error,
        loading,
        submitForm
    } = useExerciseForm({ initialValues });

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const exerciseData = submitForm();

        if (exerciseData) {
            onSuccess(exerciseData);
        }
    };

    return (
        <>
            <Alerts success={success} error={error} />
            <Box>
                <Form 
                    formFields={formFields} 
                    {...formState} 
                    submitButtonText={submitButtonText} 
                    onSubmit={submitHandler} 
                    loading={loading} 
                />
            </Box>
        </>
    )
}
