import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExercise } from "../../../services/exercisesService";
import type { Exercise } from "../../../types/exercise";

export default function useDeleteExercise() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteExercise,
        onMutate: async (exerciseId) => {
            await queryClient.cancelQueries({ queryKey: ['exercises'] });

            const prev = queryClient.getQueryData<Exercise[]>(['exercises']);

            queryClient.setQueriesData(
                { queryKey: ['exercises'] },
                (old: Exercise[]) => old.filter((exercise: Exercise) => exercise.id !== exerciseId)
            )

            return { prev };
        },
        onError: (_err, _exerciseId, context: any) => {
            if (context?.prev) {
                queryClient.setQueryData(['exercises'], context.prev);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['exercises'] });
        },
    });
}