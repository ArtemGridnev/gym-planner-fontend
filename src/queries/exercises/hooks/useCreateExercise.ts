import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postExercise } from "../../../services/exercisesService";

export default function useCreateExercise() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postExercise,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exercises'] });
        }
    });
}