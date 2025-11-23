import { useEffect, useState } from "react";
import type { Train } from "../../types/train";
import { getTrain } from "../../services/trainsService";
import type { TrainExercise } from "../../types/trainExercise";

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

    useEffect(() => {
        fetchTrain();
    }, []);

    return {
        loading,
        train,
        error,
        fetchTrain
    }
};