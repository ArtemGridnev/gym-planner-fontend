import type { FormFieldSchema, SearchSelectOption } from '../types/form/formFieldSchema';
import { maxLength } from '../utils/validation';

export const getExerciseFormFields = (
    categories: SearchSelectOption[]
): FormFieldSchema[] => [
    {
        label: "Category",
        name: "category",
        type: "searchSelect",
        required: true,
        options: categories
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
        step: 2.5,
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