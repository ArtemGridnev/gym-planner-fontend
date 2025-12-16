import { useEffect, useState } from "react";
import { trainFormFields as formFields } from "../../forms/trainFormFields.ts";
import useForm from "../form/useForm.ts";
import type { Train } from "../../types/train.ts";
import { getTrain, postTrain, updateTrain } from "../../services/trainsService.ts";

export default function useTrainForm(trainId: number | null = null) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        formState,
        submitForm: useFromSubmit,
        fillFormFields,
        cleanFormFields
    } = useForm(formFields);

    const submitForm = async (): Promise<Train | null> => {
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const form = useFromSubmit();
    
            if (!form) {
                setLoading(false);
                return null;
            }

            if (trainId) {
                const train = await updateTrain(trainId, {
                    name: form.name!,
                    recurrenceCron: form.recurrenceCron!
                });

                setSuccess('Train updated successfully!');

                return train;
            } else {
                const train = await postTrain({
                    name: form.name!,
                    recurrenceCron: form.recurrenceCron!
                });

                setSuccess('New train created successfully!');

                return train;
            }
        } catch (err: any) {
            setError(err.message || "Train creation failed");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const editTrain = async (id: number) => {
        const train = await getTrain(id);

        if (!train) console.error('Exercise not found.');

        const { isValid, message } = fillFormFields({ ...train });

        if (!isValid) console.error(message);
    };

    useEffect(() => {
        if (trainId) {
            editTrain(trainId);
        } else {
            cleanFormFields();
        }
    }, [trainId])

    return ({
        formFields,
        formState,
        loading,
        success,
        error,
        submitForm
    });
}