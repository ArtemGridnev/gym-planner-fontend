import { useQuery } from "@tanstack/react-query";
import { getTrains } from "../../../services/trainsService";

export default function useTrains() {
    return useQuery({
        queryKey: ['trains'],
        queryFn: getTrains
    });
}