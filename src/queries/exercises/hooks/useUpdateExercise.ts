import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExercise } from "../../../services/exercisesService";

export default function useUpdateExercise() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateExercise,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exercises'] });
        }
    });
}
