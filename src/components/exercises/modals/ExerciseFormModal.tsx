import { Box } from "@mui/material";
import Modal from "../../modal/Modal";
import ExerciseForm from "../forms/ExerciseForm";
import type { ExerciseFormData } from "../../../hooks/exercises/useExerciseForm";

type ExerciseFormModalProps = {
    open: boolean;
    modalTitle: string;
    submitButtonText: string;
    initialValues?: ExerciseFormData;
    onClose: () => void;
    onSuccess: (exerciseData: ExerciseFormData) => void;
};

export default function ExerciseFormModal({ open, submitButtonText, modalTitle, initialValues, onClose, onSuccess }: ExerciseFormModalProps) {
    const hanldeSuccess = (exerciseData: ExerciseFormData) => {
        onSuccess(exerciseData);
        onClose();
    };

    return (
        <Modal
            open={open} 
            onClose={onClose} 
            width="30rem"
        >
            <Modal.Header>{modalTitle}</Modal.Header>
            <Modal.Content>
                <Box sx={{ p: '0.75rem' }}>
                    <ExerciseForm 
                        initialValues={initialValues}
                        onSuccess={hanldeSuccess} 
                        submitButtonText={submitButtonText}
                    />
                </Box>
            </Modal.Content>
        </Modal>
    );
}