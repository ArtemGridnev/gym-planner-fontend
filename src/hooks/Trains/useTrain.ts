import { useEffect, useState } from "react";
import type { Train } from "../../types/train";
import { getTrain } from "../../services/trainsService";
import { updateTrainExercises as serviceUpdateTrainExercises, type TrainExerciseUpdate } from "../../services/trainExercisesService";

export default function useTrain(id: number) {
    const [loading, setLoading] = useState(false);
    const [train, setTrain] = useState<Train | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchTrain = async () => {
        setLoading(true);

        try {
            const train = await getTrain(id);
            
            if (train) {
                setTrain(train);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Train fetch failed")
        } finally {
            setLoading(false);
        }
    };

    const updateTrainExercises = async (trainExercises: TrainExerciseUpdate[]) => {
        try {
            await serviceUpdateTrainExercises(id, {
                exercises: trainExercises
            });
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Train exercises update failed");
        }
    };

    useEffect(() => {
        fetchTrain();
    }, []);

    return {
        loading,
        train,
        error,
        fetchTrain,
        updateTrainExercises
    }
};