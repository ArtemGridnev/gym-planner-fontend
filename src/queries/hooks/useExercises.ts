import { deleteExercise as deleteExercise, postExercise, type ExercisesQuery, type CreateExercisePayload } from "../../services/exercisesService";
import type { Exercise } from "../../types/exercise";
import { useMutation, useQuery } from '@tanstack/react-query';
import { exercisesQueryOptions } from "../options/exercisesOptions";
import { useMemo } from "react";

type useExercisesProps = {
    filters?: Omit<ExercisesQuery, 'limit' | 'page'>;
}

export default function useExercises({ filters }: useExercisesProps) {
    const queryOptions = useMemo(() => {
        return exercisesQueryOptions(filters);
    }, [filters]) 

    const {
        isPending, 
        isError, 
        data: exercises, 
        error
    } = useQuery(queryOptions);

    const deleteMutation = useMutation({
        mutationFn: deleteExercise,
        onMutate: async (exerciseId, context) => {
            await context.client.cancelQueries({ queryKey: queryOptions.queryKey });

            const prev = context.client.getQueryData<Exercise[]>(queryOptions.queryKey);
            
            context.client.setQueryData(queryOptions.queryKey, prev?.filter(exercise => exercise.id !== exerciseId));

            return { prev };
        }
    });

    const addMutation = useMutation({
        mutationFn: postExercise,
        onMutate: async (exerciseData: CreateExercisePayload, context) => {
            await context.client.cancelQueries({ queryKey: queryOptions.queryKey });

            const prev = context.client.getQueryData<Exercise[]>(queryOptions.queryKey);

            context.client.setQueryData(queryOptions.queryKey, prev ? [exerciseData, ...prev] : [exerciseData]);
        }
    });

    // const addExercise = (exercise: Exercise) => {
    //     // setExercises(prev => prev ? [exercise, ...prev] : [exercise]);
    // };

    const updateExercise = (exercise: CreateExercisePayload) => {
        // setExercises(prev => 
        //     prev?.map(e => e.id === exercise.id ? exercise : e) || prev
        // );
    }; 

    

    return {
        isPending,
        exercises,
        isError,
        error,
        addExercise: addMutation.mutate,
        updateExercise,
        deleteExercise: deleteMutation.mutate
    };
}