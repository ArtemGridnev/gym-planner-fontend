import { useQuery } from "@tanstack/react-query";
import { getExercisesCategories } from "../../services/exercisesService";

export function useExerciseCategories() {
    const {
        data: categories
    } = useQuery({
        queryFn: getExercisesCategories,
        queryKey: ['exerciseCategories']
    });

    return {
        categories
    };
}