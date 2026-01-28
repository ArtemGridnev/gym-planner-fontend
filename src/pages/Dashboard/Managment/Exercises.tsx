import useExercises from "../../../queries/exercises/hooks/useExercises";
import { useEffect, useState } from "react";
import ExercisesCard from "../../../components/exercises/ExercisesCard";
import useDeleteExercise from "../../../queries/exercises/hooks/useDeleteExercise";
import FormModal from "../../../components/form/FormModal";
import Form from "../../../components/form/Form";
import type { ExerciseCategory } from "../../../types/exerciseCategory";
import useExerciseFormController from "../../../hooks/exercises/useExerciseFormController";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

export type ExerciseFormData = {
    category: ExerciseCategory;
    name: string;
    description: string | null;
    sets: number | null;
    reps: number | null;
    durationSeconds: number | null;
    weight: number | null;
};

export default function Exercises() {
    const [filters, setFilters] = useState<Record<string, string>>();
    const {
        isPending,
        data,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useExercises({ filters });

    const loadMoreRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

    const [formOpen, setFormOpen] = useState(false);

    const {
        mutate: deleteExercise
    } = useDeleteExercise();

    const {
        isUpdate,
        edit: editExercise,
        create: createExercise,
        formStates
    } = useExerciseFormController();

    const onAdd = () => {
        createExercise();
        setFormOpen(true);
    };

    const onEdit = async (id: number) => {
        editExercise(id); 
        setFormOpen(true);
    };

    useEffect(() => {
        if (formStates.success) {
            setFormOpen(false);
        }
    }, [formStates.success]);

    return (
        <>
            <FormModal
                open={formOpen}
                title={isUpdate ? "Update Exercise" : "Create Exercise"}
                onClose={() => setFormOpen(false)} 
            >
                <Form 
                    {...formStates}
                    submitButtonText={isUpdate ? "Update Exercise" : "Create Exercise"}
                />
            </FormModal>

            <ExercisesCard 
                loadMoreRef={loadMoreRef}
                exercises={data?.pages.flat() || []}
                hasNextPage={hasNextPage}
                isPending={isPending}
                error={error?.message || ''}
                onAdd={onAdd}
                onEdit={onEdit}
                onDelete={(id) => deleteExercise(id)}
                onFiltersChange={(filters) => setFilters(filters)}
            />
        </>
    );
}