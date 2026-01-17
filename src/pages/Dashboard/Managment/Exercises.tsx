import useExercises from "../../../queries/hooks/useExercises";
import { useState } from "react";
import ExerciseFormModal from "../../../components/exercises/modals/ExerciseFormModal";
import ExercisesCard from "../../../components/exercises/ExercisesCard";
import { getExercise } from "../../../services/exercisesService";
import { exerciseFormDataToCreatePayload, exerciseToFormData } from "../../../utils/exerciseUtils";
import type { ExerciseFormData } from "../../../hooks/exercises/useExerciseForm";

export default function Exercises() {
    const [filters, setFilters] = useState<Record<string, string>>();
    const {
        isPending,
        exercises,
        error,
        addExercise,
        updateExercise,
        deleteExercise
    } = useExercises({ filters });
    const [initialValues, setInitialValues] = useState<ExerciseFormData>();
    
    const [exerciseId, setExerciseId] = useState<number | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    
    const hanldeFormSuccess = (exerciseData: ExerciseFormData) => {
        const payload = exerciseFormDataToCreatePayload(exerciseData);

        if (exerciseId) {
            updateExercise(payload);
        } else {
            addExercise(payload);
        }
    };

    const onAdd = () => {
        setExerciseId(null);
        setFormOpen(true);
    };

    const onEdit = async (id: number) => {
        setFormOpen(true);
        setExerciseId(id); 

        try {
            const exercise = await getExercise(id);

            if (!exercise) return;

            const formData = exerciseToFormData(exercise);

            console.log('formData', formData)

            setInitialValues(formData);
        } catch (err: any) {
            console.error(err.message || 'failed to fetch exercise');
        }
    };

    // useEffect(() => {
    //     fetchExercises();
    // }, []);

    return (
        <>
            {formOpen && (
                <ExerciseFormModal 
                    open={formOpen}
                    initialValues={initialValues} 
                    modalTitle={exerciseId ? "Update Exercise" : "Create exercise"}
                    submitButtonText={exerciseId ? "Update Exercise" : "Create Exercise"}
                    onClose={() => setFormOpen(false)} 
                    onSuccess={hanldeFormSuccess}
                />
            )}

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