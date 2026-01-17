import { useMemo } from "react";
import { getExerciseFormFields } from "../../forms/exerciseFormFields.schema";
import type { ExerciseCategory } from "../../types/exerciseCategory";
import { useExerciseCategories } from "../../queries/exercises/hooks/useExerciseCategories";
import type { SearchSelectOption } from "../../types/form/formFieldSchema";

export type ExerciseFormData = {
    category: ExerciseCategory;
    name: string;
    description: string | null;
    sets: number | null;
    reps: number | null;
    durationSeconds: number | null;
    weight: number | null;
};

export default function useExerciseForm() {
    const {
        data: categories
    } = useExerciseCategories();
 
    const formFields = useMemo(() => {
        if (!categories) return [];

        const options = categories.map((category: ExerciseCategory) => ({ id: category.id, value: category, label: category.name } as SearchSelectOption));

        return getExerciseFormFields(options);
    }, [categories]);

    return ({
        formFields
    });
}