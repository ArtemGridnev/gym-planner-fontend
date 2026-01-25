import { useMemo } from "react";
import { getExerciseFormFields } from "../../forms/exerciseFormFields.schema";
import type { ExerciseCategory } from "../../types/exerciseCategory";
import { useExerciseCategories } from "../../queries/exercises/hooks/useExerciseCategories";
import type { SearchSelectOption } from "../../types/form/formFieldSchema";

export default function useExerciseFormFields() {
    const {
        data: categories
    } = useExerciseCategories();
 
    const formFields = useMemo(() => {
        if (!categories) return [];

        const options = categories.map((category: ExerciseCategory) => ({ id: category.id, value: category, label: category.name } as SearchSelectOption));

        return getExerciseFormFields(options);
    }, [categories]);

    return formFields;
}