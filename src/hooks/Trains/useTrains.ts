import { useState } from "react";
import type { Train } from "../../types/train";
import { deleteTrain as serviceDeleteTrain, getTrains } from "../../services/trainsService";

export default function useTrains() {
    const [trains, setTrains] = useState<Train[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTrains = async () => {
        try {
            setLoading(true);

            const trains = await getTrains();

            setTrains(trains);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Trains fetch failed");
        } finally {
            setLoading(false);
        }
    };

    const addTrain = (train: Train) => {
        setTrains(prev => prev ? [train, ...prev] : [train]);
    };

    const updateTrain = (train: Train) => {
        setTrains(prev => 
            prev?.map(t => t.id === train.id ? train : t) || prev
        );
    };

    const deleteTrain = async (id: number) => {
        const oldTrains = trains;
        setTrains(prev => prev?.filter(train => train.id !== id) || prev);

        try {
            await serviceDeleteTrain(id);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Train delete failed");

            setTrains(oldTrains);
        }
    };

    return {
        loading,
        trains,
        error,
        fetchTrains,
        addTrain,
        updateTrain,
        deleteTrain
    };
}