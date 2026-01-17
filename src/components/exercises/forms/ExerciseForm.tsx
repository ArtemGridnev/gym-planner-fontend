import { Box } from "@mui/material";
import Form from "../../form/Form";
import useExerciseForm, { type ExerciseFormData } from "../../../hooks/exercises/useExerciseForm";
import Alerts from "../../train/Alerts";

export type ExerciseFormProps = {
    initialValues?: ExerciseFormData;
    submitButtonText: string;
    onSuccess: (exercise: ExerciseFormData) => void;
    isLoading?: boolean,
    success?: string | null,
    error?: string | null
};

export default function ExerciseForm({ initialValues, submitButtonText, onSuccess, isLoading, success, error }: ExerciseFormProps) {
    const {
        formFields
    } = useExerciseForm();

    return (
        <>
            <Alerts success={success} error={error} />
            <Box>
                <Form 
                    formFields={formFields} 
                    submitButtonText={submitButtonText} 
                    onSubmit={(fieldValues) => { onSuccess(fieldValues as ExerciseFormData) }} 
                    isLoading={isLoading}
                    initialValues={initialValues}
                />
            </Box>
        </>
    )
}
