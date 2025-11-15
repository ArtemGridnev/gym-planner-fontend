import { useEffect, useState } from "react";
import { deleteExercise as serviceDeleteExercise, getExercisesList } from "../../services/exercisesService";
import type { Exercise } from "../../types/exercise";

export default function useExercises() {
    const [exercises, setExercises] = useState<Exercise[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExercises = async () => {
        try {
            setLoading(true);

            const exercises = await getExercisesList();

            setExercises(exercises);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Exercises fetch failed");
        } finally {
            setLoading(false);
        }
    };

    const deleteExercise = async (id: number) => {
        try {
            setLoading(true);

            await serviceDeleteExercise(id);

            if (exercises) {
                setExercises(exercises?.filter(exercise => exercise.id !== id));
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Exercise delete failed");
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
        error,
        fetchExercises,
        deleteExercise
    };
}