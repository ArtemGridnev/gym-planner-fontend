import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTrain } from "../../../services/trainsService";
import type { Train } from "../../../types/train";

export default function useDeleteTrain() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTrain,
        onMutate: async (trainId) => {
            await queryClient.cancelQueries({ queryKey: ['trains'] });

            const prev = queryClient.getQueryData<Train[]>(['trains']);

            queryClient.setQueriesData(
                { queryKey: ['trains'] },
                (old: Train[]) => old?.filter(train => train.id !== trainId)
            );

            return { prev };
        },
        onError: (_err, _trainId, context: any) => {
            if (context?.prev) {
                queryClient.setQueryData(['trains'], context.prev);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trains'] });
        }
    })
}