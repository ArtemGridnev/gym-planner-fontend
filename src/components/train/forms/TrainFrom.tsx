import { Box } from "@mui/material";
import Form from "../../form/Form";
import Alerts from "../Alerts";
import type { Train } from "../../../types/train";
import useTrainForm from "../../../hooks/trains/useTrainForm";

type TrainFormProps = {
    onSuccess: (train: Train) => void;
    trainId?: number | null;
};

export default function TrainForm({ onSuccess, trainId }: TrainFormProps) {
    const {
        formFields,
        formState,
        success,
        error,
        loading,
        submitForm
    } = useTrainForm(trainId);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const train = await submitForm();

        if (train) {
            onSuccess(train);
        }
    };

    return (
        <>
            <Alerts success={success} error={error} />
            <Box>
                <Form 
                    formFields={formFields} 
                    {...formState} 
                    submitButtonText={trainId ? "Update Train" : "Create Train"} 
                    onSubmit={submitHandler} 
                    loading={loading} 
                />
            </Box>
        </>
    )
}
