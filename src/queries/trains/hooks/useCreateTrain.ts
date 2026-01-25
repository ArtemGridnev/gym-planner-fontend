import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTrain } from "../../../services/trainsService";

export default function useCreateTrain() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postTrain,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trains'] });
        }
    });
}