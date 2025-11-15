import { getExercisesCategoriesList } from '../services/exercisesService';
import type { ExerciseCategory } from '../types/exerciseCategory';
import type { FormFieldSchema } from '../types/formFieldSchema';
import { maxLength } from '../utils/validation';

export const exerciseFormFields: FormFieldSchema[] = [
    {
        label: "Category",
        name: "categoryId",
        type: "searchSelect",
        required: true,
        options: getExercisesCategoriesList().then(categories =>
            categories.map((category: ExerciseCategory) => ({ id: category.id, label: category.name }))
        )
    },
    {
        label: "Name",
        name: "name",
        type: "text",
        required: true,
        validators: [
            { fn: maxLength(50), message: "Name have to be less that 50 chars." }
        ]
    },
    {
        label: "Weight",
        name: "weight",
        type: "number",
        decimals: 3,
        unit: 'kg'
    },
    {
        label: "Reps",
        name: "reps",
        type: "number"
    },
    {
        label: "Sets",
        name: "sets",
        type: "number"
    },
    {
        label: "Duration Seconds",
        name: "durationSeconds",
        type: "number",
        unit: 'sec'
    },
    {
        label: "Description",
        name: "description",
        type: "textarea",
        validators: [
            { fn: maxLength(500), message: "Description have to be less that 500 chars." }
        ]
    }
];