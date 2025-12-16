import { getExercisesCategories } from '../services/exercisesService';
import type { ExerciseCategory } from '../types/exerciseCategory';
import type { FilterFieldSchema } from '../types/filterFieldSchema';

export const exercisesFilter: FilterFieldSchema[] = [
    {
        label: "Search",
        name: "search",
        type: "search",
        debounce: 300
    },
    {
        label: "Category",
        name: "category",
        type: "searchSelectMultiple",
        options: () => getExercisesCategories().then(categories =>
            categories.map((category: ExerciseCategory) => ({ id: category.id, label: category.name }))
        )
    }
];