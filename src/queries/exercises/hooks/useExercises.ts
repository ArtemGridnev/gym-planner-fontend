import { type ExercisesQuery } from "../../../services/exercisesService";
import { useQuery } from '@tanstack/react-query';
import { exercisesQueryOptions } from "../options/useExercises.options";
import { useMemo } from "react";

type useExercisesProps = {
    filters?: Omit<ExercisesQuery, 'limit' | 'page'>;
}

export default function useExercises({ filters }: useExercisesProps) {
    const queryOptions = useMemo(() => {
        return exercisesQueryOptions(filters);
    }, [filters]);

    return useQuery(queryOptions);
}