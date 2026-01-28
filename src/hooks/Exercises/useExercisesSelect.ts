import { useMemo, useState } from "react";
import type { SelectableDataCardListRowProps } from "../../components/dataCardList/SelectableDataCardList";
import type { Exercise } from "../../types/exercise";
import { FitnessCenterOutlined } from "@mui/icons-material";
import useExercises from "../../queries/exercises/hooks/useExercises";
import useInfiniteScroll from "../useInfiniteScroll";

type useExercisesSelectProps = {
    onSubmit: (ids: Exercise[]) => void;
};

export default function useExercisesSelect({ onSubmit }: useExercisesSelectProps) {
    const [filters, setFilters] = useState<Record<string, string>>({});
    const { 
        isPending,
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useExercises({ filters });

    const loadMoreRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

    const [selected, setSelected] = useState<Record<string, Exercise>>({});

    const rows = useMemo<SelectableDataCardListRowProps[] | null>(() => {
        if (!data) return null;

        return data.pages.flat().map(exercise => ({
            id: exercise.id.toString(),
            icon: FitnessCenterOutlined,
            title: `${exercise.name} - ${exercise.category.name}`,
            data: {
                id: exercise.id,
                description: exercise.description,
                sets: exercise.sets,
                reps: exercise.reps,
                durationSeconds: exercise.durationSeconds && `${exercise.durationSeconds} sec`,
                weight: exercise.weight && `${exercise.weight} kg`
            }
        }));
    }, [data]);

    const handleSubmit = () => {
        onSubmit(Object.values(selected));
    };

    const handleCheck = (id: string, checked: boolean) => {
        setSelected(prev => {
            const selected = { ...prev };

            if (checked) {
                const exercise = data?.pages.flat().find(ex => ex.id === +id);
                if (exercise) selected[id] = exercise;
            } else {
                delete selected[id];
            }

            return selected;
        });
    };

    const cleanSelected = () => {
        setSelected({});
    };
    
    return {
        rows,
        isPending,
        hasNextPage,
        selected,
        loadMoreRef,
        setFilters,
        handleCheck,
        handleSubmit,
        cleanSelected
    };
}