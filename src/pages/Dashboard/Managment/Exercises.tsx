import useExercises from "../../../queries/exercises/hooks/useExercises";
import { useEffect, useState } from "react";
import ExercisesCard from "../../../components/exercises/ExercisesCard";
import useDeleteExercise from "../../../queries/exercises/hooks/useDeleteExercise";
import useExerciseFormController from "../../../hooks/exercises/useExerciseFormController";
import FormModal from "../../../components/form/FormModal";
import ExerciseForm from "../../../components/exercises/forms/ExerciseForm";

export default function Exercises() {
    const [filters, setFilters] = useState<Record<string, string>>();
    const {
        isPending,
        data: exercises,
        error,
    } = useExercises({ filters });

    const {
        mutate: deleteExercise
    } = useDeleteExercise();

    const [formOpen, setFormOpen] = useState(false);
    
    const {
        editExercise,
        createExercise,
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
                {...formStates}
                open={formOpen}
                modalTitle={formStates.exerciseId ? "Update Exercise" : "Create Exercise"}
                onClose={() => setFormOpen(false)} 
            >
                <ExerciseForm 
                    {...formStates}
                    submitButtonText={formStates.exerciseId ? "Update Exercise" : "Create Exercise"}
                />
            </FormModal>

            <ExercisesCard 
                exercises={exercises}
                isLoading={isPending}
                error={error?.message || ''}
                onAdd={onAdd}
                onEdit={onEdit}
                onDelete={(id) => deleteExercise(id)}
                onFiltersChange={(filters) => setFilters(filters)}
            />
        </>
    );
}