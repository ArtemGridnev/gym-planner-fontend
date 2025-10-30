import { useEffect, useState } from "react";
import { getExercisesList } from "../services/exercisesService";
import type { Exercise } from "../types/exercise";

export default function useExercises() {
    const [exercises, setExercises] = useState<Exercise[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExercises = async () => {
        try {
            const exercises = await getExercisesList();

            setExercises(exercises);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Trains fetch failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    return {
        loading,
        exercises,
        error
    };
}