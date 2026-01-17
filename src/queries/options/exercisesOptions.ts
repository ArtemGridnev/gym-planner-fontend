import type { QueryFunctionContext, QueryObserverOptions } from "@tanstack/react-query";
import { getExercises, type ExercisesQuery } from "../../services/exercisesService";
import type { Exercise } from "../../types/exercise";

export const exercisesQueryOptions = (filters?: ExercisesQuery): QueryObserverOptions<Exercise[], Error> => ({
    queryKey: ['exercises', filters],
    queryFn: ({ queryKey }: QueryFunctionContext) => {
        const [, filters] = queryKey as ['exercises', ExercisesQuery | undefined];
        return getExercises(filters);
    }
});