import { useEffect, useRef, useState } from "react";
import { deleteExercise as serviceDeleteExercise, getExercises, type ExercisesFilters } from "../../services/exercisesService";
import type { Exercise } from "../../types/exercise";

type useExercisesProps = {
    filters?: ExercisesFilters;
}

export default function useExercises({ filters }: useExercisesProps) {
    const [exercises, setExercises] = useState<Exercise[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const requestIdRef = useRef(0);

    const fetchExercises = async () => {
        const currRequestId = ++requestIdRef.current;

        const t = setTimeout(() => {
            if (currRequestId === requestIdRef.current) {
                setIsLoading(true);
            }
        }, 200);

        try {
            const exercises = await getExercises(filters);

            if (currRequestId !== requestIdRef.current) return;

            setExercises(exercises);
        } catch (err: any) {
            if (currRequestId !== requestIdRef.current) return;

            console.error(err);
            setError(err.message || "Exercises fetch failed");
        } finally {
            clearTimeout(t);

            if (currRequestId !== requestIdRef.current) return;
            
            setIsLoading(false);
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

    useEffect(() => {
        fetchExercises();
    }, [filters]);

    return {
        isLoading,
        exercises,
        error,
        fetchExercises,
        addExercise,
        updateExercise,
        deleteExercise
    };
}