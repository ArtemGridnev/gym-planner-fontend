import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTrain } from "../../../services/trainsService";

export default function useUpdateTrain() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTrain,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trains'] });
        }
    });
}