import { useEffect, useState } from "react";
import useCreateTrain from "../../queries/trains/hooks/useCreateTrain";
import useUpdateTrain from "../../queries/trains/hooks/useUpdateTrain";
import { getTrain } from "../../services/trainsService";
import { trainToFormData } from "../../utils/trainUtils";
import type { FormProps } from "../../components/form/FormBase";
import type { FieldValues } from "react-hook-form";

export type TrainFormData = {
    name: string;
    recurrenceCron: string;
};

export default function useTrainFormController() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [trainId, setTrainId] = useState<number | null>(null);
    const [initialValues, setInitialValues] = useState<TrainFormData>();

    const createMutation = useCreateTrain();
    const updateMutation = useUpdateTrain();
    
    const resetFormState = () => {
        setError(null);
        setSuccess(null);
        setIsLoading(false);
        setInitialValues(undefined);
    };

    const editTrain = async (id: number) => {
        resetFormState();
        
        try {
            const train = await getTrain(id);

            if (!train) return;

            const formData = trainToFormData(train);

            setTrainId(id);
            setInitialValues(formData);
        } catch (err: any) {
            setError(err.message || 'failed to fetch train');
            console.error(err.message || 'failed to fetch train');
        }
    };

    const createTrain = () => {
        resetFormState();
        setTrainId(null)
    };

    const onSuccess = (trainData: FieldValues) => {
        if (trainId) {
            updateMutation.mutate({
                id: trainId,
                ...trainData
            });
        } else {
            createMutation.mutate(trainData as TrainFormData);
        }
    };

    useEffect(() => {
        const handleMutationStates = (mutation: any, actionType: string) => {
            if (mutation.isPending) {
                setIsLoading(true);
                setError(null);
                setSuccess(null);
            } else {
                setIsLoading(false);
            }

            if (mutation.isError) {
                setError(mutation.error?.message || `failed to ${actionType} train`);
            }

            if (mutation.isSuccess) {
                setSuccess(`train ${actionType}d successfully`);
            }
        };

        handleMutationStates(createMutation, 'create');
        handleMutationStates(updateMutation, 'update');
    }, [
        createMutation.isPending, createMutation.isError, createMutation.isSuccess,
        updateMutation.isPending, updateMutation.isError, updateMutation.isSuccess
    ]);

    const formStates: FormProps = {
        initialValues,
        isLoading,
        error,
        success,
        onSuccess,
    }

    return {
        formStates,
        isUpdate: !!trainId,
        initialValues,
        createTrain,
        editTrain,
    };
}