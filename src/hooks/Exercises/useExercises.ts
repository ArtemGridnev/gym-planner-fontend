import { useState } from "react";
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

    const addExercise = (exercise: Exercise) => {
        setExercises(prev => prev ? [exercise, ...prev] : [exercise]);
    };

    const updateExercise = (exercise: Exercise) => {
        setExercises(prev => 
            prev?.map(e => e.id === exercise.id ? exercise : e) || prev
        );
    };

    const deleteExercise = async (id: number) => {
        const oldExercises = exercises;
        setExercises(prev => prev?.filter(exercise => exercise.id !== id) || prev);

        try {
            await serviceDeleteExercise(id);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Exercise delete failed");

            setExercises(oldExercises);
        }
    };

    return {
        loading,
        exercises,
        error,
        fetchExercises,
        addExercise,
        updateExercise,
        deleteExercise
    };
}