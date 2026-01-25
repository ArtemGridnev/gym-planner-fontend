import { getExercise, type CreateExercisePayload } from "../../services/exercisesService";
import { exerciseFormDataToCreatePayload, exerciseToFormData } from "../../utils/exerciseUtils";
import useCreateExercise from "../../queries/exercises/hooks/useCreateExercise";
import useUpdateExercise from "../../queries/exercises/hooks/useUpdateExercise";
import type { ExerciseCategory } from "../../types/exerciseCategory";
import useFormController from "../form/useFormController";
import useExerciseFormFields from "./useExerciseFormFields";

export type ExerciseFormData = {
    category: ExerciseCategory;
    name: string;
    description: string | null;
    sets: number | null;
    reps: number | null;
    durationSeconds: number | null;
    weight: number | null;
};

export default function useExerciseFormController() {
    const exerciseFormFields = useExerciseFormFields();

    return useFormController<ExerciseFormData, CreateExercisePayload>({
        createMutation: useCreateExercise(),
        updateMutation: useUpdateExercise(),
        formFields: exerciseFormFields,
        formDataToPayload: exerciseFormDataToCreatePayload,
        editQueryKey: (id: number) => ['train', id],
        editQueryFn: async (id: number) => {
            const exercise = await getExercise(id);

            if (!exercise) return;

            return exerciseToFormData(exercise)
        },
    });
}