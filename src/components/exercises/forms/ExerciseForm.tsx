import { Box } from "@mui/material";
import Form from "../../form/Form";
import Alerts from "../../Alerts";
import type { ExerciseFormData } from "../../../hooks/exercises/useExerciseFormController";
import useExerciseFormFields from "../../../hooks/exercises/useExerciseFormFields";

export type ExerciseFormProps = {
    initialValues?: ExerciseFormData;
    submitButtonText: string;
    onSuccess: (exercise: ExerciseFormData) => void;
    isLoading?: boolean,
    success?: string | null,
    error?: string | null
};

export default function ExerciseForm({ initialValues, submitButtonText, onSuccess, isLoading, success, error }: ExerciseFormProps) {
    const formFields = useExerciseFormFields();

    return (
        <>
            <Alerts success={success} error={error} />
            <Box>
                <Form 
                    formFields={formFields} 
                    submitButtonText={submitButtonText} 
                    onSuccess={(fieldValues) => { onSuccess(fieldValues as ExerciseFormData) }} 
                    isLoading={isLoading}
                    initialValues={initialValues}
                />
            </Box>
        </>
    )
}
