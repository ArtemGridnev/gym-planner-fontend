import type { FormFieldSchema, SearchSelectOption } from '../types/form/formFieldSchema';

export const getExerciseFormFields = (
    categories: SearchSelectOption[]
): FormFieldSchema[] => [
    {
        label: "Category",
        name: "category",
        type: "searchSelect",
        options: categories,
        rules: {
            required: { value: true, message: "This field is required." }
        }
    },
    {
        label: "Name",
        name: "name",
        type: "text",
        rules: {
            required: { value: true, message: "This field is required." },
            maxLength: { value: 50, message: "Name have to be less that 50 chars." }
        }
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
        rules: {
            maxLength: { value: 500, message: "Description have to be less that 500 chars." }
        }
    }
];