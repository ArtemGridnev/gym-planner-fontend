import { useEffect, useRef, useState } from "react";
import type { Train } from "../../types/train";
import { getTrain } from "../../services/trainsService";
import { updateTrainExercises as serviceUpdateTrainExercises, type TrainExerciseUpdate } from "../../services/trainExercisesService";
import type { Exercise } from "../../types/exercise";

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
            const newTrainExercises = await serviceUpdateTrainExercises(id, {
                exercises: trainExercises
            });

            setTrain(prev => {
                if (!prev) return prev;

                return {
                    ...prev,
                    exercises: newTrainExercises
                };
            });
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Train exercises update failed");
        }
    };

    let tempId = useRef(-1);

    const addTrainExercises = async (exercises: Exercise[]) => {
        if (!train?.exercises) return;

        const currTrainExercises = train.exercises;

        const newTrainExercises = [
            ...train.exercises,
            ...exercises.map(exercise => ({
                id: tempId.current--,
                exercise
            }))
        ];

        const updateExercises = newTrainExercises.map(te => 
            te.id > 0 ? { id: te.id } : { exerciseId: te.exercise.id }
        );

        setTrain(prev => prev ? {
            ...prev,
            exercises: newTrainExercises
        } : prev)

        try {
            updateTrainExercises(updateExercises);
        } catch (err) {
            console.error(err);
            setTrain(prev => prev ? { ...prev, exercises: currTrainExercises } : prev);
        }
    };

    const deleteTrainExercise = async (id: number) => {
        if (!train?.exercises) return;

        const newTrainExercises = train.exercises.filter(exercise => exercise.id !== id);

        const updateExercises = newTrainExercises.map(exercise => ({ id: exercise.id }));

        setTrain(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                exercises: newTrainExercises
            }
        });

        updateTrainExercises(updateExercises);
    };

    useEffect(() => {
        fetchTrain();
    }, []);

    return {
        loading,
        train,
        error,
        fetchTrain,
        addTrainExercises,
        updateTrainExercises,
        deleteTrainExercise
    }
};