import { useQuery } from "@tanstack/react-query";
import { getExercisesCategories } from "../../../services/exercisesService";

export function useExerciseCategories() {
    return useQuery({
        queryFn: getExercisesCategories,
        queryKey: ['exerciseCategories']
    });
}