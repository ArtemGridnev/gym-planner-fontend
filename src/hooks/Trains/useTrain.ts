import { useEffect, useRef, useState } from "react";
import type { Train } from "../../types/train";
import { getTrain } from "../../services/trainsService";
import { updateTrainExercises as serviceUpdateTrainExercises, type TrainExerciseUpdate } from "../../services/trainExercisesService";
import type { Exercise } from "../../types/exercise";
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

    const updateTrainExercisesOrder = async (newOrder: { id: number }[]) => {
        if (!train?.exercises) return;

        setError(null);

        const currTrainExercises = train.exercises;

        setTrain(prev => {
            if (!prev?.exercises) return prev;

            const exercises = prev.exercises;

            const orderedTrainExercises = newOrder.map(o => {
                return exercises.find(te => te.id === o.id);
            }).filter(Boolean) as TrainExercise[];

            return {
                ...prev,
                exercises: orderedTrainExercises
            };
        });

        try {
            await serviceUpdateTrainExercises(id, {
                exercises: newOrder
            });
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Train exercises order update failed");
            setTrain(prev => prev ? { ...prev, exercises: currTrainExercises } : prev);
        }
    };

    let tempId = useRef(-1);

    const addTrainExercises = async (exercises: Exercise[]) => {
        if (!train?.exercises) return;

        setError(null);

        const currTrainExercises = train.exercises;

        const newTrainExercises = [
            ...train.exercises,
            ...exercises.map(exercise => ({
                id: tempId.current--,
                exercise
            }))
        ];

        const updateExercises = newTrainExercises.map(te => 
            te.id > 0 ? { id: te.id } : { exerciseId: te.exercise.id, tempId: te.id }
        );

        setTrain(prev => prev ? {
            ...prev,
            exercises: newTrainExercises
        } : prev)

        try {
            const updatedTrainExercises = await serviceUpdateTrainExercises(id, {
                exercises: updateExercises
            });

            if (!updatedTrainExercises) return;

            const tempIds = new Map();

            updatedTrainExercises?.forEach(te => {
                if (te.tempId) tempIds.set(te.tempId, te.id);
            });

            setTrain(prev => {
                if (!prev?.exercises) return prev;

                const res = {
                    ...prev,
                    exercises: prev.exercises.map(ex => { 
                        const tempId = tempIds.get(ex.id);

                        return ex.id < 0 && tempId ? { ...ex, id: tempId } : ex;
                    })
                };

                return res;
            });
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Train exercises add failed");
            setTrain(prev => prev ? { ...prev, exercises: currTrainExercises } : prev);
        }
    };

    const deleteTrainExercise = async (trainExerciseId: number) => {
        if (!train?.exercises) return;

        setError(null);

        const currTrainExercises = train.exercises;

        const newTrainExercises = train.exercises.filter(exercise => exercise.id !== trainExerciseId);

        const updateExercises = newTrainExercises.map(exercise => ({ id: exercise.id }));

        setTrain(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                exercises: newTrainExercises
            }
        });

        try {
            await serviceUpdateTrainExercises(id, {
                exercises: updateExercises
            });
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Train exercise delete failed");
            setTrain(prev => prev ? { ...prev, exercises: currTrainExercises } : prev);
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
        addTrainExercises,
        updateTrainExercisesOrder,
        deleteTrainExercise
    }
};