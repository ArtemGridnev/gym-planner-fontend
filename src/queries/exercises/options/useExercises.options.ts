import type { InfiniteData, InfiniteQueryObserverOptions, QueryFunctionContext } from "@tanstack/react-query";
import { getExercises, type ExercisesQuery } from "../../../services/exercisesService";
import type { Exercise } from "../../../types/exercise";

export const exercisesQueryOptions = (filters?: Omit<ExercisesQuery, 'cursor'>): InfiniteQueryObserverOptions<Exercise[], Error, InfiniteData<Exercise[], number>> => ({
    queryKey: ['exercises', filters],
    queryFn: ({ pageParam, queryKey }: QueryFunctionContext) => {
        const [, filters] = queryKey as ['exercises', Omit<ExercisesQuery, 'cursor'> | undefined];
        return getExercises({
            ...filters,
            cursor: pageParam as number ?? undefined
        });
    },
    initialPageParam: () => {
        return null;
    },
    getNextPageParam: (lastPage) => {
        return lastPage.at(-1)?.id ?? null;
    }
});