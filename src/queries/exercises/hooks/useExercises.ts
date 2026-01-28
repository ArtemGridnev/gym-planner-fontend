import { type ExercisesQuery } from "../../../services/exercisesService";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { exercisesQueryOptions } from "../options/useExercises.options";
import { useMemo } from "react";

type useExercisesProps = {
    filters?: Omit<ExercisesQuery, 'limit' | 'cursor'>;
}

export default function useExercises({ filters }: useExercisesProps) {
    const queryOptions = useMemo(() => {
        return exercisesQueryOptions(filters);
    }, [filters]);

    return useInfiniteQuery(queryOptions);
}