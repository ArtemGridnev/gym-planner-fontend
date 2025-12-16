import { useEffect, useState } from "react";
import useExercises from "./useExercises";
import type { SelectableDataCardListRowProps } from "../../components/dataCardList/SelectableDataCardList";
import type { Exercise } from "../../types/exercise";
import { FitnessCenterOutlined } from "@mui/icons-material";

type useExercisesSelectProps = {
    onSubmit: (ids: Exercise[]) => void;
};

export default function useExercisesSelect({ onSubmit }: useExercisesSelectProps) {
    const [filters, setFilters] = useState<Record<string, string>>({});
    const { 
        isLoading,
        exercises,
        fetchExercises
    } = useExercises({ filters });
    const [exercisesRows, setExercisesRows] = useState<SelectableDataCardListRowProps[] | null>(null);
    const [selected, setSelected] = useState<Record<string, Exercise>>({});

    const handleSubmit = () => {
        onSubmit(Object.values(selected));
    };

    const handleCheck = (id: string, checked: boolean) => {
        setSelected(prev => {
            const selected = { ...prev };

            if (checked) {
                const exercise = exercises?.find(ex => ex.id === +id);
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
    
    useEffect(() => {
        if (exercises) {
            setExercisesRows(exercises?.map(exercise => ({
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
            })));
        } else {
            setExercisesRows(null);
        }
    }, [exercises]);

    useEffect(() => {
        fetchExercises();
    }, []);

    return {
        exercisesRows,
        isLoading,
        selected,
        setFilters,
        handleCheck,
        handleSubmit,
        cleanSelected
    };
}